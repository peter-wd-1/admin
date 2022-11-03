import * as React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { AppRoutes } from "./Routes";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <AppRoutes />
        </ChakraProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
