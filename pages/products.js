import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart';
import { connectToDatabase } from '../../utils/mongodb';
import { formatCurrency } from '../../utils/format';

export default function Product({ product }) {
  const { addToCart } = useContext(CartContext);
  const router = useRouter();

  const handleAddToCart = (event) => {
    event.preventDefault();
    addToCart(product);
    router.push('/cart');
  };

  return (
    <>
      <Head>
        <title>{product.name} - Shopping Cart App</title>
        <meta name="description" content={product.description} />
      </Head>
      <div className="flex flex-col items-center p-6 bg-white shadow rounded-md">
        <div className="relative w-96 h-96">
          <Image src={product.image} alt={product.name} layout="fill" objectFit="contain" />
        </div>
        <h1 className="mt-4 font-medium text-gray-800 text-2xl">{product.name}</h1>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <p className="mt-2 font-medium text-gray-800">{formatCurrency(product.price)}</p>
        <form onSubmit={handleAddToCart}>
          <button type="submit" className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Add to Cart
          </button>
        </form>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const { db } = await connectToDatabase();
  const products = await db.collection('inventory').find({}).toArray();
  const paths = products.map((product) => ({ params: { id: product._id.toString() } }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { db } = await connectToDatabase();
  const product = await db.collection('inventory').findOne({ _id: params.id });
  product.id = product._id.toString();
  delete product._id;
  return {
    props: {
      product,
    },
  };
}
