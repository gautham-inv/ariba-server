import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DEFAULT_ORG_SLUG = process.env.DEFAULT_ORG_SLUG || "default-org";
const DEFAULT_ORG_NAME = process.env.DEFAULT_ORG_NAME || "My Organization";

async function main() {
    console.log("🌱 Seeding database...");

    // Create default organization if it doesn't exist
    const existingOrg = await prisma.organization.findFirst({
        where: { slug: DEFAULT_ORG_SLUG },
    });

    if (!existingOrg) {
        const org = await prisma.organization.create({
            data: {
                name: DEFAULT_ORG_NAME,
                slug: DEFAULT_ORG_SLUG,
                metadata: JSON.stringify({
                    description: "Default organization for internal use",
                    singleOrgMode: true,
                }),
            },
        });
        console.log(`✅ Created default organization: ${org.name} (${org.slug})`);
    } else {
        console.log(`ℹ️ Default organization already exists: ${existingOrg.name} (${existingOrg.slug})`);
    }

    console.log("🌱 Seeding complete!");
}

main()
    .catch((e) => {
        console.error("❌ Seeding failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
