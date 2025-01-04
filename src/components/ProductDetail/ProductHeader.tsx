import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from "@/components/ui/breadcrumb";

const ProductHeader = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/', { 
      state: { 
        scrollRestoration: true 
      }
    });
  };

  return (
    <nav className="text-sm mb-4 text-gray-600">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <button 
              onClick={handleBack} 
              className="flex items-center gap-2 font-medium hover:text-[#222222]"
            >
              <ChevronLeft className="w-4 h-4" />
              Tillbaka
            </button>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
};

export default ProductHeader;