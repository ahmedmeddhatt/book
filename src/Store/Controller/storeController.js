const queries = require('../../../db/queries')
const dbConnection = require('../../../db/connection')
const util = require('../../../Utils/utility')
const {pagination} = require('../../../Utils/pagination')

    exports.GetStoreList = async (req,res) => {
        try {
            const { page, limit } = req.query;

             // Retrieve total number of items from the database (e.g., using COUNT query)
            const countStoresQuery = queries.queryList.COUNT_STORE_QUERY;
            const countResult = await dbConnection.dbQuery(countStoresQuery);
            const totalItems = countResult.rows[0].count;

            // Call pagination to get pagination metadata
            const { currentPage, totalPages, offset } = pagination(page, limit, totalItems);
            const values = [limit, offset];
            const storeListQuery = queries.queryList.GET_STORE_LIST;
            const result = await dbConnection.dbQuery(storeListQuery, values);
            const stores = result.rows;
            // const result = await dbConnection.dbQuery(storeListQuery)
            if (result.rows.length === 0) {
                return res.status(404).send({ error: 'No Stores Found!' });
            }
            return res.status(200).json({currentPage, totalPages, totalItems, stores});
        } catch (err) {
            console.log('Error: ', err);
            return res.status(500).send({error: 'Failed To List Store'});
        }
    }



    exports.AddStore = async (req,res) => {
        try {
            const { storeName, address } = req.body;
            const createdBy = 'Admin';
            const createdAt = new Date();
    
            if (!storeName || !address) {
                return res.status(500).send({ error: 'Store Name & Address are required' });
            }
            let storeCode = util.generateStoreCode();

            const values = [storeName, storeCode, address, createdAt, createdBy];
            const addStoreQuery = queries.queryList.ADD_STORE;
            const result = await dbConnection.dbQuery(addStoreQuery, values);
    
            if (result.rows.length === 0) {
                return res.status(500).send({ error: 'Failed to create store above' });
            }
    
            const createdStore = result.rows;
            return res.status(201).json(createdStore);
           
        } catch (err) {
            console.log('Error: ', err);
            return res.status(500).send({error: 'Failed To Create Store'});
        }
    }

    
    
    exports.GetOne = async (req, res) => {
        try {
            const { store_id } = req.params;
            
            const getStoreQuery = queries.queryList.GET_STORE_BY_ID;
            const values = [store_id];
            const result = await dbConnection.dbQuery(getStoreQuery, values);
    
            if (result.rows.length === 0) {
                return res.status(404).send({ error: 'Store not found' });
            }
    
            return res.status(200).json(result.rows); // Assuming store_id is unique, return the first (and only) row
        } catch (err) {
            console.log('Error: ', err);
            return res.status(500).send({ error: 'Failed to fetch store' });
        }
    };
    

    exports.Up = async (req, res) => {
        try {
            const { store_id } = req.params;
            const { storeName, address } = req.body;
    
            const updateStoreQuery = queries.queryList.UPDATE_STORE;
            const values = [storeName, address, store_id];
    
            await dbConnection.dbQuery(updateStoreQuery, values);
    
            const getUpdatedStoreQuery = queries.queryList.GET_UPDATED_STORE_QUERY;
            const updatedStore = await dbConnection.dbQuery(getUpdatedStoreQuery, [store_id]);
    
            if (updatedStore.rows.length === 0) {
                return res.status(404).send({ error: 'Store not found' });
            }
    
            return res.status(200).json(updatedStore.rows);
        } catch (err) {
            console.log('Error: ', err);
            return res.status(500).send({ error: 'Failed to update store' });
        }
    };
    


    exports.Del = async (req, res) => {
        try {
            const { store_id } = req.params;
    
            const getStoreQuery = queries.queryList.GET_STORE_BY_ID;
            const findStore = await dbConnection.dbQuery(getStoreQuery, [store_id]);
    
            if (findStore.rows.length === 0) {
                return res.status(404).send({ error: 'Store not found' });
            }
            const deleteStoreQuery = queries.queryList.DELETE_STORE_QUERY;
            const values = [store_id];
    
             await dbConnection.dbQuery(deleteStoreQuery, values);
           
    
            return res.status(200).json({ message: 'Store deleted successfully' });
        } catch (err) {
            console.log('Error: ', err);
            return res.status(500).send({ error: 'Failed to delete store' });
        }
    };
    


  
    