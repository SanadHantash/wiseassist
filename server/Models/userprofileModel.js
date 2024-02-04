const db = require('../config');
const jwt = require('jsonwebtoken');
const { admin, storage } = require('../firebase');
const Profile = {};


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

Profile.isenrolled = async (userID, courseID) => {
  try {
    const checkEnrollmentQuery = 'SELECT * FROM course_attendances WHERE user_id = $1 AND course_id = $2';
    const checkEnrollmentResult = await db.query(checkEnrollmentQuery, [userID, courseID]);
    return checkEnrollmentResult.rows.length > 0;
  } catch (err) {
    throw err;
  }
};

Profile.reginfreecourse = async (userID, courseID) => {
    try {
      const registerQuery = 'INSERT INTO course_attendances (course_id, user_id) VALUES ($1, $2) RETURNING *';
      const registerResult = await db.query(registerQuery, [courseID, userID]);
      const updateSeatsQuery = 'UPDATE courses SET seats = seats - 1 WHERE id = $1';
      await db.query(updateSeatsQuery, [courseID]);
      return registerResult.rows;
    } catch (err) {
      throw err;
    }
  };
  
  Profile.reginpaidcourse = async (userID, courseID) => {
    try {
      const userRoleQuery = 'SELECT users.role_id, roles.role FROM users INNER JOIN roles ON users.role_id = roles.id WHERE users.id = $1 AND users.is_deleted = false';
      const userRoleResult = await db.query(userRoleQuery, [userID]);
  
      if (userRoleResult.rows.length > 0) {
        const userRole = userRoleResult.rows[0].role;
        if (userRole === 'subscriber') {
          const registerQuery = 'INSERT INTO course_attendances (course_id, user_id) VALUES ($1, $2) RETURNING *';
        
          const registerResult = await db.query(registerQuery, [courseID, userID]);
          const updateSeatsQuery = 'UPDATE courses SET seats = seats - 1 WHERE id = $1';
          await db.query(updateSeatsQuery, [courseID]);
          return registerResult.rows;
        } else if (userRole === 'unsubscriber') {
          throw new Error('You are not subscribed to access paid courses.');
        } else {
          throw new Error('Invalid user role');
        }
      } else {
        throw new Error('User not found or is deleted.');
      }
    } catch (err) {
      throw err;
    }
  };


Profile.getregisteredcourses = async (userID) => {
    try {
        const queryResult = await db.query(`
        SELECT 
        courses.id,
  courses.title,
  courses.description,
  courses.trainer,
  REPLACE(courses.image, 'https://storage.googleapis.com/wiseassist-b8a8a.appspot.com/images/', '') AS image,
  categories.category,
  courses.start_time,
  courses.end_time,
  courses.site
FROM 
  course_attendances
  INNER JOIN courses ON courses.id = course_attendances.course_id
  INNER JOIN categories ON categories.id = courses.category_id
WHERE 
  course_attendances.is_deleted = false
  AND courses.is_deleted = false
  AND (courses.category_id = 1 OR courses.category_id = 2)
  AND course_attendances.user_id = $1;
      `,[userID]);
        
      const formattedResult = await Promise.all(
        queryResult.rows.map(async (row) => {
          if (row.start_time !== null) {
            row.start_time = row.start_time.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
            });
  
            
  
            
            if (row.end_time !== null) {
              row.end_time = row.end_time.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
              });
            }
            
          }
      
          const imageRef = storage.bucket().file('images/' + row.image);
          const [url] = await imageRef.getSignedUrl({ action: 'read', expires: '01-01-2500' });
          row.image = url;
      
          return row;
        })
      );
    
        return formattedResult;
      } catch (err) {
        throw err;
      }
}
Profile.getregisteredworkshops = async (userID) => {
    try {
        const queryResult = await db.query(`
        SELECT 
        courses.id,
  courses.title,
  courses.description,
  courses.trainer,
  REPLACE(courses.image, 'https://storage.googleapis.com/wiseassist-b8a8a.appspot.com/images/', '') AS image,
  categories.category,
  courses.start_time,
  courses.end_time,
  courses.site
FROM 
  course_attendances
  INNER JOIN courses ON courses.id = course_attendances.course_id
  INNER JOIN categories ON categories.id = courses.category_id
WHERE 
  course_attendances.is_deleted = false
  AND courses.is_deleted = false
  AND (courses.category_id = 3 OR courses.category_id = 4)
  AND course_attendances.user_id = $1;
      `,[userID]);
        
      const formattedResult = await Promise.all(
        queryResult.rows.map(async (row) => {
          if (row.start_time !== null) {
            row.start_time = row.start_time.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
            });
  
            
  
            
            if (row.end_time !== null) {
              row.end_time = row.end_time.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
              });
            }
            
          }
      
          const imageRef = storage.bucket().file('images/' + row.image);
          const [url] = await imageRef.getSignedUrl({ action: 'read', expires: '01-01-2500' });
          row.image = url;
      
          return row;
        })
      );
    
        return formattedResult;
      } catch (err) {
        throw err;
      }
}


  

    Profile.checkUserExistence = async (email, user_name, phonenumber, userID) => {
      if (email) {
        const checkEmail = await db.query('SELECT * FROM users WHERE email = $1 AND id <> $2;', [email, userID]);
        if (checkEmail.rows.length > 0) {
          throw new Error("invalid email");
        }
      }
    
      if (user_name) {
        const checkUsername = await db.query('SELECT * FROM users WHERE user_name = $1 AND id <> $2;', [user_name, userID]);
        if (checkUsername.rows.length > 0) {
          throw new Error("invalid username");
        }
      }
    
      if (phonenumber) {
        const checkPhone = await db.query('SELECT * FROM users WHERE phonenumber = $1 AND id <> $2;', [phonenumber, userID]);
        if (checkPhone.rows.length > 0) {
          throw new Error("invalid phonenumber");
        }
      }
    
      return true;
    };

    Profile.updateinfo = async (userID, first_name, last_name, user_name, email, phonenumber) => {
      try {
        const query = 'UPDATE users SET first_name = $2, last_name = $3, user_name = $4, email = $5, phonenumber = $6 WHERE id = $1';
        const result = await db.query(query, [userID, first_name, last_name, user_name, email, phonenumber]);
    
        console.log(`User info updated successfully. Rows affected: ${result.rowCount}`);
    
        return result.rows;
      } catch (err) {
        console.error('Error updating user info:', err);
        throw err; // Consider whether you want to re-throw the error or handle it differently
      }
    };


Profile.updatepassword = async (userID,hashedPassword) =>{
  const result  = await db.query('update users set password = $2 where id = $1',[userID,hashedPassword]);
  return result.rows;
}

Profile.unrolled = async (courseID,userID) =>{
  try{
    const result  = await db.query('update course_attendances set is_deleted = true where course_attendances.course_id = $1 and user_id = $2',[courseID,userID]);
    return result.rows;
  }catch (err) {
    throw err;
}
}



module.exports = Profile