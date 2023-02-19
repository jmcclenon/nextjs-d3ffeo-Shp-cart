import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navigation from '../components/Navigation';
import CheckoutForm from '../components/CheckoutForm';

export default function Checkout() {
  const router = useRouter();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  function handlePaymentSuccess() {
    setPaymentSuccess(true);
  }

  return (
    <div>
      <Head>
        <title>Shopping Cart - Checkout</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Checkout</h1>
        {paymentSuccess ? (
          <div className="text-green-600 font-semibold text-lg mb-6">Payment successful!</div>
        ) : (
          <CheckoutForm onPaymentSuccess={handlePaymentSuccess} />
        )}
      </main>
    </div>
  );
}
