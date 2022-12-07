const express = require('express')
const { set } = require('../database/models/personalInfo')
const router = express.Router()
const User = require('../database/models/user')
const passport = require('../passport')


router.post('/signup', (req, res, err) => {
    const { username, password } = req.body;
    
    User.findOne({username: username}, (error, user) => {
        if (error){
            console.log("Routes.js post error")
        }else if (user) {
            res.json({error: "sorry, a uuser with that username already exists"})
        }
        else{
            const newUser = new User({
                username: username,
                password: password,
            })
            newUser.save((error, savedUser) => {
                if (error) return res.json(error);
                return res.json(savedUser);
            })
        }
    })
})

router.get('/signin', (req, res, err) => {
    const { username, password } = req.query;
    User.findOne({username: username}, (error, user) => {
        if (error){
            console.log("Routes.js post error")
        }else if (user) {
            if (user.checkPassword(password)){
                res.send(user);
                return;
            }
            res.send(false);
        }else{
            res.json({error: "Sorry, that user is not in our database."})
        }
    })
})

router.put('/edit', (req, res, err) => {
    const { username, email } = req.body;
    User.updateOne({username: username}, {$set : {email : email}})
})

module.exports = router;