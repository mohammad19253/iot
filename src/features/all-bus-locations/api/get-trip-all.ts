import { useQuery } from "react-query";
import axios from "../../../libs/axios";
export const getTripAll = (): Promise<any> => {
  return axios.get(`/react-service/bus/all`).then((res) => res.data);
};

export const useTripAll = () => {
  return useQuery({
    queryKey: ["/react-service/bus/all"],
    queryFn: () => getTripAll(),
  });
};
