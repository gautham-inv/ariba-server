import { Injectable } from '@nestjs/common';

interface SendMailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private resendApiKey: string | undefined;

  constructor() {
    // Use SMTP_PASS as the Resend API key for the HTTP API
    this.resendApiKey = process.env.SMTP_PASS;
  }

  /** From address for onboarding & invitation emails (e.g. noreply@yourdomain.com) */
  private get fromOnboarding(): string {
    return process.env.SMTP_FROM || 'onboarding@resend.dev';
  }

  /** From address for supplier-facing PO & RFQ emails (e.g. procurement@yourdomain.com) */
  private get fromProcurement(): string {
    return process.env.SMTP_FROM_PROCUREMENT || process.env.SMTP_FROM || 'onboarding@resend.dev';
  }

  /**
   * Send email via Resend HTTP API (works on Render free tier).
   * Render blocks outbound SMTP ports (25, 465, 587) on free services,
   * so we use the REST API over HTTPS (port 443) instead.
   */
  private async sendMail(options: SendMailOptions): Promise<void> {
    if (!this.resendApiKey) {
      throw new Error('SMTP_PASS (Resend API key) is not configured');
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: options.from,
        to: [options.to],
        subject: options.subject,
        html: options.html,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Resend API error (${response.status}): ${errorBody}`);
    }

    const result = await response.json();
    console.log(`[Email] Sent successfully via Resend API. ID: ${result.id}`);
  }

  async sendOrganizationInvitation(data: {
    email: string;
    inviterEmail: string;
    organizationName: string;
    url: string;
    expiresAt: Date;
  }) {
    try {
      await this.sendMail({
        from: this.fromOnboarding,
        to: data.email,
        subject: `You've been invited to join ${data.organizationName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Invitation to join ${data.organizationName}</h2>
            <p>Hello,</p>
            <p>You have been invited by <strong>${data.inviterEmail}</strong> to join the organization <strong>${data.organizationName}</strong> on Ariba.</p>
            <p>Click the button below to accept the invitation:</p>
            <a href="${data.url}" style="display: inline-block; background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 20px 0;">Accept Invitation</a>
            <p>This link will expire on ${new Date(data.expiresAt).toLocaleString()}.</p>
            <p>If you did not expect this invitation, please ignore this email.</p>
          </div>
        `,
      });

      console.log('Invitation email sent successfully to:', data.email);
      return true;
    } catch (err) {
      console.error('Failed to send invitation email:', err);
      return false;
    }
  }

  async sendPurchaseOrder(data: {
    supplierEmail: string;
    supplierName: string;
    poId: string;
    totalAmount: number;
    currency: string;
    organizationName: string;
    notes?: string;
  }) {
    try {
      await this.sendMail({
        from: this.fromProcurement,
        to: data.supplierEmail,
        subject: `OFFICIAL PURCHASE ORDER: #${data.poId.substring(0, 8)} from ${data.organizationName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 2px solid #4f46e5; border-radius: 12px; padding: 30px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #4f46e5; margin: 0; font-size: 24px;">PURCHASE ORDER</h1>
                <p style="color: #6b7280; font-weight: bold;">#${data.poId.substring(0, 8)}</p>
            </div>

            <p>Hello <strong>${data.supplierName}</strong>,</p>
            <p>Please find the official purchase order from <strong>${data.organizationName}</strong> below. This order is authorized and ready for fulfillment.</p>

            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 25px 0; border: 1px solid #e2e8f0;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 13px;">OFFICIAL ORDER TOTAL:</td>
                        <td style="padding: 8px 0; text-align: right; color: #0f172a; font-weight: 800; font-size: 18px;">${data.currency} ${data.totalAmount.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 13px;">ORDER DATE:</td>
                        <td style="padding: 8px 0; text-align: right; font-weight: bold; color: #1e293b;">${new Date().toLocaleDateString()}</td>
                    </tr>
                </table>
            </div>

            ${data.notes
            ? `
            <div style="margin: 20px 0;">
                <h4 style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; color: #64748b;">Special Instructions:</h4>
                <p style="margin: 0; padding: 12px; background-color: #fffbeb; border-left: 4px solid #f59e0b; font-size: 14px; color: #92400e; font-style: italic;">${data.notes}</p>
            </div>
            `
            : ''
          }

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
                <p style="font-size: 14px; color: #4b5563;">Please log in to the Ariba Supplier Portal or reply to this email to acknowledge receipt of this order.</p>
                <p style="font-size: 12px; color: #9ca3af; margin-top: 20px;">&copy; ${new Date().getFullYear()} ${data.organizationName} | Powered by Ariba Sourcing</p>
            </div>
          </div>
        `,
      });
      return true;
    } catch (err) {
      console.error('Failed to send PO email:', err);
      return false;
    }
  }

  async sendRFQ(data: {
    supplierEmail: string;
    supplierName: string;
    rfqTitle: string;
    rfqId: string;
    dueDate: Date;
    organizationName: string;
    rfqNotes?: string;
    items: {
      name: string;
      quantity: number;
      unit: string;
      description?: string;
    }[];
  }) {
    try {
      const itemsHtml = data.items
        .map(
          (item) =>
            `<li><strong>${item.name}</strong> (${item.quantity} ${item.unit})${item.description ? `<br/><span style="font-size: 0.9em; color: #666;">${item.description}</span>` : ''}</li>`,
        )
        .join('');

      const notesHtml = data.rfqNotes
        ? `<div style="margin-top: 15px; border-top: 1px dashed #ddd; pt-15px;">
                    <p><strong>Instructions from Buyer:</strong></p>
                    <p style="font-style: italic; color: #555;">${data.rfqNotes}</p>
                   </div>`
        : '';

      await this.sendMail({
        from: this.fromProcurement,
        to: data.supplierEmail,
        subject: `New RFQ: ${data.rfqTitle} from ${data.organizationName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px;">
            <h2 style="color: #333; text-align: center;">New Request for Quote</h2>
            <p>Hello ${data.supplierName},</p>
            <p><strong>${data.organizationName}</strong> has sent you a new Request for Quote.</p>

            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; border: 1px solid #eee;">
                <h3 style="margin-top: 0; color: #2c3e50;">RFQ Overview</h3>
                <ul style="list-style-type: none; padding-left: 0;">
                  <li style="margin-bottom: 8px;"><strong>Title:</strong> ${data.rfqTitle}</li>
                  <li style="margin-bottom: 8px;"><strong>Due Date:</strong> ${new Date(data.dueDate).toLocaleDateString(undefined, { dateStyle: 'long' })}</li>
                </ul>
                ${notesHtml}
            </div>

            <h3>Items Requested:</h3>
            <ul>
              ${itemsHtml}
            </ul>

            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />

            <h3>How to Submit Your Quote:</h3>
            <div style="background-color: #e8f4fd; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
                <p style="margin: 0; color: #0c5460;"><strong>Please reply to this email</strong> with your official quotation attached (PDF or Excel format).</p>
                <p style="margin: 10px 0 0 0; font-size: 0.9em;">Ensure your quote references the RFQ Title and includes pricing for all items listed above.</p>
            </div>
          </div>
        `,
      });

      console.log('RFQ email sent successfully to:', data.supplierEmail);
      return true;
    } catch (err) {
      console.error('Failed to send RFQ email:', err);
      return false;
    }
  }
}
