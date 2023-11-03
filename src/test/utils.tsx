import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const wrapPageWithProviders = (page: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={testQueryClient}>
      <BrowserRouter>{page}</BrowserRouter>
    </QueryClientProvider>
  );
};

export const pageRender = (page: React.ReactElement) => {
  const { rerender, ...result } = render(wrapPageWithProviders(page));

  return {
    ...result,
    rerender: (rerenderPage: React.ReactElement) => {
      return rerender(wrapPageWithProviders(rerenderPage));
    },
  };
};

export const createQueryTestWrapper = () => {
  const testQueryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
};
