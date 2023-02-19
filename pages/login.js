import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login - Shopping Cart App</title>
        <meta name="description" content="Login page for the shopping cart app" />
      </Head>
      <div className="flex items-center justify-center h-screen p-6 bg-white">
        <div className="max-w-md w-full">
          <h1 className="text-2xl font-medium text-gray-800">Login</h1>
          {error && <p className="mt-4 text-red-500">{error}</p>}
          <form className="mt-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
              <input type="email" id="email" name="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm" />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
              <input type="password" id="password" name="password" required value={password} onChange={(event) => setPassword(event.target.value)} className="w-full mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm" />
            </div>
            <button type="submit" disabled={loading} className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">{loading ? 'Logging in...' : 'Log in'}</button>
          </form>
        </div>
      </div>
    </>
  );
}
