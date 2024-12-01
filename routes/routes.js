const express = require('express')
const userController = require('../controller/userController')
const courseController = require('../controller/courseController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multerMiddleware = require('../middleware/multerMiddleware')

const routes = new express.Router()

routes.post('/register', userController.registerController)
routes.post('/login', userController.loginController)
routes.post('/forgot-password', userController.forgotPasswordController)
routes.put('/reset_password/:id/:token', userController.resetPasswordController)
routes.post('/add-category', jwtMiddleware, courseController.addCategoryController)
routes.get('/view-category', jwtMiddleware, courseController.viewCategoryController)
routes.post('/add-course', jwtMiddleware, multerMiddleware.single('courseImg'), courseController.addProjectController)
routes.get('/view-user-course/:categoryId',jwtMiddleware, courseController.viewUserCourseController)
routes.delete('/user-course-delete/:id', jwtMiddleware,courseController.deleteCourseController)
routes.put('/user-course-edit/:id', jwtMiddleware,multerMiddleware.single('courseImg'),courseController.editCourseController)




module.exports = routes