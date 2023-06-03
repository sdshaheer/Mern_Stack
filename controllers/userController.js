const userModel = require('../DataBase/Models/userModel')
const bcrypt = require('bcrypt')

// create user register
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // validation
    if (!username || !email || !password) {
      return res.status(400).send({
        message: "please fill all fields",
        success: false,
      });
    }

    // existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        message: "user already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = new userModel({ username, email, password:hashedPassword });
    await newUser.save();
    return res.status(201).send({
      message: "New user created",
      success: true,
      newUser
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in Register callback",
      successs: false,
      error
    });
  }
};



// get all users
exports.getAllUsers = async (req, res) => {
    try{
        const users = await userModel.find({})
        res.status(200).send({
            userCount:users.length,
            message:'all users data',
            success:true,
            users
        })

    }catch(error){
        console.log(error);
        return res.status(500).send({
        message: "Error in fetching users callback",
        successs: false,
        error
    });
    }
};

//login
exports.loginController = async (req,res) => {
    try {
        const {email, password } = req.body;
    
        // validation
        if (!email || !password) {
          return res.status(400).send({
            message: "please provide email and password",
            success: false,
          });
        }
    
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(401).send({
                message:'email is not registered',
                success:false
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).send({
                message:'Invalid username or password',
                success:false
            })
        }

        return res.status(200).send({
            message:'Login successfull',
            success:true,
            user
        })

      } catch (error) {
        console.log(error);
        return res.status(500).send({
          message: "Error in Login callback",
          successs: false,
          error
        });
      }
};
