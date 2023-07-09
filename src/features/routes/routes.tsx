import { useRoutes } from "react-router-dom";
import { routes } from "./constant";

export const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};
