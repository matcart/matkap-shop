import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ProductHeader = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1 as any, { 
      state: { 
        scrollRestoration: true 
      }
    });
  };

  return (
    <div className="mb-6">
      <Button
        variant="ghost"
        size="sm"
        className="hover:bg-transparent hover:text-gray-600 -ml-2 h-8"
        onClick={handleBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Tillbaka
      </Button>
    </div>
  );
};

export default ProductHeader;