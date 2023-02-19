import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
  const { method } = req;

  if (method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();
    const products = await db.collection('inventory').find({}).toArray();
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
