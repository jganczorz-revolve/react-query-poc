import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Details from "./components/Details";
import List from "./components/List";
import { pages } from "./pages/enums";
import Home from "./pages/Home";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} key={"index_-1"} />
        {pages.map((pg, index) => (
          <Route path={pg.to} key={`index_${index}`}>
            <Route path={":id"} element={<Details />} key={`index__detail_${index}`}/>
            <Route element={<List />} index key={`index_list_${index}`} />
          </Route>
        ))}
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
