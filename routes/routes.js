const express = require('express')

const userController = require('../controller/userController')

const routes = new express.Router()

routes.post('/register', userController.registerController)
routes.post('/login', userController.loginController)
routes.post('/forgot-password', userController.forgotPasswordController)
routes.put('/reset_password/:id/:token', userController.resetPasswordController)




module.exports = routes