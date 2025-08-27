import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import AppRoutes from "./routes/AppRoutes";
import { persistor, store } from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={new QueryClient()}>
          <AppRoutes />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
