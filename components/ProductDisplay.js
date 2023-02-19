import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency } from '../utils/format';

export default function ProductDisplay({ product }) {
  return (
    <div className="flex flex-col items-center p-6 bg-white shadow rounded-md">
      <Link href={`/products/${product.id}`}>
        <a>
          <div className="relative w-64 h-64">
            <Image src={product.image} alt={product.name} layout="fill" objectFit="contain" />
          </div>
        </a>
      </Link>
      <h2 className="mt-4 font-medium text-gray-800 text-lg">{product.name}</h2>
      <p className="mt-2 text-gray-600">{product.description}</p>
      <p className="mt-2 font-medium text-gray-800">{formatCurrency(product.price)}</p>
      <Link href={`/products/${product.id}`}>
        <a className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          View Product
        </a>
      </Link>
    </div>
  );
}
