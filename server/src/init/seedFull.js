import prisma from '../prismaClient.js';
import initData from './data.js';

const tags = ["trending", "topcities", "artic", "mountains", "countryside", "farms", "beach"];

const reviewMessages = [
    { rating: 5, message: "Absolute perfection! The view in the morning was breathtaking and the amenities were top notch." },
    { rating: 5, message: "Super clean, cozy vibe, and the host was extremely responsive and friendly. 10/10 recommend!" },
    { rating: 4, message: "Loved our stay here. Location is super convenient and close to everything. Great experience overall." },
    { rating: 5, message: "Exceeded all our expectations. Peaceful surroundings and very comfortable beds." },
    { rating: 4, message: "Charming property with great aesthetics. Would definitely book again next summer." },
    { rating: 5, message: "One of the best stays we have ever booked! Unmatched comfort and scenic beauty." },
    { rating: 4, message: "Really enjoyed the weekend getaway. Host provided thoughtful local tips." },
    { rating: 5, message: "Dream vacation spot! Beautiful sunsets, fast wifi, and spotless interior." }
];

async function seed() {
    console.log("🌱 Starting full database seed...");

    // 1. Create or upsert users
    const usersData = [
        { id: 1, username: "shailesh", email: "shailesh@travelstay.com", password: "password123" },
        { id: 2, username: "mangesh", email: "mangesh@travelstay.com", password: "password123" },
        { id: 3, username: "alice_wanderlust", email: "alice@travelstay.com", password: "password123" },
        { id: 4, username: "robert_travels", email: "robert@travelstay.com", password: "password123" },
        { id: 5, username: "sophia_explorer", email: "sophia@travelstay.com", password: "password123" }
    ];

    const users = [];
    for (const u of usersData) {
        const user = await prisma.user.upsert({
            where: { username: u.username },
            update: {},
            create: {
                username: u.username,
                email: u.email,
                password: u.password
            }
        });
        users.push(user);
    }
    console.log(`✅ Created/verified ${users.length} users.`);

    // 2. Clear previous listings and reviews if any
    await prisma.review.deleteMany({});
    await prisma.listing.deleteMany({});
    console.log("🧹 Cleaned old listings and reviews.");

    // 3. Insert listings
    const tagMap = {
        "beach": ["Beachfront", "Paradise", "Island", "Coast", "Bungalow", "Sea"],
        "mountains": ["Mountain", "Chalet", "Alps", "Rockies", "Highland"],
        "artic": ["Safari", "Cabin by the Lake", "Arctic", "Snow", "Northern"],
        "countryside": ["Villa", "Tuscany", "Treehouse", "Cotswolds", "Retreat"],
        "topcities": ["Downtown", "Loft", "Penthouse", "Tokyo", "Miami", "Boston", "Canal"],
        "farms": ["Rustic", "Montana", "Farms", "Cottage", "Charleston"],
        "trending": ["Luxury", "Desert", "Dubai", "Maldives", "Modern"]
    };

    function assignTag(title, description, index) {
        for (const [tag, keywords] of Object.entries(tagMap)) {
            if (keywords.some(k => title.toLowerCase().includes(k.toLowerCase()) || description.toLowerCase().includes(k.toLowerCase()))) {
                return tag;
            }
        }
        return tags[index % tags.length];
    }

    const insertedListings = [];
    for (let i = 0; i < initData.data.length; i++) {
        const item = initData.data[i];
        const assignedUser = users[i % users.length];
        const tag = assignTag(item.title, item.description, i);

        const listing = await prisma.listing.create({
            data: {
                title: item.title,
                description: item.description,
                imageUrl: item.image?.url || "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?auto=format&fit=crop&w=800&q=60",
                price: item.price,
                location: item.location,
                country: item.country,
                userId: assignedUser.id,
                tag: tag
            }
        });
        insertedListings.push(listing);
    }
    console.log(`✅ Inserted ${insertedListings.length} listings with curated tags and HD images.`);

    // 4. Insert reviews for each listing
    const reviewsToInsert = [];
    for (const listing of insertedListings) {
        // Add 2 to 3 reviews per listing from different users
        const reviewCount = Math.floor(Math.random() * 2) + 2;
        const availableReviewers = users.filter(u => u.id !== listing.userId);

        for (let r = 0; r < reviewCount; r++) {
            const reviewer = availableReviewers[r % availableReviewers.length];
            const reviewTemplate = reviewMessages[(listing.id + r) % reviewMessages.length];
            
            reviewsToInsert.push({
                rating: reviewTemplate.rating,
                message: reviewTemplate.message,
                userId: reviewer.id,
                listingId: listing.id
            });
        }
    }

    await prisma.review.createMany({
        data: reviewsToInsert
    });
    console.log(`✅ Inserted ${reviewsToInsert.length} authentic guest reviews.`);

    console.log("🎉 Database seeding completed successfully!");
}

seed()
    .catch((err) => {
        console.error("❌ Seeding failed:", err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
