import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleCart, cartCount } = useCart();
  const { user, signOut } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tighter text-black">SoleSeeker.</span>
          </Link>
          <div className="hidden md:flex md:gap-6">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
              Home
            </Link>
            <Link to="/shop" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
              Shop
            </Link>
            <Link to="/shop?category=Running" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
              Running
            </Link>
            <Link to="/shop?category=Lifestyle" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
              Lifestyle
            </Link>
            <Link to="/forum" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
              Forum
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition-colors">
            <Search className="h-5 w-5 text-gray-600" />
          </button>
          
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition-colors"
              >
                <User className="h-5 w-5 text-gray-600" />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                    {user.email}
                  </div>
                  <button
                    onClick={() => {
                      signOut();
                      setIsUserMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
                Log in
              </Link>
              <Link to="/signup" className="text-sm font-medium text-white bg-black px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
                Sign up
              </Link>
            </div>
          )}

          <button 
            onClick={toggleCart}
            className="relative flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ShoppingBag className="h-5 w-5 text-gray-600" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>

          <button 
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5 text-gray-600" />
            ) : (
              <Menu className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-sm font-medium text-gray-700 hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className="text-sm font-medium text-gray-700 hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              to="/shop?category=Running" 
              className="text-sm font-medium text-gray-700 hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Running
            </Link>
            <Link 
              to="/shop?category=Lifestyle" 
              className="text-sm font-medium text-gray-700 hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Lifestyle
            </Link>
            <Link 
              to="/forum" 
              className="text-sm font-medium text-gray-700 hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Forum
            </Link>
            {!user && (
              <>
                <Link 
                  to="/login" 
                  className="text-sm font-medium text-gray-700 hover:text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link 
                  to="/signup" 
                  className="text-sm font-medium text-gray-700 hover:text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
            {user && (
              <button
                onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}
                className="text-left text-sm font-medium text-gray-700 hover:text-black"
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
