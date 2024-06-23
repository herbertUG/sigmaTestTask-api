const signup = async (req, res, next) => {
    res.json({
        message: 'Signup successful',
        status: 'success',
    })
};

const login = async (req, res, next) => {
    res.json({
        message: 'Login successful',
        status: 'success',
    })
};


module.exports = {signup, login};