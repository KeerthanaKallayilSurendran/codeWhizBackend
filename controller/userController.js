const users = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
// register controller
exports.registerController = async(req, res) => {
    console.log("Inside register Controller");
    // console.log(req.body);
    const {username, userType, email, password} = req.body
    try {
        
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(406).json("You are already registerd Please Login")
        }else{
            const hashPassword = await bcrypt.hash(password, 10)
            // console.log(hashPassword);
            
            const newUser = new users({
                username, userType, email, password:hashPassword
            })
            // console.log(newUser);
            newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(401).json(err)
    }
}


// login controller
exports.loginController = async (req, res) => {
    console.log("inside Login Controller");
    const { email, password } = req.body;
    try {
        const existingUser = await users.findOne({ email });
        console.log({email});
        console.log(existingUser);
        
        if (existingUser) {
            const isMatch = await bcrypt.compare(password, existingUser.password);
            console.log(isMatch);
            
            if (isMatch) {
                const token=jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
                console.log(token);
                
                res.status(200).json({ user: existingUser, token });
            } else {
                res.status(404).json("Incorrect Password");
            }
        } else {
            res.status(406).json("You are not registered");
        }
    } catch (err) {
        res.status(401).json(err);
    }
};


// forgotPasswordController


exports.forgotPasswordController = async (req, res) => {
    console.log("Inside forgot password controller");

    const { email } = req.body;

    try {
        // Check if user exists
        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            return res.status(404).json('User not found');
        }

        // Generate a JWT token for password reset
        const resetToken = jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)

        // Create transport for nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const resetLink = `${process.env.FRONTEND_URL}/reset_password/${existingUser._id}/${resetToken}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: existingUser.email,
            subject: 'Password Reset Request',
            html: `
                <h2>Password Reset Request</h2>
                <p>You requested to reset your password. Click <a href="${resetLink}">here</a> to reset it.</p>
                <p>This link will expire in 1 hour. If you did not request this, please ignore this email.</p>
            `,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json('Password reset email sent' );
    } catch (err) {
        console.log(err);
        
        res.status(500).json(err);
    }
};


// resetpassword
exports.resetPasswordController = async (req, res) => {
    console.log("Entering resetPasswordController");

    const { id, token } = req.params;
    const { password } = req.body;

    // console.log("Received Data:", { id, token, password });

    try {
        jwt.verify(token, process.env.JWTPASSWORD, async (err, decoded) => {
            if (err && err.name === "TokenExpiredError") {
                return res.status(401).json("Token has expired");
            } else if (err) {
                return res.status(401).json("Invalid token");
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const updateUser = await users.findByIdAndUpdate(
                id,
                { password: hashedPassword },
                { new: true }
            );
            
            if (!updateUser) {
                return res.status(404).json("User not found");
            }

            // console.log(updateUser);
            res.status(200).json("Password updated successfully");
        });
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal server error");
    }
};

exports.getAllStudentsController = async(req,res)=>{
    console.log("Inside get all students controller");
    try {
        const allStudents = await users.find({ userType: 'Student' });
        if(allStudents.length>0){
            res.status(200).json(allStudents)
        }else{
            res.status(404).json("No Students joined")
        }
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
        
    }
}
