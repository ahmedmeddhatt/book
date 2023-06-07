const statusCode = require('../ErrorHandler/error.status')
const Logger = require('../Services/logger.service')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const logger = new Logger('userController')


exports.generateToken = (user_id, userName, email, fullName, userType ) => {
    const token = jwt.sign({ 
        userId: user_id,
        userName: userName,
        email: email,
        fullName: fullName,
        userType: userType,
     }, 
    process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });

      return token;
  
  };


  exports.verifyToken = async (role ) => {
    return async (req, res, next) => {
    try {
        const {token} = req.headers;
    if(!token){
        logger.info(`Token is not Exist!`)
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({error: 'Token is not Exist!'});
    } 
    
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    req.user = {
        userId: decoded.user_id,
        userName: decoded.userName,
        email: decoded.email,
        fullName: decoded.fullName,
        userType: decoded.userType
    }
        logger.info(`Token is Valid 👍`)
        next();

    } catch (err) {
        logger.error('Failed To Verify Token!' + JSON.stringify(err))
        return res.status(statusCode.UNAUTHORIZED).send({error: 'Failed To Verify Token!'});
    }
        }
  
  };