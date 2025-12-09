import "./App.css";
import PostsComponent from "./src/components/PostsComponent.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="App">
        <h1>React Query Posts Demo</h1>
        <p className="read-the-docs">
          This page fetches posts from JSONPlaceholder using React Query. Try
          refetching and watch how cached data keeps the UI fast.
        </p>
        <PostsComponent />
      </main>
    </QueryClientProvider>
  );
}

export default App;
