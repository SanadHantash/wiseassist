const db = require('../config');
const jwt = require('jsonwebtoken');
const Profile = {};
const { admin, storage } = require('../firebase');

Profile.userinfo = async (userID) => {
    try{
            const result = await db.query("SELECT *, REPLACE(users.image, 'https://storage.googleapis.com/wiseassist-b8a8a.appspot.com/profiles/', '') AS image, roles.role FROM users INNER JOIN roles ON users.role_id = roles.id WHERE users.id = $1 and users.is_deleted = false;", [userID]);

            const formattedResult = await Promise.all(
                result.rows.map(async (row) => {
              
                  const imageRef = storage.bucket().file('profiles/' + row.image);
                  const [url] = await imageRef.getSignedUrl({ action: 'read', expires: '01-01-2500' });
                  row.image = url;
              
                  return row;
                })
              );
            
            return formattedResult;
    }
    catch(err){
        throw err;
    }
}


Profile.profilepicture  = async (userID,imageUrl) => {
    try{
        const result = await db.query('UPDATE users SET image = $1 WHERE id = $2', [imageUrl, userID]);
        return result.rows;
    }
    catch(err){
        throw err;
    }
};


Profile.reginfreecourse = async (userID, courseID) => {
    try {
  
        const isFreeQuery = 'SELECT * FROM courses WHERE courses.id = $1 AND is_paid = false AND is_deleted = false';
        const isFreeResult = await db.query(isFreeQuery, [courseID]);

        if (isFreeResult.rows.length === 0) {
            throw new Error('The specified course is not free.');
        }

     
        const registerQuery = 'INSERT INTO course_attendances (course_id, user_id) VALUES ($1, $2) RETURNING *';
        const registerResult = await db.query(registerQuery, [courseID, userID]);

        return registerResult.rows;
    } catch (err) {
        throw err;
    }
};

Profile.reginpaidcourse = async (userID, courseID) => {
    try {
       
        const isPaidQuery = 'SELECT * FROM courses WHERE id = $1 AND is_paid = true AND is_deleted = false';
        const isPaidResult = await db.query(isPaidQuery, [courseID]);

        if (isPaidResult.rows.length === 0) {
            throw new Error('The specified course is not paid or has been deleted.');
        }


        const userRoleQuery = 'SELECT users.role_id, roles.role FROM users INNER JOIN roles ON users.role_id = roles.id WHERE users.id = $1 AND users.is_deleted = false';
        const userRoleResult = await db.query(userRoleQuery, [userID]);

        if (userRoleResult.rows.length > 0) {
            const userRole = userRoleResult.rows[0].role; 
            if (userRole === 'subscriber') {
           
                const registerQuery = 'INSERT INTO course_attendances (course_id, user_id) VALUES ($1, $2) RETURNING *';
                const registerResult = await db.query(registerQuery, [courseID, userID]);

                return registerResult.rows;
            } else {
                throw new Error('You are not subscribed to access paid courses.');
            }
        } else {
            throw new Error('User not found or is deleted.');
        }

    } catch (err) {
        throw err;
    }
};


module.exports = Profile