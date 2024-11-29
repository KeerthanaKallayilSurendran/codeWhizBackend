const express = require('express')
const jwtMiddlware = require('../middleware/jwtMiddleware')
const multerMiddleware = require('../middleware/multerMiddleware')
const userController = require('../controller/userController')
const courseController = require('../controller/courseController')

const routes = new express.Router()

routes.post('/register', userController.registerController)
routes.post('/login', userController.loginController)
routes.post('/forgot-password', userController.forgotPasswordController)
routes.put('/reset_password/:id/:token', userController.resetPasswordController)
routes.post('/add-course', jwtMiddlware, multerMiddleware.single("courseImg"), courseController.addCourseController)



module.exports = routes