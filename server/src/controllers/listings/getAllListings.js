import prisma from '../../prismaClient.js';

const getAllListings = async (req, res) => {
  try {
    const data = await prisma.listing.findMany({});
    return res.status(200).json(data);
  } catch (err) {
    console.error('getAllListings error:', err);
    return res.status(500).json({
      message: 'Unable to fetch listings',
      error: err.message,
    });
  }
};

export default getAllListings;