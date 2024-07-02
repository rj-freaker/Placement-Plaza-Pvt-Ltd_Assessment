const User = require('./user.model');

exports.signup = async (req,res) => {
    try{
        const userData = req.body;
        const newUser = new User(userData);
        const response = await newUser.save();

        res.status(200).json({
            message: "Signup data saved to db successfully",
            data: response
        })
    }
    catch(err){
        res.status(500).json(
            {message: "Error occured in signup process", 
            error: err.message
        })
    }
}
