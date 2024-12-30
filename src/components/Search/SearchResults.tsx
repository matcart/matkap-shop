import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import ProductCard from "../Products/ProductCard";

type SearchResultsProps = {
  searchQuery: string;
  products: any[];
};

const SearchResults = ({ searchQuery, products }: SearchResultsProps) => {
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