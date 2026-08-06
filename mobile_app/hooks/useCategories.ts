import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/categoriy";
import { getServices } from "@/services/service";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  services: Service[];
}
interface Service {
  id: string;
  category?: string;
  category_name: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  price_type: string;
  starting_price: string;
  duration: number | null;
  is_active: boolean;
  created_at: string;
}

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}
export function useServices() {
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: getServices,
  });
}
