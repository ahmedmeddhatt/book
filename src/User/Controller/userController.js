const queries = require('../../../db/queries')
const dbConnection = require('../../../db/connection')
const {pagination} = require('../../../Utils/pagination')
const {isValidEmail,isValidPassword} = require('../../../Utils/validation')
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




exports.GetUserList = async (req,res) => {
    try {
       const { page, limit } = req.query;

        // Retrieve total number of items from the database (e.g., using COUNT query)
       const countUserQuery = queries.queryList.COUNT_USER_QUERY;
       const countResult = await dbConnection.dbQuery(countUserQuery);
       const totalItems = countResult.rows[0].count;

       // Call pagination to get pagination metadata
       const { currentPage, totalPages, offset } = pagination(page, limit, totalItems);
       const values = [limit, offset];
       const userListQuery = queries.queryList.GET_USER_LIST;
       const result = await dbConnection.dbQuery(userListQuery, values);
       const users = result.rows;

       // Check if User Exists
       if (result.rows.length === 0) {
           return res.status(404).send({ error: 'No Users Found!' });
       }
       // Logger Service;
       logger.info('Get Users List', users)

       // Audit Service
       auditService.prepareAudit
       (auditAction.actionList.get_users_list, users, null, 'Postman', auditAt)

       return res.status(200).json({currentPage, totalPages, totalItems, users});
   } catch (err) {
       console.log('Error: ', err);

        // Audit Service
        auditService.prepareAudit
        (auditAction.actionList.get_users_list, null, JSON.stringify(err), 'Postman', auditAt)

       return res.status(500).send({error: 'Failed To List Users'});
   }
}




exports.AddUser = async (req,res) => {

    try {
        const { userName, password, email, fullName, userType, groups } = req.body;
        const createdBy = 'Admin';
        const createdAt = new Date();

        if (!userName || !password || !email || !fullName || !userType || !groups) {
            return res.status(500).send({ error: 'All Fields Are Required!' });
        }

        // Checking If User Exists
        const isUserExist = queries.queryList.GET_USER_BY_ID;
        const checkUser = await dbConnection.dbQuery(isUserExist, [userName, email]);
        if(checkUser.rows[0].count != 0){
            return res.status(500).send({ error: 'User Already Exist!' });
        }

        // Email Validation
        if (!isValidEmail(email)) {
            return res.status(500).send({ error: 'Email Is Not Valid!!' });
        }
        // Password Validation
        if (!isValidPassword(password)) {
            return res.status(500).send({ error: 'Password Is Not Valid!!' });
        }
        // Hashing Password
        const hashedPass = await bcrypt.hash(password, 10)
        const values = [userName, email, fullName, hashedPass, userType, createdAt, createdBy];
        const addUserQuery = queries.queryList.ADD_USER;
        const result = await dbConnection.dbQuery(addUserQuery, values);

        if (result.rows.length === 0) {
            return res.status(500).send({ error: 'Failed To Create User' });
        }

        const createdUser = result.rows;
        return res.status(201).json(createdUser);
       
    } catch (err) {
        console.log('Error: ', err);
        return res.status(500).send({error: 'Failed To Create User'});
    }
}


exports.GetOne = async (req,res) => {
    try {
        const { user_id } = req.params;
        if(isNaN(user_id)){
            
            throw new ApiError(errorType.API_ERROR, statusCode.INTERNAL_SERVER_ERROR,
            `${user_id} `+ message.NOT_NUMBER, true)
        }
        const getUserQuery = queries.queryList.GET_UPDATED_USER_QUERY;
        const values = [user_id];
        const result = await dbConnection.dbQuery(getUserQuery, values);

        if (result.rows.length === 0) {
            return res.status(404).send({ error: 'User Not Found!' });
        }

        return res.status(200).json(result.rows); // Assuming user_id is unique, return the first (and only) row
    } catch (err) {
        console.log('Error: ', err);
        if( err.name === errorType.SQL_INJECTION_ERROR){
            // send an emaillllllllllllllllllll
        }
        return res.status(500).send({ error: 'Failed To Fetch User!' });
    }
}


exports.Up = async (req,res) => {
    try {
        const { user_id } = req.params;
        const { userName, password, email, fullName, userType, active } = req.body;

        const updateUserQuery = queries.queryList.UPDATE_USER;
        const values = [fullName, password, userType, active, user_id ];

        await dbConnection.dbQuery(updateUserQuery, values);

        const getUpdatedUserQuery = queries.queryList.GET_UPDATED_USER_QUERY;
        const updatedUser = await dbConnection.dbQuery(getUpdatedUserQuery, [user_id]);

        if (updatedUser.rows.length === 0) {
            return res.status(404).send({ error: 'User Not Found!' });
        }

        return res.status(200).json(updatedUser.rows);
    } catch (err) {
        console.log('Error: ', err);
        return res.status(500).send({ error: 'Failed To Update User!' });
    }
}



exports.Del = async (req,res) => {
        
    try {
        const { user_id } = req.params;

        const getUserQuery = queries.queryList.GET_UPDATED_USER_QUERY;
        const findUser = await dbConnection.dbQuery(getUserQuery, [user_id]);

        if (findUser.rows.length === 0) {
            return res.status(404).send({ error: 'User Not Found!' });
        }
        const deleteUserQuery = queries.queryList.DELETE_USER_QUERY;
        const values = [user_id];

         await dbConnection.dbQuery(deleteUserQuery, values);

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.log('Error: ', err);
        return res.status(500).send({ error: 'Failed To Delete User' });
    }

}