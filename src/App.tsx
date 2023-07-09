import { QueryClient, QueryClientProvider } from "react-query";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AppRoutes } from "./features/routes/routes";
const queryClient = new QueryClient();

 const App = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <HashRouter basename="/">
            <AppRoutes />
          </HashRouter>
        </Provider>
      </QueryClientProvider>
    </div>
  );
};
export default App