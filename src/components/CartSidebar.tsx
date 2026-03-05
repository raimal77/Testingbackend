import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export function CartSidebar() {
  const { 
    isCartOpen, 
    toggleCart, 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    cartTotal 
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-xl"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
              <button 
                onClick={toggleCart}
                className="rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {cartItems.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                  <div className="rounded-full bg-gray-50 p-6">
                    <Trash2 className="h-8 w-8 text-gray-300" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-lg font-medium text-gray-900">Your cart is empty</p>
                    <p className="text-sm text-gray-500">Looks like you haven't added any shoes yet.</p>
                  </div>
                  <button 
                    onClick={toggleCart}
                    className="mt-4 rounded-full bg-black px-6 py-2 text-sm font-medium text-white hover:bg-gray-800"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {cartItems.map((item) => (
                    <li key={`${item.id}-${item.selectedSize}`} className="flex py-2">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link to={`/product/${item.id}`} onClick={toggleCart}>
                                {item.name}
                              </Link>
                            </h3>
                            <p className="ml-4">${item.price * item.quantity}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{item.brand} | Size {item.selectedSize}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center border border-gray-200 rounded-md">
                            <button 
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                              className="p-1 hover:bg-gray-100"
                            >
                              <Minus className="h-3 w-3 text-gray-600" />
                            </button>
                            <span className="px-2 text-gray-900 font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                              className="p-1 hover:bg-gray-100"
                            >
                              <Plus className="h-3 w-3 text-gray-600" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id, item.selectedSize)}
                            className="font-medium text-red-500 hover:text-red-600 flex items-center gap-1"
                          >
                            <span className="text-xs">Remove</span>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-6">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                  <p>Subtotal</p>
                  <p>${cartTotal}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500 mb-6">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Link
                    to="/checkout"
                    onClick={toggleCart}
                    className="flex items-center justify-center rounded-full border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800 w-full"
                  >
                    Checkout
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{' '}
                    <button
                      type="button"
                      className="font-medium text-black hover:text-gray-800"
                      onClick={toggleCart}
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
