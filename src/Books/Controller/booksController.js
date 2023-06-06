const queries = require('../../../db/queries')
const dbConnection = require('../../../db/connection')
const {pagination} = require('../../../Utils/pagination')
const Logger = require('../../../Services/logger.service')
const auditService = require('../../../Audit/auditService')
const auditAction = require('../../../Audit/auditAction')
const utils = require('../../../Utils/utility')
const {message} = require('../../../ErrorHandler/error.messages')
const ApiError = require('../../../ErrorHandler/api.error')
const statusCode = require('../../../ErrorHandler/error.status')
const errorType = require('../../../ErrorHandler/error.type')




const auditAt = utils.dateFormat();
const logger = new Logger('bookController')

    exports.GetBookList = async (req,res) => {
         try {
            const { page, limit } = req.query;

             // Retrieve total number of items from the database (e.g., using COUNT query)
            const countBookQuery = queries.queryList.COUNT_BOOK_QUERY;
            const countResult = await dbConnection.dbQuery(countBookQuery);
            const totalItems = countResult.rows[0].count;

            // Call pagination to get pagination metadata
            const { currentPage, totalPages, offset } = pagination(page, limit, totalItems);
            const values = [limit, offset];
            const bookListQuery = queries.queryList.GET_BOOKS_LIST;
            const result = await dbConnection.dbQuery(bookListQuery, values);
            const books = result.rows;

            // const result = await dbConnection.dbQuery(bookListQuery)
            if (result.rows.length === 0) {
                return res.status(404).send({ error: 'No Books Found!' });
            }
            // Logger Service;
            logger.info('Get Books List', books)

            // Audit Service
            auditService.prepareAudit
            (auditAction.actionList.get_books_list, books, null, 'Postman', auditAt)

            return res.status(200).json({currentPage, totalPages, totalItems, books});
        } catch (err) {
            console.log('Error: ', err);

             // Audit Service
             auditService.prepareAudit
             (auditAction.actionList.get_books_list, null, JSON.stringify(err), 'Postman', auditAt)
 
            return res.status(500).send({error: 'Failed To List Books'});
        }
    }


    exports.AddBook = async (req,res) => {

        try {
            const { title, description, author, publisher, pages, storeCode } = req.body;
            const createdBy = 'Admin';
            const createdAt = new Date();
    
            if (!title || !author || !publisher || !storeCode) {
                return res.status(500).send({ error: 'All Fields Are Required!' });
            }
            

            const values = [title, description, author, publisher, pages, storeCode, createdAt, createdBy];
            const addBookQuery = queries.queryList.ADD_BOOK;
            const result = await dbConnection.dbQuery(addBookQuery, values);
    
            if (result.rows.length === 0) {
                return res.status(500).send({ error: 'Failed To Create Book' });
            }
    
            const createdBook = result.rows;
            return res.status(201).json(createdBook);
           
        } catch (err) {
            console.log('Error: ', err);
            return res.status(500).send({error: 'Failed To Create Book'});
        }
    }


    exports.GetOne = async (req,res) => {
        try {
            const { book_id } = req.params;
            if(isNaN(book_id)){
                
                throw new ApiError(errorType.API_ERROR, statusCode.INTERNAL_SERVER_ERROR,
                `${book_id} `+ message.NOT_NUMBER, true)
            }
            const getBookQuery = queries.queryList.GET_BOOK_BY_ID;
            const values = [book_id];
            const result = await dbConnection.dbQuery(getBookQuery, values);
    
            if (result.rows.length === 0) {
                return res.status(404).send({ error: 'Book Not Found!' });
            }
    
            return res.status(200).json(result.rows); // Assuming book_id is unique, return the first (and only) row
        } catch (err) {
            console.log('Error: ', err);
            if( err.name === errorType.SQL_INJECTION_ERROR){
                // send an emaillllllllllllllllllll
            }
            return res.status(500).send({ error: 'Failed To Fetch Book!' });
        }
    }


    exports.Up = async (req,res) => {
        try {
            const { book_id } = req.params;
            const { title, description, author, publisher, pages, storeCode } = req.body;
    
            const updateBookQuery = queries.queryList.UPDATE_BOOK;
            const values = [title, description, author, publisher, pages, storeCode, book_id ];
    
            await dbConnection.dbQuery(updateBookQuery, values);
    
            const getUpdatedBookQuery = queries.queryList.GET_BOOK_BY_ID;
            const updatedBook = await dbConnection.dbQuery(getUpdatedBookQuery, [book_id]);
    
            if (updatedBook.rows.length === 0) {
                return res.status(404).send({ error: 'Book Not Found!' });
            }
    
            return res.status(200).json(updatedBook.rows);
        } catch (err) {
            console.log('Error: ', err);
            return res.status(500).send({ error: 'Failed To Update Book!' });
        }
    }


    exports.Del = async (req,res) => {
        
        try {
            const { book_id } = req.params;
    
            const getBookQuery = queries.queryList.GET_BOOK_BY_ID;
            const findBook = await dbConnection.dbQuery(getBookQuery, [book_id]);
    
            if (findBook.rows.length === 0) {
                return res.status(404).send({ error: 'Book Not Found!' });
            }
            const deleteBookQuery = queries.queryList.DELETE_BOOK_QUERY;
            const values = [book_id];
    
             await dbConnection.dbQuery(deleteBookQuery, values);
           
    
            return res.status(200).json({ message: 'Book deleted successfully' });
        } catch (err) {
            console.log('Error: ', err);
            return res.status(500).send({ error: 'Failed To Delete Book' });
        }

    }


  
