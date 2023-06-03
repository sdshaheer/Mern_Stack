import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("api/v1/blogs/all-blogs");
      if (data && data.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);
  console.log(blogs)
  return (
    <div>
      {
        blogs.map((blog) => 
          <BlogCard
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            blogId={blog._id}
            belongsToUser={blog.user._id===localStorage.getItem("userId")}
          />
        )}
    </div>
  );
};

export default Blogs; 
