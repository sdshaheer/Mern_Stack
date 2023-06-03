import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BlogCard = (props) => {
  const navigate = useNavigate();
  console.log(props);

  const style = {
    width: `50%`,
    height: `25%`,
  };

  const handleEdit = () => {
    navigate(`/editblog/${props.blogId}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `/api/v1/blogs/delete-blog/${props.blogId}`
      );
      if (data?.success) {
        alert("Blog Deleted succcessfully");
        window.location.reload();
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="d-flex flex-col justify-content-center m-3">
        <div className="card w-50 m-3 shadow  bg-white rounded">
          <div className="d-flex ">
            <div className="mr-auto">
              <FaUserCircle className="m-3" />
              <span>{props.username}</span>
            </div>
            {props.belongsToUser && (
              <div className="ms-auto m-2">
                <AiOutlineEdit onClick={handleEdit} className="m-2 text-primary" />
                <MdDelete onClick={handleDelete} className="m-2 text-danger" />
              </div>
            )}
          </div>
          <img
            className="card-img-top"
            src={props.image}
            alt="Card image cap"
          />
          <div className="card-body">
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
