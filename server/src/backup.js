
// backup.js


import fs from "fs";
import prisma from "./prismaClient.js";

async function main() {
  // Replace with your tables
    const users = await prisma.user.findMany();
    const listings = await prisma.listing.findMany();
    const reviews = await prisma.review.findMany();

  
    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
    fs.writeFileSync("listings.json", JSON.stringify(listings, null, 2));
    fs.writeFileSync("reviews.json", JSON.stringify(reviews, null, 2));

    console.log("Backup completed!");
    }

    main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
