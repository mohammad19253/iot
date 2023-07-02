import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AllBusLocations } from "./features/all-bus-locations";
const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AllBusLocations />
        </Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
