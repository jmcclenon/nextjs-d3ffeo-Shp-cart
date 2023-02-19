import Head from 'next/head';
import Navigation from '../components/Navigation';
import ProductDisplay from '../components/ProductDisplay';
import { getProducts } from './api/products';

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>Shopping Cart App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Featured Products</h1>
        <ProductDisplay products={products} />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const products = await getProducts();
  return {
    props: {
      products,
    },
  };
}
