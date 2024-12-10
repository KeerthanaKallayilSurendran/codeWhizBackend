const Razorpay = require('razorpay');
const crypto = require('crypto');
const studentCourses = require('../model/studentCourseModel');
const Courses = require('../model/courseModel');
const VideoClasses = require('../model/videoClassModel');

// Controller for creating Razorpay orders
exports.razorpayOrderController = async (req, res) => {
    console.log("Inside Razorpay order controller");

    try {
        // Initialize Razorpay instance with API keys
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        // Get order options from request body
        const options = req.body;
        // console.log(options);
        

        // Create an order
        const order = await razorpay.orders.create(options);

        // Check if order creation failed
        if (!order) {
            return res.status(500).json("Order not placed");
        }

        // Send the order details as a response
        res.json(order);
    } catch (error) {
        // Log and send error response
        console.error("Error in creating Razorpay order:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


// controller for validating the razorpay payment
exports.razorpayOrderValidationController = async (req, res) => {
    try {
        console.log("Inside Razorpay Validation");

        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            orderDetails,
            course,
            user
        } = req.body;

        // Validate required fields
        if (
            !razorpay_payment_id ||
            !razorpay_order_id ||
            !razorpay_signature ||
            !orderDetails ||
            !course ||
            !user
        ) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const { id: orderId } = orderDetails;
        const { _id: courseId } = course;
        const { _id: userId } = user;

        // Validate Razorpay Signature
        const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = sha.digest("hex");

        if (digest !== razorpay_signature) {
            return res.status(400).json({ message: "Payment validation failed" });
        }

        // Check if the user is already enrolled in the course
        const existingCourse = await studentCourses.findOne({ courseId, userId });
        if (existingCourse) {
            return res.status(409).json({ message: "You are already enrolled in this course" });
        }

        // Save new course enrollment
        const newCourse = new studentCourses({ courseId, orderId, userId });
        await newCourse.save();
        
        // Respond with success
        res.status(200).json(
            "Payment validation successful and course enrolled");
    } catch (error) {
        console.error("Error in Razorpay validation:", error);
        res.status(500).json("Internal server error");
    }
};


exports.getStudentCourses = async (req, res) => {
    console.log("inside get joined courses");
    const { id } = req.params; // Get userId from the route parameters
    console.log(id)
    try {
        // Fetch all courses the user has joined
        const courses = await getJoinedCourses(id);

        if (courses.length === 0) {
            return res.status(404).json({ message: 'No courses found for this student.' });
        }

        res.status(200).json(courses);
    } catch (error) {
        console.error('Error in getStudentCourses:', error);
        res.status(500).json('Internal Server Error' );
    }
};

const getJoinedCourses = async (userId) => {
    console.log("Inside get joined Courses method");
    
    console.log(userId);
    
    
    try {
        // Step 1: Find all course IDs for the given user ID
        const studentJoinCourses = await studentCourses.find({ userId });
        // console.log(studentJoinCourses);
        

        if (studentJoinCourses.length === 0) {
            return [];
        }

        // Step 2: Extract course IDs
        const courseIds = studentJoinCourses.map((sc) => sc.courseId);
        // console.log(courseIds);
        

        // Step 3: Fetch course details from the Courses model
        const courses = await Courses.find({ _id: { $in: courseIds } });
        console.log(courses);
        

        return courses;
    } catch (error) {
        console.error('Error fetching joined courses:', error);
    }
};

exports.viewUserClassController = async(req,res)=>{
    console.log("Inside view user  class controller");
    const courseId = req.params.courseId
    console.log(courseId);
    
    
    try {
        const allVideos = await VideoClasses.find({courseId})
        console.log(allVideos);
        
        res.status(200).json(allVideos)
    } catch (error) {
        res.status(401).json(error)
    }
    
}