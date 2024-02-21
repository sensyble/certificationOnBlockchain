const bcrypt = require("bcryptjs");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config()


const registerUser = async (req, res, next) => {
    
  // email id duplication validation
  let checkExistingUser;
  try {
    checkExistingUser = await userModel.findOne({ email: req.body.email });
  } catch (error) {
    console.log("User exist already", error.message);
  }

  if (checkExistingUser) {
    return res.status(400).json({ message: "User exist already" });
  }
  // email id duplication validation end

  const {
    name,
    username,
    email,
    institute_id,
    password,
    confirm_password,
    institute_role,
  } = req.body;

  // hashing the password and confirm password
  const hashedPassword = bcrypt.hashSync(password);
  const hashedConfirmPassword = bcrypt.hashSync(confirm_password);

  // Create a new user instance
  const newUser = new userModel({
    name,
    username,
    email,
    institute_id,
    password: hashedPassword,
    institute_role,
    confirm_password: hashedConfirmPassword,
  });

  try {
    // Save the user to the database
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error while saving user:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const loginUser = async(req,res, next) =>{

  const { email, password } = req.body;

  // checking user exists or not
  let exisitingUser;
  try {
    exisitingUser = await userModel.findOne({ email: email });
  } catch (error) {
    console.log(error);
  }

  if (!exisitingUser) {
    return res.status(400).json({ message: "User not found, Please Signup" });
  }

    // /comparing hashed password of user with given password at the time of login
    const isPasswordCorrect = bcrypt.compareSync(password, exisitingUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({message: "Invalid Email / Password, Please check your credentials",});
    }

    const loginToken = jwt.sign({id:exisitingUser._id}, process.env.JWT_SECRET_KEY, {
      expiresIn:"35s"
    })
    console.log("login token first time", loginToken)

    if(req.cookies[`${exisitingUser._id}`]){
      req.cookies[`${exisitingUser._id}`] = " "
    }

    res.cookie(String(exisitingUser._id), loginToken,{
      path:"/",
      expires: new Date(Date.now()+1000*40),
      httpOnly:true,
      sameSite:"lax"
    })

    console.log("cookies first time",exisitingUser)

    return res.status(200).json({message: "Successfully Logged In", user:exisitingUser, loginToken})
 
}

const verifyToken = async(req, res, next) =>{

  const cookies = req.headers.cookie;
  console.log(cookies)
  const token = cookies.split("=")[1] //getting only value of cookie which we set as the token

  // this is getting token from req.headers.['authorization]
  // const headers = req.headers[`authorization`]
  // console.log(headers)
  // const token = headers.split(" ")[1] 

  if(!token){
    res.status(400).json({message:"NO token found"})
  }
  
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (error, user)=>{
    if(error){
      res.status(400).json({message:"Invalid Token"})
    }
    console.log(user)
    req.id = user.id
    console.log(user.id)
  })
  next()
}

const getUser = async(req, res, next) =>{
  const userId = req.id

  let user 
  try{
    user = await userModel.findById(userId, "-password")
  }catch(error){
    return new Error(error)
  }

  if(!user){
    return res.status(400).json({message:"User not found"})
  }
   console.log(user)
  return res.status(200).json({user})

}

const refreshToken = (req,res, next) =>{
  console.log("error hwer")
  const cookies = req.headers.cookie
  console.log(cookies)
  const prevToken = cookies.split("=")[1]

  if(!prevToken){
    return res.status(400).json({message:"No Token found in refreshToken"})
  }

  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (error, user)=>{
    if(error){
      return new Error ("error in refresh token jwt", error)
    }

    console.log(user)

    res.clearCookie(`${user.id}`)
    req.cookies[`${user.id}`] = ""

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "35s",
    });
    console.log("Regenerated Token\n", token);

    res.cookie(String(user.id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30), // 30 seconds
      httpOnly: true,
      sameSite: "lax",
    });

    req.id = user.id
    next()
  })
}

const logout  = (req,res,next)=>{
  const cookies = req.headers.cookie
  const prevToken = cookies.split("=")[1]

  if(!prevToken){
    return res.status(400).json({message:"Failed to fetch the token"})
  }

  jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (error, user)=>{
    if(error){
      return new Error ("error in refresh token jwt", error)
    }

    res.clearCookie(`${user.id}`)
    req.cookies[`${user.id}`] = ""

    return res.status(200).json({message:"User Logged Out Successfully"})
  })
}
module.exports = { registerUser, loginUser, verifyToken, getUser, refreshToken, logout};
