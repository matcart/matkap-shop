import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import ProductCard from "../Products/ProductCard";
import { PackageSearch } from "lucide-react";
import { Product } from "@/types/product";

type SearchResultsProps = {
  searchQuery: string;
  products: Product[];
};

const SearchResults = ({ searchQuery, products }: SearchResultsProps) => {
  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <PackageSearch className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Inga produkter hittades</h3>
        <p className="text-gray-500 text-center max-w-md">
          Vi kunde inte hitta några produkter för '{searchQuery}'
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <nav className="text-sm mb-8 text-gray-600">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-gray-900">
                Sökresultat för "{searchQuery}" ({products.length} träffar)
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </nav>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;