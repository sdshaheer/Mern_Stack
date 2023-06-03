const express = require("express");
const {
  createBlogController,
  getAllBlogsController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  userBlogController
} = require("../controllers/blogController");

const router = express.Router();

// create blog
router.post("/create-blog", createBlogController);

// get all blogs
router.get("/all-blogs", getAllBlogsController);

// update blog
router.put("/update-blog/:id", updateBlogController);

// get single blog
router.get("/get-blog/:id", getBlogByIdController);

// delete blog
router.delete("/delete-blog/:id", deleteBlogController);

// get user blog
router.get("/user-blog/:id",userBlogController)

module.exports = router;
