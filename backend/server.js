import express from "express"
import mongoose from "mongoose"
import cors from 'cors'
import crypto from 'crypto'
import bcrypt from 'bcrypt'


const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/final-project'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const port = process.env.PORT || 8080
const app = express()

app.use(cors())

app.use(express.json({limit: '5000000mb'}))


const UserSchema = new mongoose.Schema({

    profileType: {
        type: String,
        required: true,
      },
    username: {
      type: String,
      required: true,
      //unique: true,
    },
      email: {
      type: String,
      required: true,
      //unique: true,
    },
    animalType: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    preferableTime:{
      type: Array,
      required: true,
    },
    startDate:{
      type: String,
      required: true,
    },
    endDate:{
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  
    accessToken: {
      type: String,
      default: () => crypto.randomBytes(128).toString("hex"),
    },
    img: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: () => new Date()
    },
    description: {
      type: String,
    },
    favorites: {
      type: Array,
    }
})
//QUESTION FOR 1:1 session
//1) When the type is array and required true, it still allows to post without including them, why?
//2) is the type for dates also a string?
//3) how we upload and strorage an image?
//4) should the reviews be an object, because later we will storage the review and the username who gave that review, is this done my nested schema?
//5) how much data we can storage to mongo database with images?


const User = mongoose.model("User", UserSchema)

const ReviewSchema = new mongoose.Schema({
  reviewerId: {
    type:String,
  },
  revieweeId: {
    type:String,
  },
  username: {
     type: String
   },
  img: {
     type: String
   },
  createdAt: {
    type: Date,
    default: () => new Date()
  },
  reviewText: {
    type:String,
  },
})

const Review = mongoose.model("Review", ReviewSchema)


 const authenticateUser = async (req, res, next) => {
    const accessToken = req.header('Authorization')
  
    try {
      const user = await User.findOne({ accessToken })
      if (user) {
        next()
      } else {
        res.status(401).json({ response: 'Please log in', success: false })
      }
    } catch (error) {
      res.status(400).json({ response: error, success: false })
    }
  }

//user endpoint
app.get("/users", authenticateUser);
app.get("/users", async (req, res) => {
  const users = await User.find({})
  .sort({createdAt: 'desc'})
  res.status(201).json(users)
});


//signup endpoint
 app.post('/signup', async (req, res) => {
    const { profileType, username, email, animalType, location, preferableTime, startDate, endDate, password, img, description, favorites } = req.body
    
  
    try {
      const salt = bcrypt.genSaltSync()
      const existingUser = await User.findOne({ email } || { username });

      if (password.length < 8) {
        throw 'Password must be at least 8 characters long'
      } else if (existingUser) {
        throw 'Account already exists, please log in'
      }
  
      const newUser = await new User({
        profileType,
        username,  
        email,
        animalType,
        location,
        preferableTime,
        startDate,
        endDate,
        password: bcrypt.hashSync(password, salt),
        img,
        description,
        favorites,
      }).save()
  
      res.status(201).json({
        response: newUser,
        success: true
        })
    } catch(error) {
        res.status(400).json({ response: error, success: false })
    }
})

//login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body
  
    try {
      const user = await User.findOne({ username })
  
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({
          response: user,
          success: true
        })
        
        
      } else {
        res.status(404).json({
          response: "Username or password doesn't match",
          success: false
        })
      }
    } catch (error) {
      res.status(400).json({ response: error, success: false })
    }
  })


//update user information endpoint
app.patch("/edituser", async (req,res) => {
 
  const { userId, profileType, username, email, animalType, location, duration, startDate, endDate, password, img, description, favorites}  = req.body;

  
  try {

    let editingUser;

    const existingUser = await User.findOne({userId})
    if (bcrypt.compareSync(password, existingUser.password)) {
      editingUser = await User.findByIdAndUpdate(userId, {profileType, username, email, animalType, location, duration, startDate, endDate, password, img, description, favorites} );
      
    } else {
      const salt = bcrypt.genSaltSync()
      editingUser = await User.findByIdAndUpdate(userId, {profileType, username, email, animalType, location, duration, startDate, endDate, password: bcrypt.hashSync(password, salt), img, description, favorites} );

    }
    
    if (editingUser) {
      res.status(200).json({
        response: editingUser,
        success: true

      })
    } else {
      res.status(400).json({
        response: 'Update Failed',
        success: false
      })
    }
  }
  catch(error) {
    res.status(404).json({
      response: error,
      success: false
    })
  }
  
})

//endpoint to detele the user
app.delete("/deleteuser", async (req, res) => {
  const { userId }  = req.body;
  try {
    const user = await User.deleteOne({ userId })
    res.status(201).json({response: user, success: true})
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})


//endpoint to get all reviews
app.get("/reviews", async (req, res) => {

  const reviews = await Review.find({})
  .sort({createdAt: 'desc'})
  res.status(201).json({
    response: reviews,
    success: true
  })
});

//endpoint to post review
app.post("/reviews", async (req, res) =>{
  
  const {reviewerId, revieweeId, username, img, reviewText} = req.body
  
  const newReview = await new Review({reviewerId, revieweeId, img, username ,reviewText,}).save()
  res.status(201).json({
    response: newReview,
    success:true
  })
})

//endpoint to for reviewer to edit review
app.patch("/editReview", async (req,res) => {

  const {reviewId, reviewText} = req.body;

  try {
    const editReview = await Review.findByIdAndUpdate(reviewId, { reviewText });

    if (editReview) {
      res.status(200).json({
        response: editReview,
        success: true
      })
    } 
    else {
      res.status(400).json({
        response: 'Update Failed',
        success: false
      })
    }
  } catch (error) {
     res.status(404).json({
       response: error,
       success: false
     })
  }  
})

//endpoint for both reviewer & reviewee to delete review
app.delete('/deleteReview', async (req,res) => {

  const { reviewId } = req.body;
  
  try {
    const deleteReview = await Review.findByIdAndDelete(reviewId);
    res.status(201).json({response: deleteReview, success: true})
  } catch (error) {
    res.status(400).json({ response: error, success: false })
  }
})
   

//Chatbox endpoints
const ChatSchema = new mongoose.Schema({
  sender: {
    type:String,
  },
  receiver: {
    type:String,
  },
  createdAt: {
    type: Date,
    default: () => new Date()
  },
	
  // Here we send the data as an array, update the data from frontend
  // Using the push method to update data
  // Example of what we send from frontend: ["hello", "hi", "I'm Suki"]
  // We will pass user ID or message ID, or how? to display it in frontend ? I dont know yet
  message: {
    type: Array,
  }
})

const Chat = mongoose.model("Chat", ChatSchema)


app.post("/send", async (req,res) => {

  const { senderId, receiverId, message } = req.body

  try {
    const newMessage = await new Chat({ senderId, receiverId, message}).save();

    if(newMessage) {
      res.status(201).json({
        response: newMessage,
        success: true
      })
    } 
    else {
      res.status(404).json({
        response: 'Fail to send',
        success: false 
      })
    }
  } catch (error) {
    res.status(400).json({
      response: error,
      success: false 
    })
  }
 
})


app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`)
})
