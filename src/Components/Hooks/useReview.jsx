import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useReview = (ProductId) => {
  const axiosPoint = useAxiosPublic();

  const { refetch, data: Review = [] } = useQuery({
    queryKey: ["Review", ProductId],
    queryFn: async () => {
      try {
        const response = await axiosPoint.get(`/review?Product=${ProductId}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });

  return [Review, refetch];
};

export default useReview;
