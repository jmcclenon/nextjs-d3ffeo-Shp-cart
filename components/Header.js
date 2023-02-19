import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';

export default function Header() {
  const [session, loading] = useSession();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-lg font-medium text-gray-800">Shopping Cart</a>
            </Link>
          </div>
          <div className="flex items-center">
            {session && (
              <>
                <Link href="/dashboard">
                  <a className="mr-4 text-gray-800 hover:text-gray-600">Dashboard</a>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-800 hover:text-gray-600"
                >
                  Sign out
                </button>
              </>
            )}
            {!session && !loading && (
              <Link href="/login">
                <a className="text-gray-800 hover:text-gray-600">Sign in</a>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
