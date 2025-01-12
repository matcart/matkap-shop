import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "../ui/skeleton";

interface Store {
  id: number;
  name: string;
  email: string;
  store_type_id: number;
}

const WelcomeSection = () => {
  const getSubdomain = () => {
    const hostname = window.location.hostname;
    if (hostname.includes('matkap.se')) {
      const subdomain = hostname.split('.')[0];
      return subdomain;
    }
    return 'icademo';
  };

  const { data: store, isLoading } = useQuery({
    queryKey: ['store', getSubdomain()],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .eq('sub_domain', getSubdomain())
        .single();

      if (error) throw error;
      return data as Store;
    }
  });

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm ml-0 lg:ml-[39px]">
      <div className="flex flex-col md:flex-row h-[400px]">
        <div className="w-full md:w-1/2 h-48 md:h-full relative">
          <img
            src="/assets/images/welcome.png"
            alt="Welcome"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 bg-white p-8 flex flex-col justify-center items-center text-center">
          <h2 className="text-ica-red text-base font-semibold mb-2">
            Välkommen till
          </h2>
          {isLoading ? (
            <Skeleton className="h-[30px] w-[200px]" />
          ) : (
            <h1 className="text-[25px] font-semibold text-gray-900">
              {store?.name}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;