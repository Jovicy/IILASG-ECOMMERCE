import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import AppRoutes from "./routes/AppRoutes";
import { persistor, store } from "./store/store";
import { useGetProfile } from "./hooks/useUser";
import { setUser } from "./store/slices/authSlice";
import { useEffect } from "react";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 1,
        placeholderData: true,
      },
      mutations: {
        retry: 0,
        onError: (error: any) => {
          console.error("Mutation error:", error);
        },
      },
    },
  });
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";

  const AppInitializer = () => {
    const dispatch = useDispatch();
    const { data: profile } = useGetProfile();

    useEffect(() => {
      if (profile) {
        dispatch(setUser(profile));
      }
    }, [profile, dispatch]);

    return null;
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <AppInitializer />

            <AppRoutes />
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default App;
