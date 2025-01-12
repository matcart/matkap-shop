import { Search, X } from 'lucide-react';
import { Input } from '../ui/input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderSearch = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="mt-4 lg:mt-0 lg:absolute lg:left-[394px] lg:top-1/2 lg:-translate-y-1/2 lg:w-[376px]">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Sök bland alla varor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-8 bg-[#F5F5F5] border-none hover:bg-[#ECEDEE] focus:bg-[#ECEDEE] transition-colors focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default HeaderSearch;