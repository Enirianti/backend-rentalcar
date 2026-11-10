const express = require("express");
const router = express.Router();
const { User, userRef }  = require("../models/userModel")

router.post("/login", async(req, res) => {
    const {username, password} = req.body

 if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    try {
        const user =  await userRef.orderByChild("username").equalTo(username).once("value");

       if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const users = user.val();
        const userId = Object.keys(users)[0];

        if (users[userId].password === password) {
            return res.status(200).json({ message: "Login successful",  user: users[userId] });
        } else {
            return res.status(400).json({ message: "Invalid username or password" });
        }
    } catch (error) {
            return res.status(400).json(error);
    }
});

router.post("/register", async(req, res) => {
  const { username, password, cpassword } = req.body;

    if (!username || !password || !cpassword) {
    return res.status(400).json({ message: "All fields required" });
  }

  if (password !== cpassword) {
    return res.status(400).json({ message: "Password does not match" });
  }

    try {

      const usernameRef = userRef.orderByChild('username').equalTo(username);
      const userSnapshot = await usernameRef.once('value');

      if(userSnapshot.exists()) {
        return res.status(400).json({ message: "Username is already taken" });
      }
        
       const newUser = new User({ username, password });
        await userRef.child(newUser.id).set(newUser);
            return res.status(200).json({ message: "User registered successfully" });

    } catch (error) {
            return res.status(400).json(error);
    }
});

module.exports = router