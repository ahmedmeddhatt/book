exports.queryList = {

    // AUTH //
    
    GET_LOGIN: `SELECT user_id, username, password, full_name, email, user_type, active FROM bms.app_user 
                WHERE username = $1 or active = true;`,
    
    ADD_USER: `INSERT INTO bms.app_user
                (username, email, full_name, password, user_type, created_at, created_by)
                VALUES($1, $2, $3, $4, $5, $6, $7) 
                RETURNING user_id, username, email, full_name, user_type, active, created_at, created_by;`,
                
    GET_USER_BY_ID: `SELECT count(user_id) FROM bms.app_user WHERE username = $1 or email = $2; `,
    
    UPDATE_USER:`UPDATE bms.app_user SET full_name = $1, password = $2, user_type = $3, active = $4
                  WHERE user_id = $5`,
    
    GET_UPDATED_USER_QUERY:`SELECT user_id, username, email, full_name, user_type,
                     created_at, created_by FROM bms.app_user WHERE user_id = $1`,
    
    DELETE_USER_QUERY: `DELETE FROM bms.app_user WHERE user_id = $1`,
    
    COUNT_USER_QUERY:`SELECT COUNT(*) FROM bms.app_user`,
    
    
     // USER //
    
     GET_USER_LIST: `SELECT user_id, username, full_name, email, user_type, active FROM bms.app_user 
     LIMIT $1 OFFSET $2;`,

    ADD_USER: `INSERT INTO bms.app_user
    (username, email, full_name, password, user_type, created_at, created_by)
    VALUES($1, $2, $3, $4, $5, $6, $7) 
    RETURNING user_id, username, email, full_name, user_type, active, created_at, created_by;`,

    GET_USER_BY_ID: `SELECT count(user_id) FROM bms.app_user WHERE username = $1 or email = $2; `,

    UPDATE_USER:`UPDATE bms.app_user SET full_name = $1, password = $2, user_type = $3, active = $4
    WHERE user_id = $5`,

    GET_UPDATED_USER_QUERY:`SELECT user_id, username, email, full_name, user_type,
        created_at, created_by FROM bms.app_user WHERE user_id = $1`,

    DELETE_USER_QUERY: `DELETE FROM bms.app_user WHERE user_id = $1`,

    COUNT_USER_QUERY:`SELECT COUNT(*) FROM bms.app_user`,



    // STORE //
    
    GET_STORE_LIST: `SELECT store_id, store_name, store_code, address FROM bms.store
                     LIMIT $1 OFFSET $2;`,
    
    ADD_STORE: `INSERT INTO bms.store (store_name, store_code, address, created_at, created_by) 
                VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    
    GET_STORE_BY_ID: `SELECT * FROM bms.store WHERE store_id = $1`,
    
    UPDATE_STORE:`UPDATE bms.store SET store_name = $1, address = $2
                  WHERE store_id = $3`,
    
    GET_UPDATED_STORE_QUERY:`SELECT * FROM bms.store WHERE store_id = $1`,
    
    DELETE_STORE_QUERY: `DELETE FROM bms.store WHERE store_id = $1`,
    
    COUNT_STORE_QUERY:`SELECT COUNT(*) FROM bms.store`,


    // BOOK //

    GET_BOOKS_LIST: `SELECT book_id, book_title, book_publisher, book_author FROM bms.book
                     LIMIT $1 OFFSET $2;`,

    ADD_BOOK: `INSERT INTO bms.book 
    (book_title, book_description, book_publisher, book_author, book_pages, store_code, created_at, created_by)     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,

    GET_BOOK_BY_ID: `SELECT
                            b.book_id,
                            b.book_title,
                            b.book_description,
                            b.book_publisher,
                            b.book_author,
                            b.book_pages,
                            s.store_code,
                            s.store_name,
                            s.address,
                            b.created_by,
                            b.created_at
                        FROM
                            bms.book AS b
                        INNER JOIN
                            bms.store AS s
                        ON
                            b.store_code = s.store_code
                        WHERE
                            b.book_id = $1;
  `,

    UPDATE_BOOK:`UPDATE bms.book SET book_title = $1, book_description = $2, book_author = $3, book_publisher = $4, book_pages = $5 , store_code =$6 WHERE book_id = $7`,

    GET_UPDATED_BOOK_QUERY:`SELECT * FROM bms.book WHERE book_id = $1`,
    
    DELETE_BOOK_QUERY: `DELETE FROM bms.book WHERE book_id = $1`,

    COUNT_BOOK_QUERY:`SELECT COUNT(*) FROM bms.book`,




    // Audit //
    ADD_AUDIT : `INSERT INTO bms.audit
    (audit_action, audit_data, audit_status, audit_error, audit_by, audit_at)
    VALUES($1, $2, $3, $4, $5, $6);`
}