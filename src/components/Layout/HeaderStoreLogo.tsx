import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from "../ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

interface Store {
  id: number;
  name: string;
  email: string;
  store_type_id: number;
}

const HeaderStoreLogo = () => {
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
    <Link to="/" className="flex items-center">
      <img src="/assets/icons/ica_logo.svg" alt="ICA" className="h-[22px]" />
      {isLoading ? (
        <Skeleton className="h-[20px] w-[120px] ml-4" />
      ) : (
        <span className="text-[#222222] font-medium ml-4">{store?.name}</span>
      )}
    </Link>
  );
};

export default HeaderStoreLogo;