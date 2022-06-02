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
app.use(express.json())


const UserSchema = new mongoose.Schema({

    profileType: {
      type: String,
      required: true,
      enum: ['petowner', 'petsitter'],
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    animalType: {
      type: Array,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    duration:{
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
    image: {
      type: String,
    },
    reviews: {
      type: Array,
    },
    createdAt: {
      type: Date,
      default: () => new Date()
    },
})
//QUESTION FOR 1:1 session
//1) When the type is array and required true, it still allows to post without including them, why?
//2) is the type for dates also a string?
//3) how we upload and strorage an image?
//4) should the reviews be an object, because later we will storage the review and the username who gave that review, is this done my nested schema?
//5) how much data we can storage to mongo database with images?


const User = mongoose.model("User", UserSchema)


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

//to test that the authentication is working
app.get("/users", authenticateUser);
app.get("/users", async (req, res) => {
  const users = await User.find({})
  .sort({createdAt: 'desc'})
  res.status(201).json(users)
});





 app.post('/signup', async (req, res) => {
    const { profileType, username, email, animalType, location, duration, startDate, endDate, password, image, reviews} = req.body
    try {
      const salt = brypt.genSaltSync()
  
      if (password.length < 8) {
        throw 'Password must be at least 8 characters long'
      }
  
      const newUser = await new User({
        profileType,
        username,
        email,
        animalType,
        location,
        duration,
        startDate,
        endDate,
        password: bcrypt.hashSync(password, salt),
        image, 
        reviews,
      }).save()
  
      res.status(201).json({
        response: {
          profileType: newUser.profileType,
          userId: newUser._id,
          username: newUser.username,
          email: newUser.email,
          animalType: newUser.animalType,
          location: newUser.location,
          duration: newUser.duration,
          startDate: newUser.startDate,
          endDate: newUser.endDate,
          accessToken: newUser.accessToken,
          image: newUser.image,
          reviews: newUser.reviews,
        },
        success: true
        })
    } catch(error) {
        res.status(400).json({ response: error, success: false })
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body
  
    try {
      const user = await User.findOne({ username })
  
      if (user && brypt.compareSync(password, user.password)) {
        res.status(200).json({
          response: {
            userId: user._id,
            username: user.username,
            accessToken: user.accessToken
          },
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

app.put("/edit", async (req,res) => {
 
  const { userId, username }  = req.body;

  try {
    const editingName = await User.findOneAndUpdate(userId, {username: username} );
    
    if (editingName) {
      res.status(200).json({
        response: editingName,
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
       

app.get("/", authenticateUser)
app.get("/", (req, res) => {
    res.send("Hello World!")
})




app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`)
})