const express = require('express')
const userController = require('../controller/userController')
const courseController = require('../controller/courseController')
const jwtMiddleware = require('../middleware/jwtMiddleware')
const multerMiddleware = require('../middleware/multerMiddleware')
const studentController = require('../controller/studentController')

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
routes.post('/add-course-video/:id', jwtMiddleware, courseController.addCourseVideoClassController)
routes.get('/view-course-video/:id',jwtMiddleware, courseController.viewUserClassController)
routes.delete('/user-class-delete/:id', jwtMiddleware,courseController.deleteClassController)
routes.get('/view-home-course',jwtMiddleware, courseController.viewHomeCourseController)
routes.post('/order',jwtMiddleware,studentController.razorpayOrderController)
routes.post('/order/validate', studentController.razorpayOrderValidationController)
routes.get('/student-courses/:id', studentController.getStudentCourses)
routes.get('/student-video/:courseId', studentController.viewUserClassController)
routes.get('/get-all-students',jwtMiddleware, userController.getAllStudentsController)









module.exports = routes