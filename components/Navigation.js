import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="flex justify-between p-4 bg-gray-100">
      <ul className="flex">
        <li className="mr-6">
          <Link href="/">
            <a className="text-gray-800 hover:text-gray-600">Home</a>
          </Link>
        </li>
        <li className="mr-6">
          <Link href="/products">
            <a className="text-gray-800 hover:text-gray-600">Products</a>
          </Link>
        </li>
      </ul>
      <ul className="flex">
        <li className="mr-6">
          <Link href="/cart">
            <a className="text-gray-800 hover:text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 fill-current inline-block"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 18a2 2 0 11-4 0 2 2 0 014 0zm8-14h-3.334l-1.504-3.008A2 2 0 009.896 0H4a2 2 0 00-2 2v1h2l2.938 10.783A2 2 0 009.854 16h7a2 2 0 002-2V4a2 2 0 00-2-2z" />
              </svg>
              Cart
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
