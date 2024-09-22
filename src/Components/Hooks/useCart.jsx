import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useCart = (ProductId) => {
  const axiosPoint = useAxiosPublic();
    const {user}=useAuth()
  const { refetch, data: Cart = [] } = useQuery({
    queryKey: ["cart",  user?.email],
    queryFn: async () => {
      try {
        const response = await axiosPoint.get(`/cart?email=${user?.email}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });

  return [Cart, refetch];
};

export default useCart;
