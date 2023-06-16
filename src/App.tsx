import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import BookEdit from "./components/BookEdit";
import AddBook from "./components/AddBook";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Footer />}>
          <Route index element={<Dashboard />} />
          <Route path="/edit/:id" element={<BookEdit />} />
          <Route path="/add" element={<AddBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
