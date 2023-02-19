import Head from 'next/head';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/auth';
import { connectToDatabase } from '../utils/mongodb';

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch('/api/inventory');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard - Shopping Cart App</title>
        <meta name="description" content="Dashboard for store owners" />
      </Head>
      <div className="p-6 bg-white shadow rounded-md">
        <h1 className="font-medium text-gray-800 text-2xl">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome, {user.name}!</p>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {loading && <p className="mt-4 text-gray-600">Loading...</p>}
        {!loading && !error && (
          <table className="mt-4 w-full text-gray-800">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left pb-3">Product Name</th>
                <th className="text-left pb-3">Price</th>
                <th className="text-left pb-3">Inventory</th>
                <th className="text-left pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b border-gray-300">
                  <td className="py-4">{product.name}</td>
                  <td className="py-4">{product.price}</td>
                  <td className="py-4">{product.inventory}</td>
                  <td className="py-4">
                    <Link href={`/dashboard/products/${product._id}`}>
                      <a className="text-blue-500 hover:underline">Edit</a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = req.session.get('user');

  if (!session || session.role !== 'owner') {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  const { db } = await connectToDatabase();
  const products = await db.collection('inventory').find({}).toArray();
  const formattedProducts = JSON.parse(JSON.stringify(products)).map((product) => {
    product.id = product._id.toString();
    delete product._id;
    return product;
  });

  return {
    props: {
      user: session,
      products: formattedProducts,
    },
  };
}
