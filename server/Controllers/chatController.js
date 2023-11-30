const Chat = require('../Models/chatModel');




const sendmessagetoadmin = async(req,res) =>{
    try{
        const userID = req.user.userId;
       const reciverID = await Chat.getadmins();
        const {message} = req.body;

        for (const receiverID of reciverID) {
            await Chat.sendmessagetoadmin(userID, receiverID, message);
        }
        res.status(201).json({ success: true, message: 'message sent successfully' });
    }catch(err){
        console.error(err);
        res.status(400).json({ success: false, error: 'message sent failed' });
    }
}


const chatbox = async(req,res)=>{
    try{
    
    const  senderID = req.user.userId;



    const reciver = req.user.userId;
 
        
        
    const receivedMessages = await Chat.getrecivedmessages(reciver);
    const sentMessages = await Chat.getsentmessages(senderID);
    res.status(200).json({ success: true, receivedMessages, sentMessages });
    }catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports =  {
    sendmessagetoadmin,
    chatbox
}