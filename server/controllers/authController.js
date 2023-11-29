const User = require('../models/user')
const Profile = require(`../models/profile`)
const Course = require(`../models/course`)
const {hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken')

const test = (req,res) => {
  res.json(`Test is working`)
}

//register endpoint
const registerUser = async(req, res) => {
  try {
      const {username, id, gender, birthday, address, email, password, cpassword} = req.body;
      //check if name was enter
      if (!username){
        return res.json({
          error: "name is required"
        })
      }
      const username_exist = await User.findOne({username})
      if(username_exist){
        return res.json({
          error: "Username already taken"
        })
      }
      //check password
      if (!password || password.length < 6){
          return res.json({
            error: "Password should be atleast 6 characters long"
          })
      }
      if(password != cpassword){
        return res.json({
          error: "Mismatched password"
        })
      }

      //Check email
      const email_exist = await User.findOne({email});
      if(email_exist) {
        return res.json({
          error: "Email already taken"
        })
      }

      const hashedPassword = await hashPassword(password)

      //create user database
      const user = await User.create({
        username,
        id,
        gender,
        birthday,
        address,
        email,
        password: hashedPassword,
      })
      return res.json(user)

  } catch (error) {
      console.log(error)
  }
}

//login endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: 'No User Found',
      });
    }

    // Check if password matches
    const match = await comparePassword(password, user.password);
    if (match) {
      // Check if profile exists
      const profile = await Profile.findOne({ username: user.username });
      if (!profile) {
        // Create a new profile if it doesn't exist
        const prof = await Profile.create({
          username: user.username,
          gpa: 0.0,
          course: [{ grade: 0.0, credit: 0, coursename: 'none', state: 'N/A' }],
          puzzlesolve: 0,
        });
        profile = await Profile.findOne({ username: user.username });
      }

      // Sign and send the JWT token
      jwt.sign({ email: user.email, 
                 id: user._id, 
                 username: user.username , 
                 gpa: profile.gpa, 
                 course: profile.course, 
                 puzzlesolve: profile.puzzlesolve,
                 gender: user.gender,
                 birthday: user.birthday,
                 address: user.address,
                 uid: user.id 
                }, process.env.JWT_SECRET, {}, (err, token) => {
        if (err) {
          console.error(err);
          return res.json({ error: 'Error signing token' });
        }
        res.cookie('token', token).json(user); // Password match, then set cookie
      });
    } else {
      res.json({
        error: 'Password Mismatched',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getProfile = (req,res) => {
  const {token} =req.cookies
  if(token) {
    jwt.verify(token,process.env.JWT_SECRET, {}, (err, user) => {
      if(err) throw err;
      res.json(user)
    })
  } else {
    res.json(null)
  }
}

const updateUser = async (req, res) => {
  try {
    const { username, id, gender, birthday, address, email, description } = req.body;
    const userId = req.params.userId;

    // Check if the user exists
    const user = await User.findOne({ "username": username });

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    // Update user data
    user.username = username;
    user.id = id;
    user.gender = gender;
    user.birthday = birthday;
    user.address = address;
    user.email = email;
    user.description = description;

    // Save the updated user
    const updatedUser = await user.save();

    // You can customize the response as needed
    return res.json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const logoutUser = (req, res) => {
  // Clear the authentication cookiea
  res.clearCookie('token').json({ message: 'Logout successful' }).redirect('/');
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
  updateUser,
  logoutUser
}
