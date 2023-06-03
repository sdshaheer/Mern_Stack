import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const EditBlog = () => {
  const [blog, setBlog] = useState({});
  const blogId = useParams().id;
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const getBlogDetails = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blogs/get-blog/${blogId}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data?.blog.title,
          description: data?.blog.description,
          image: data?.blog.image,
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    getBlogDetails();
  }, [blogId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const userId = localStorage.getItem("userId");

      const { data } = await axios.put(`/api/v1/blogs/update-blog/${blogId}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: userId,
      });
      if (data?.success) {
        alert("Blog Updated succcessfully");
        navigate("/myblogs");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const editChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div
          className="p-4 col-md-6 col-sm-10 mt-5 shadow-lg mb-5 bg-white rounded"
        >
          <h3 className="text-center m-2">Edit Blog Here ...!</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-group m-3">
              <label for="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter Title"
                onChange={editChange}
                value={inputs.title}
              />
            </div>
            <div className="form-group m-3">
              <label for="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="Description"
                onChange={editChange}
                value={inputs.description}
              />
            </div>
            <div className="form-group m-3">
              <label for="image">Image URL</label>
              <input
                type="text"
                className="form-control"
                id="image"
                placeholder="Enter Image URL"
                onChange={editChange}
                value={inputs.image}
              />
            </div>

            <button type="submit" className="btn btn-primary m-3">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
