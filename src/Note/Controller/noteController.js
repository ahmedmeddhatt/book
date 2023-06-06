const generator = require('../../../Utils/generator')
const model = require('../Model/noteModel')
var Note = model.Note;
    exports.GetAll = (req,res) => {
        var seqId   = generator.generate();  
       var noteObj = new Note(seqId, 'Title', 'content content', 'By me', new Date())
       return res.send('Get Route '+ JSON.stringify(noteObj));
    }


    exports.Add = (req,res) => {
        var seqId   = generator.generate();  
            const {title, content} =req.body
            const createdBy = 'Admin';
            const createdOn = new Date();

            if(!title || !content){
                return res.status(500).send({Error: 'Title & Content are required!!!'})
            }
            var noteObj = new Note(seqId, 'Title', 'content content', 'By me', new Date())
        return res.status(200).json({'Successfully Created:': noteObj});
    }


    exports.GetOne = (req,res) => {
        res.send('Hello World!');
    }


    exports.Up = (req,res) => {
        var seqId   = generator.generate();  
        const {title, content, } =req.body
        const noteId =req.params.ID
        const createdBy = 'Admin';
        const createdOn = new Date();
        console.log(req);
        if(!noteId) return res.status(500).send({Error: 'Id Not Found!!!'})
        if(!title || !content){
            return res.status(500).send({Error: 'Title & Content are required!!!'})
        }
        var noteObj = new Note(seqId, req.body.title, req.body.content, createdBy, createdOn)
    return res.status(200).json({'Successfully Created:': noteObj});
    }


    exports.Del = (req,res) => {
        
        const noteId =req.params.ID;

    }


  
