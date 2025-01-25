import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Landing } from '../Landing';

export function App() {
  return (
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              refetchOnWindowFocus: false,
              retry: 0,
            },
          },
        })
      }
    >
      <Landing />
    </QueryClientProvider>
  );
}

export default App;
