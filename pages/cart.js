import Head from 'next/head';
import Navigation from '../components/Navigation';
import ShoppingCart from '../components/ShoppingCart';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Cart() {
  return (
    <div>
      <Head>
        <title>Shopping Cart - Checkout</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Shopping Cart</h1>
        <Elements stripe={stripePromise}>
          <ShoppingCart />
        </Elements>
      </main>
    </div>
  );
}
