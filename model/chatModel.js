/************************************************************
 * 
 * Purpose      :   To store the data in database using mongoSchema.
 * 
 * @description
 * 
 * @file        :   chatModel.js
 * @overview    :   Storing the userdata in database.
 * @author      :   AnushKumar SK <anushk136@gmail.com>
 * @version     :   1.0
 * @since       :   05-03-2019
 * 
 * **********************************************************/
const mongoose = require('mongoose');
const mongoSchema = mongoose.Schema;
const chatSchema = new mongoSchema({
    'senderUserId': { type: String },
    'senderName': { type: String },
    'recieverUserId': { type: String },
    'recieverName': { type: String },
    'message': { type: String }
}, {
        timestamps: true
    });
function chatModel() {

}
const chat = mongoose.model('chats', chatSchema);

chatModel.prototype.addMessage = (chatData, callBack) => {
    let newMsg = new chat({
        'senderUserId': chatData.senderUserId,
        'senderName': chatData.senderName,
        'recieverUserId': chatData.recieverUserId,
        'recieverName': chatData.recieverName,
        'message': chatData.message
    });


    newMsg.save((err, data) => {
        if (err) {
            console.log("Storing data failed");
            return callBack(err);
        }
        else {
            console.log("Chat data saved successfully");
            return callBack(null, data);
        }
    })
}
chatModel.prototype.getUserMsg = (req,callBack) => {
    chat.find({}, (err, data) => {
        if (err) {
            return callBack("Error in chat model" + err);
        }
        else {
            console.log("----------------------------------",data);
            
            return callBack(null, data);
        }
    })
}
module.exports = new chatModel();