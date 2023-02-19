import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/auth';
import { connectToDatabase } from '../utils/mongodb';

export default function OrderHistory() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getOrders() {
      try {
        const response = await fetch('/api/orders', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    getOrders();
  }, [user]);

  return (
    <>
      <Head>
        <title>Order History - Shopping Cart App</title>
        <meta name="description" content="Order history for the shopping cart app" />
      </Head>
      <div className="p-6 bg-white shadow rounded-md">
        <h1 className="font-medium text-gray-800 text-2xl">Order History</h1>
        <p className="mt-2 text-gray-600">Welcome, {user.name}!</p>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {loading && <p className="mt-4 text-gray-600">Loading...</p>}
        {!loading && !error && orders.length > 0 && (
          <table className="mt-4 w-full text-gray-800">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left pb-3">Order ID</th>
                <th className="text-left pb-3">Total Amount</th>
                <th className="text-left pb-3">Order Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-300">
                  <td className="py-4">{order._id}</td>
                  <td className="py-4">{order.totalAmount}</td>
                  <td className="py-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && !error && orders.length === 0 && <p className="mt-4 text-gray-600">No orders found.</p>}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = req.session.get('user');

  if (!session) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  const { db } = await connectToDatabase();
  const orders = await db.collection('orders').find({ userId: session.userId }).toArray();

  return {
    props: {
      user: session,
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}
