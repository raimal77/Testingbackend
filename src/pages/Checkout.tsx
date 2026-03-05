import { useState, FormEvent } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export function Checkout() {
  const { cartItems, cartTotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="rounded-full bg-green-100 p-6">
          <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Order Confirmed!</h2>
        <p className="mt-2 text-lg text-gray-600">
          Thank you for your purchase. We've sent a confirmation email to your inbox.
        </p>
        <Link
          to="/"
          className="mt-8 rounded-full bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-800"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Your cart is empty</h2>
        <Link
          to="/shop"
          className="mt-6 rounded-full bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-800"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-2">
        {/* Checkout Form */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-3 border"
                />
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-2xl font-bold text-gray-900">Shipping Information</h2>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      autoComplete="street-address"
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-3 border"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-3 border"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                    Postal code
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="postal-code"
                      name="postal-code"
                      autoComplete="postal-code"
                      required
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-3 border"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-2xl font-bold text-gray-900">Payment</h2>
              <div className="mt-6">
                <div className="rounded-md border border-gray-300 p-4">
                  <div className="flex items-center">
                    <input
                      id="credit-card"
                      name="payment-type"
                      type="radio"
                      defaultChecked
                      className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                    />
                    <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
                      Credit Card
                    </label>
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                        Card number
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="card-number"
                          name="card-number"
                          autoComplete="cc-number"
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-3 border"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                        Expiration date (MM/YY)
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="expiration-date"
                          name="expiration-date"
                          autoComplete="cc-exp"
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-3 border"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                        CVC
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="cvc"
                          name="cvc"
                          autoComplete="csc"
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-3 border"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full rounded-full bg-black px-6 py-4 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : `Pay $${cartTotal}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-start-2">
          <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
          <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
            <ul role="list" className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={`${item.id}-${item.selectedSize}`} className="flex px-4 py-6 sm:px-6">
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 rounded-md"
                    />
                  </div>
                  <div className="ml-6 flex flex-1 flex-col">
                    <div className="flex">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-medium text-gray-700 hover:text-gray-800">
                          {item.name}
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                        <p className="mt-1 text-sm text-gray-500">Size: {item.selectedSize}</p>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between pt-2">
                      <p className="mt-1 text-sm font-medium text-gray-900">${item.price}</p>
                      <p className="mt-1 text-sm text-gray-500">Qty {item.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex items-center justify-between">
                <dt className="text-sm font-medium text-gray-900">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">${cartTotal}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm font-medium text-gray-900">Shipping</dt>
                <dd className="text-sm font-medium text-gray-900">Free</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <dt className="text-base font-medium text-gray-900">Total</dt>
                <dd className="text-base font-medium text-gray-900">${cartTotal}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
