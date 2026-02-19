import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-3xl font-display font-bold mb-4">
              <span className="text-luxury-gold">AK</span>Suites
            </h3>
            <p className="text-gray-400 mb-4 max-w-md">
              Experience unparalleled luxury and comfort at AKSuites. 
              Where every moment is crafted to perfection.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-luxury-gold transition-colors">
                <span className="text-2xl">📘</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-luxury-gold transition-colors">
                <span className="text-2xl">📷</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-luxury-gold transition-colors">
                <span className="text-2xl">🐦</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-luxury-gold transition-colors">
                <span className="text-2xl">📱</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-luxury-gold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/rooms" className="text-gray-400 hover:text-white transition-colors">
                  Rooms
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-luxury-gold">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start space-x-2">
                <span>📍</span>
                <span>AK Suites, Malabar Hills, Mumbai MH 400006</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>📞</span>
                <span>+91 XXXXXX2533</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>✉️</span>
                <span>info@aksuites.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>© {currentYear} AKSuites. All rights reserved by Aaditya Kini.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-luxury-gold transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-luxury-gold transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;