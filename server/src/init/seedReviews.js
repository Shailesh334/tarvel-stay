import prisma from "../prismaClient.js";

    const messages = [
        "Amazing stay! Would love to visit again.",
        "Had a decent experience, could be better.",
        "Loved the vibe and location!",
        "Not worth the price.",
        "Exceptional service and clean rooms.",
        "The view was breathtaking!",
        "Wouldn’t recommend this one.",
        "Comfortable and affordable.",
        "Very noisy neighborhood.",
        "Host was super helpful!",
    ];

async function main() {
    const reviews = [];

    for (let listingId = 30; listingId <= 58; listingId++) {
            const userId = Math.random() < 0.5 ? 3 : 5;
            const rating = Math.floor(Math.random() * 5) + 1;
            const message = messages[Math.floor(Math.random() * messages.length)];

            reviews.push({
            rating,
            message,
            userId,
            listingId,
            });
    }

    await prisma.review.createMany({
        data: reviews,
    });

    console.log(`✅ Inserted ${reviews.length} fake reviews successfully!`);
}

    // main()
    // .catch((e) => {
    //     console.error(e);
    //     process.exit(1);
    // })
    // .finally(async () => {
    //     await prisma.$disconnect();
    // });
