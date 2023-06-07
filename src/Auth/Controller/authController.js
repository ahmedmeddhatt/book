const queries = require('../../../db/queries')
const dbConnection = require('../../../db/connection')
const {pagination} = require('../../../Utils/pagination')
const {generateToken} = require('../../../Utils/jwt')
const {isValidEmail,isValidPassword, comparePass} = require('../../../Utils/validation')
const Logger = require('../../../Services/logger.service')
const auditService = require('../../../Audit/auditService')
const auditAction = require('../../../Audit/auditAction')
const utils = require('../../../Utils/utility')
const {message} = require('../../../ErrorHandler/error.messages')
const ApiError = require('../../../ErrorHandler/api.error')
const statusCode = require('../../../ErrorHandler/error.status')
const errorType = require('../../../ErrorHandler/error.type')
const bcrypt = require('bcryptjs')




const auditAt = utils.dateFormat();
const logger = new Logger('userController')




exports.profile = async (req,res) => {
    const user = req.user;
    console.log('user', req);
    try {

       // Logger Service;
       logger.info('Get User Profile', user)

       // Audit Service
       auditService.prepareAudit
       (auditAction.actionList.get_user_profile, user, null, 'Postman', auditAt)

       return res.status(statusCode.OK).json(user);

   } catch (err) {
        // Audit Service
        auditService.prepareAudit
        (auditAction.actionList.get_user_profile, null, JSON.stringify(err), 'Postman', auditAt)

       return res.status(statusCode.INTERNAL_SERVER_ERROR).send({error: 'Failed To Get User Profile'});
   }
}




exports.login = async (req,res) => {

    try {
        const { userName, password} = req.body;

        if (!userName || !password) {
            return res.status(statusCode.BAD_REQUEST).send({ error: 'All Fields Are Required!' });
        }

        // Checking If User Exists
        const isUserExist = queries.queryList.GET_LOGIN;
        const result = await dbConnection.dbQuery(isUserExist, [userName]);
        const dbUser = result.rows[0];
        if (dbUser == null) {
            logger.info(`User: ${userName} Not Exists!`)
            return res.status(statusCode.UNAUTHORIZED).send({ error: 'Failed To Create User' });
        }

        const isValidPass = comparePass(password, dbUser.password)
        if(!isValidPass){
            logger.info(`Password of User: ${userName} Incorrect!`)
            return res.status(statusCode.UNAUTHORIZED).send({ error: 'Password Incorrect!!' });
        }

        const token = generateToken(dbUser.user_id, dbUser.username, dbUser.email, 
                        dbUser.full_name, dbUser.user_type )
        return res.status(statusCode.CREATED).json({message: 'Login Successfully 👍',token});
       
    } catch (err) {
        logger.error('Failed To Login!' + JSON.stringify(err))
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({error: 'Failed To Login!'});
    }
}
