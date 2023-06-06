const BaseError = require("./base.error");

class ApiError extends BaseError {
    constructor(name, statusCode, description, isOperational){
        super(name, statusCode, description, isOperational)
    }
}


module.exports = ApiError;