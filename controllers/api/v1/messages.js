const Message = require('../../../models/Message');


const getMessages = (req, res)=>{
    Message.find({}, (err, docs) =>{ //zoeken op niets want je moet alle messages eruit krijgen!
        if(!err){
            res.json({
                "status" : "success",
                "data": {
                    "message" : docs
                }
            }); 
        }
        if(err){
            res.json({
                 "status": "error",
                 "message": "Could not find any messages"
            });
        }
    })
}

const getMessagesForId = (req, res)=>{
    Message.find({_id: req.params.id}, (err, docs) =>{
        if(!err){
            res.json({
                "status" : "success",
                "data": {
                    "message" : docs
                }
            }); 
        }
        if(err){
            res.json({
                 "status": "error",
                 "message": "Could not find messages matching this id"
            });
        }
    })
}

const postNewMessage = (req, res)=>{
   // console.log(req.body);
    let message = new Message();
    message.text = req.body.text;
    message.user =  req.body.user;

    message.save( (err, doc) => {
       if(!err){
        res.json({
            "status" : "success",
            "data": {
                "message" : doc
            }
        });
       }

       if(err){
           res.json({
                "status": "error",
                "message": "Could not post this new message"
           });
       }
   })
} 

const updateMessage = (req, res)=>{
    //bron: https://mongoosejs.com/docs/queries.html -> Model.findByIdAndUpdate()
    Message.findByIdAndUpdate(req.params.id,{text:"this needed an update" }, (err, docs) =>{
        if(!err){
            res.json({
                "status" : "success",
                "data": {
                    "message" : docs
                }
            }); 
        }
        if(err){
            res.json({
                 "status": "error",
                 "message": "Could not update this message"
            });
        }
    })
} 

const deleteMessage = (req, res)=>{
    //bron: https://mongoosejs.com/docs/queries.html -> Model.findOneAndRemove() of Model.findByIdAndDelete()
    Message.findByIdAndDelete(req.params.id, (err, docs) => {
        if(!err){
            res.json({
                "status" : "success",
                "message" : "The message was removed" 
            }); 
        }
        if(err){
            res.json({
                 "status": "error",
                 "message": "Could not delete this message"
            });
        }
    })
}
const getMessagesForUser = (req, res)=>{
    Message.find({user: req.params.username}, (err, docs) =>{
        if(!err){
            res.json({
                "status" : "success",
                "data": {
                    "message" : docs
                }
            }); 
        }
        if(err){
            res.json({
                 "status": "error",
                 "message": "Could not find messages for this user"
            });
        }
    })
   
}

//verschillende functies die we een aparte naam kunnen geven om ze aan te spreken in de routes!
module.exports.getMessages = getMessages;
module.exports.getMessagesForId = getMessagesForId;
module.exports.postNewMessage = postNewMessage;
module.exports.updateMessage = updateMessage;
module.exports.deleteMessage = deleteMessage;
module.exports.getMessagesForUser = getMessagesForUser;
