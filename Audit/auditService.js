const events = require('events')
const audit = require('./auditModel')
const queries = require('../db/queries')
const dbConnection = require('../db/connection')
const emitter = new events.EventEmitter();

const auditEvent = 'audit';
emitter.on(auditEvent, async function(audit){
    console.log('Audit Event Emitter - Audit:', JSON.stringify(audit));
    try {
        const values = 
        [audit.auditAction, JSON.stringify(audit.data), audit.status, 
            audit.error, audit.auditBy, audit.auditAt];
        const adAuditQuery = queries.queryList.ADD_AUDIT;
        await dbConnection.dbQuery(adAuditQuery, values);
        
    } catch (error) {
        console.log('Audit Event Emitter - Error:', error);
    }
})


exports.prepareAudit = function(auditAction, data, error, auditBy, auditAt){
    let status = 200;
    if(error) {
        status = 500
    };

    const auditObj = new audit.Audit(auditAction, data, status, error, auditBy, auditAt)
    emitter.emit(auditEvent, auditObj);
}