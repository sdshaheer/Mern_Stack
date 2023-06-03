const mongoose = require('mongoose')
const blogModel = require("../DataBase/Models/blogModel")
const userModel = require("../DataBase/Models/userModel")

// creates blog
exports.createBlogController = async (req, res) => {
  try {
    const {title,description,image,user} = req.body 
    if(!title || !description || !image || !user){
      return res.status(400).send({
        message:'Please provide all fields',
        success:false
      })
    }
    const existingUser = await userModel.findById(user)
    if(!existingUser){
      return res.status(404).send({
        message:'unable to find user',
        success:false
      })
    }
    const newBlog = new blogModel({title,description,image,user})
    const session = await mongoose.startSession()
    session.startTransaction()
    await newBlog.save({session})
    existingUser.blogs.push(newBlog)
    await existingUser.save({session})
    await session.commitTransaction()
    await newBlog.save()
    return res.status(200).send({
      message:'Blog created successfully',
      success:true,
      newBlog
    })

  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Error while creating the Blog",
      success: false,
      error,
    });
  }
};

// return all blogs
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate('user');
    if (!blogs) {
      return res.status(200).send({
        message: "No blogs Found",
        success: false,
      });
    }

    return res.status(200).send({
      message: "All blogs lists",
      blogsCount: blogs.length,
      success: true,
      blogs
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Error while getting all the Blogs",
      success: false,
      error,
    });
  }
};


// updates the blog 
exports.updateBlogController = async (req,res) => {
  console.log('hello')
  try {
    const {id} = req.params
    console.log("......",req.body,id)
    const blog = await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
    return res.status(200).send({
      message: "Blog updated successfully",
      success: true,
      blog
    });

  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Error while updating the Blog",
      success: false,
      error,
    });
  }
};


// return single blog by id
exports.getBlogByIdController = async(req,res) => {
  try {
    const {id} = req.params
    const blog = await blogModel.findById(id)
    if(!blog){
      return res.status(404).send({
        message: "No blog found with this id",
        success: false,
      });
    }
    return res.status(200).send({
      message: "The blog was found",
      success: true,
      blog
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Error while getting the single Blog by Id",
      success: false,
      error
    });
  }
};

// delete the blog
exports.deleteBlogController = async (req,res) => {
  try {
    const {id} = req.params
    const blog = await blogModel.findByIdAndDelete(id).populate("user")
    console.log(blog)
    await blog.user.blogs.pull(blog)
    await blog.user.save()
    return res.status(200).send({
      message: "The blog was deleted",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Error while deleting the Blog",
      success: false,
      error,
    });
  }
};

// get user blogs
exports.userBlogController = async (req,res) =>{
  try {
    const userBlog = await userModel.findById(req.params.id).populate('blogs')
    if(!userBlog){
      return res.status(404).send({
        message: "No blogs found for this user",
        success: false,
      });
    }
    return res.status(200).send({
      message: "user blogs found successfully",
      success: true,
      userBlog
    });
    
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      message: "Error in user blog",
      success: false,
      error,
    });
  }
  
}
