const express =require("express");
const routes=express.Router()
const userController  = require("../controller/userController");
const auth=require('../Middleware/protectRoute')


routes.post('/auth',userController.authUser)


routes.post('/register',userController.registerUser)


routes.post('/logout',userController.logout)


routes.get('/getUser',auth,userController.getUser)

routes.post('/updateUser',auth,userController.updateUser)

module.exports=routes