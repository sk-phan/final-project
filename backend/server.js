import express from "express"
import mongoose from "mongoose"
import cors from 'cors'
import crypto from 'crypto'
import brypt from 'bcrypt'


const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/final-project'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

const UserSchema = new mongoose.Schema({
    profileType:{
        type: String,
       // required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    //for later to check the email validation
    email: {
        type: String,
        //required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }, 
    accessToken: {
        type: String,
        default: () => crypto.randomBytes(128).toString("hex"),
    },
    animalType: {
        type: String,
    },
    time:{
        type: String,
    },
    startDate:{
        type: String,
    },
    EndDate:{
        type: String,
    },
    review: {
        type: String,
    },
    image: {
        type: String,
    }
})


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





 app.post('/signup', async (req, res) => {
    const { username, password } = req.body
    try {
      const salt = brypt.genSaltSync()
  
      if (password.length < 8) {
        throw 'Password must be at least 8 characters long'
      }
  
      const newUser = await new User({
        username,
        password: brypt.hashSync(password, salt)
      }).save()
  
      res.status(201).json({
        response: {
          userId: newUser._id,
          username: newUser.username,
          accessToken: newUser.accessToken
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