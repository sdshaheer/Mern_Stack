import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.post("/api/v1/blogs/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        alert("Blog created succcessfully");
        navigate("/myblogs");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div
          className={`p-4 col-md-6 col-sm-10 mt-5 shadow-lg mb-5 bg-white rounded`}
        >
           <h3 className="text-center m-2">Create A Blog New Blog</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group m-3">
              <label for="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter Title"
                onChange={handleChange}
              />
            </div>
            <div className="form-group m-3">
              <label for="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="Description"
                onChange={handleChange}
              />
            </div>
            <div className="form-group m-3">
              <label for="image">Image URL</label>
              <input
                type="text"
                className="form-control"
                id="image"
                placeholder="Enter Image URL"
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary m-3">
              Create Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
