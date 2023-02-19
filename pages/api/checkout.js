import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { db } = await connectToDatabase();
    const orders = db.collection('orders');
    const order = {
      name: body.name,
      email: body.email,
      address: body.address,
      city: body.city,
      state: body.state,
      zip: body.zip,
      phone: body.phone,
      items: body.items,
      total: body.total,
      created_at: new Date(),
    };
    const result = await orders.insertOne(order);
    return res.status(201).json(result.ops[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
