const express = require("express");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// connect DB
require('./db/connection');

// import files
const Users = require('./modals/users');
const Conversations = require('./modals/Conversations');
const Messages = require('./modals/Messages');


// app use
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;


// Routes
app.get("/", (req, res) => {
    res.send("hello yogesh")
})

app.post("/api/register", async (req, res, next) => {
    try {
        const { fullName, email, password} = req.body;

        if(!fullName || !email || !password) {
            res.status(400).send('please fill the required fields')
        } else {
             const isAlreadyEmailExist = await Users.findOne({ email: email})

             if(isAlreadyEmailExist) {
                res.status(400).send("User Already Exist")
             } else {
                const newUser = new Users({ fullName, email })
                bcryptjs.hash(password, 10, (err, hashedPassword) => {
                    newUser.set('password', hashedPassword)
                    newUser.save();
                    next();
                })
                return res.status(200).send("user registered successfully")
             }
        }
    } catch (error) {
        console.log(error, "error")
    }
})

app.post("/api/login", async (req, res, next) => {
    try {
        const { email, password} = req.body;

        if(!email || !password) {
            res.status(400).send("All fields are required")
        } else {
            const user = await Users.findOne({ email: email});
            if(!user) {
                res.status(400).send("User is not found")
            } else {
                const validatePassword =await bcryptjs.compare(password, user.password);
                if(!validatePassword) {
                    res.status(400).send("password is wrong")
                } else {
                    const payload = {
                        userId: user._id,
                        email: user.email
                    }

                    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "THIS_IS_A_JWT_SECRET_KEY"

                    jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 84600}, async (err, token) => {
                        await Users.updateOne({ _id: user._id}, {
                            $set: { token }
                       })
                        user.save();
                        next()
                    })

                    res.status(200).json({ user: { fullName: user.fullName, email: user.email}, token: user.token})
                }
            }
        }
    } catch (error) {
        console.log(error, "error")
    }
})

app.post("/api/conversation", async (req, res) => {
   try {
    const { senderId, receiverId } = req.body;
    const newConversation = new Conversations({ members: [senderId, receiverId]});
    await newConversation.save();
    res.status(200).send('Conversation created successfully')
   } catch (error) {
    console.log(error, "error")
   }
})

app.get("/api/conversation/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const conversations = await Conversations.find({ members: { $in: [userId] }})
        const conversationUserData = Promise.all(conversations.map(async (conversation) => {
            const receiverId = conversation.members.find((member) => member !== userId)
            const user = await Users.findById(receiverId);
            return { user: { fullName: user.fullName, email: user.email}, conversationId: conversation._id}
        }))
        res.status(200).json(await conversationUserData);        
    } catch (error) {
        console.log(error, 'Error')
    }
})

app.post("/api/messages", async (req, res) => {
    try {
        const { conversationId, senderId, message} = req.body;
        const newMessage = new Messages({ conversationId, senderId, message});
        await newMessage.save();
        res.status(200).send("mesaage sent successfully")
    } catch (error) {
        console.log(error, "Error")
    }
})

app.get("/api/messages/:conversationId", async (req, res) => {
    try {
        const conversationId = req.params.conversationId;
        const messages = await Messages.find({ conversationId })
        const messageUserData = Promise.all(messages.map(async (message) => {
            const user = await Users.findById(message.senderId);
            return { user: { email: user.email, fullName: user.fullName }, message: message.message}
        }))
        res.status(200).json(await messageUserData)
    } catch (error) {
        
    }
})


app.listen(port, () => {
    console.log("app is running on port " + port)
})