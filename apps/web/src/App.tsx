import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import AppRoutes from "./routes/AppRoutes";
import { persistor, store } from "./store/store";

const App = () => {
  const queryClient = new QueryClient();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <AppRoutes />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default App;
