const db = require('../config');
const Chat = {};


Chat.getadmins = async () => {
    try {
        const result = await db.query('SELECT users.id, roles.role FROM users INNER JOIN roles ON roles.id = users.role_id WHERE roles.role = \'admin\'');
        return result.rows.map(admin => admin.id);
    } catch (err) {
        throw err;
    }
};

Chat.sendmessagetoadmin =  async(userID,reciverID,message) =>{
    const result = await db.query('insert into chat (sender_id,receiver_id,message)values ($1,$2,$3)',[userID,reciverID,message]);
    return result.rows;
}


Chat.getrecivedmessages = async (reciver) => {
    try {
        const result = await db.query('SELECT chat.id, chat.message, users.user_name FROM chat INNER JOIN users ON users.id = chat.sender_id WHERE  chat.receiver_id = $1 limit 1',[reciver]);
        return result.rows;
    } catch (error) {
        throw error;
    }
};

Chat.getsentmessages = async (senderID) => {
try {
    const result = await db.query('SELECT chat.id, chat.message,users.user_name FROM chat INNER JOIN users ON users.id = chat.sender_id WHERE chat.sender_id = $1 limit 1 ',[senderID]);
    return result.rows;
} catch (error) {
    throw error;
}
};



module.exports = Chat;