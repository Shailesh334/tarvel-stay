import fs from "fs";
import prisma from "./prismaClient.js";

async function main() {
  const users = JSON.parse(fs.readFileSync("users.json", "utf-8"));
  const listings = JSON.parse(fs.readFileSync("listings.json", "utf-8"));
  const reviews = JSON.parse(fs.readFileSync("reviews.json", "utf-8"));

  /*|==================================================|
      |              Insert User                        |
      ==================================================|
   */
  for (const user of users) {
    try {
      await prisma.user.create({
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          password: user.password,
          
        },
      });
    } catch (err) {
      if (err.code === "P2002") {
        console.log(`Skipping user with duplicate email: ${user.email}`);
      } else {
        console.error(err);
      }
    }
  }

  // Insert listings
  for (const listing of listings) {
    try {
      await prisma.listing.create({
        data: {
          id: listing.id,
          title: listing.title,
          description: listing.description,
          price: listing.price,
          country: listing.country,
          location: listing.location,
          tag: listing.tag,
          imageUrl: listing.imageUrl,
          userId: listing.userId,
        
        },
      });
    } catch (err) {
      console.error(`Error inserting listing ${listing.id}:`, err);
    }
  }

  // Insert reviews
  for (const review of reviews) {
    try {
      await prisma.review.create({
        data: {
          id: review.id,
          rating: review.rating,
          message: review.message,
          listingId: review.listingId,
          userId: review.userId,
          
        },
      });
    } catch (err) {
      console.error(`Error inserting review ${review.id}:`, err);
    }
  }

  console.log("Restore completed!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
