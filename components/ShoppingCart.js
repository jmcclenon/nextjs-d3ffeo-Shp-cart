import { useContext } from 'react';
import { CartContext } from '../contexts/cart';
import { formatCurrency } from '../utils/format';

export default function ShoppingCart() {
  const { cart, subtotal, removeProduct, clearCart } = useContext(CartContext);

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow rounded-md">
      {cart.length > 0 ? (
        <>
          <table className="w-full table-fixed">
            <thead>
              <tr>
                <th className="w-1/4">Product</th>
                <th className="w-1/4">Price</th>
                <th className="w-1/4">Quantity</th>
                <th className="w-1/4">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{formatCurrency(product.price)}</td>
                  <td>{product.quantity}</td>
                  <td>{formatCurrency(product.price * product.quantity)}</td>
                  <td>
                    <button onClick={() => removeProduct(product)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 flex justify-between w-full">
            <button onClick={() => clearCart()}>Clear Cart</button>
            <div className="font-medium text-gray-800">{`Subtotal: ${formatCurrency(subtotal)}`}</div>
          </div>
        </>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
}
