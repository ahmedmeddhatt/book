const winston = require('winston');
require('dotenv').config()


// data + logger level + message

const dateFormat = () => {
    return new Date(Date.now()).toLocaleString()
}

class loggerService {

    constructor(route){
        this.route = route;

        const logger = winston.createLogger({
            level: 'info',
            format: winston.format.printf(info => {
                let message = `${dateFormat()} || ${info.level.toUpperCase()} || ${info.message} || \n\n`;
                // message = info.obj ? message + `Data ${JSON.stringify(info.obj)}` : message;
                if (info.obj) {
                    message += `Data ${JSON.stringify(info.obj)}`;
                  } else if (info.arr) {
                    message += `Array Data ${JSON.stringify(info.array)}`;
                  }
                  return message + `\n\n`;
            }),


            transports: [
              new winston.transports.Console(),
              new winston.transports.File({ filename: `${process.env.LOG_FILE_PATH} / ${route}.log` }),
            ],
          });
          this.logger = logger;
    }

    async info(message){
        this.logger.log('info', message)
    }

    async info(message, obj){
        this.logger.log('info', message, {obj})
    }

    async debug(message){
        this.logger.log('debug', message)
    }

    async debug(message, obj){
        this.logger.log('debug', message, {obj})
    }

    async error(message){
        this.logger.log('error', message)
    }


    async error(message, obj){
        this.logger.log('error', message, {obj})
    }

    
}


module.exports = loggerService