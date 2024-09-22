import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useQNA = (ProductId) => {
  const axiosPoint = useAxiosPublic();

  const { refetch, data: QNA = [] } = useQuery({
    queryKey: ["Product", ProductId],
    queryFn: async () => {
      try {
        const response = await axiosPoint.get(`/qna?Product=${ProductId}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });

  return [QNA, refetch];
};

export default useQNA;
