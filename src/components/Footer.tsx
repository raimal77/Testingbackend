import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <span className="text-xl font-bold tracking-tighter text-black">SoleSeeker.</span>
            <p className="text-sm text-gray-500 max-w-xs">
              Premium footwear for the modern athlete and style enthusiast. Quality, comfort, and performance in every step.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-black uppercase tracking-wider">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/shop" className="text-sm text-gray-500 hover:text-black">All Shoes</Link></li>
              <li><Link to="/shop?category=Running" className="text-sm text-gray-500 hover:text-black">Running</Link></li>
              <li><Link to="/shop?category=Basketball" className="text-sm text-gray-500 hover:text-black">Basketball</Link></li>
              <li><Link to="/shop?category=Lifestyle" className="text-sm text-gray-500 hover:text-black">Lifestyle</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-black uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-gray-500 hover:text-black">Order Status</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-black">Shipping & Returns</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-black">Size Guide</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-black">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-black uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-gray-500 hover:text-black">About</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-black">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-black">Terms</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-black">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-100 pt-8">
          <p className="text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} SoleSeeker, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
