import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import Register from "./pages/Register";
import UserBlogs from "./pages/UserBlogs"
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/myblogs" element={<UserBlogs/>} />
        <Route path="/createblog" element={<CreateBlog/>} />
        <Route path="/editblog/:id" element={<EditBlog/>} />
      </Routes>
    </div>
  );
}

export default App;
