import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#f5f5f5]">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link to="/" className="text-xl font-bold">
          MyStore
        </Link>
        <nav>
          <Link to="/" className="mx-4 text-gray-600 hover:text-gray-900">Home</Link>
          <Link to="/about" className="mx-4 text-gray-600 hover:text-gray-900">About</Link>
          <Link to="/contact" className="mx-4 text-gray-600 hover:text-gray-900">Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;