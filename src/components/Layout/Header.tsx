import { useStore } from '@/contexts/StoreContext';
import { Button } from '../ui/button';
import HeaderStoreLogo from './HeaderStoreLogo';
import HeaderSearch from './HeaderSearch';
import HeaderCart from './HeaderCart';

const Header = () => {
  const { dispatch } = useStore();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#f5f5f5]">
      <div className="flex-col lg:px-[100px] px-[20px] lg:py-[12px] py-[10px]">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            className="lg:hidden p-2 w-8 h-8"
            onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
          >
            <img src="/assets/icons/burger.svg" alt="Menu" />
          </Button>

          <div className="flex items-center gap-4 absolute left-1/2 -translate-x-1/2 lg:static lg:transform-none">
            <HeaderStoreLogo />
          </div>

          <div className="flex items-center gap-6">
            <HeaderCart />
          </div>
        </div>

        <HeaderSearch />
      </div>
    </header>
  );
};

export default Header;