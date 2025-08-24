import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import AppRoutes from "./routes/AppRoutes";
import { store } from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <AppRoutes />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
