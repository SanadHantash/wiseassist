const db = require('../config');
const {storage } = require('../firebase');
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


Profile.reginfreecourse = async (userID, courseID) => {
    try {
      const registerQuery = 'INSERT INTO course_attendances (course_id, user_id) VALUES ($1, $2) RETURNING *';
      const registerResult = await db.query(registerQuery, [courseID, userID]);
  
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


Profile.addlesson = async (userID, lessonID) => {
    try {
       
        const isfound = 'SELECT * FROM lesson WHERE id = $1 AND is_deleted = false';
        const isfoundResult = await db.query(isfound, [lessonID]);

        if (isfoundResult.rows.length === 0) {
            throw new Error('The specified lesson has been deleted.');
        }

                const registerQuery = 'INSERT INTO watched_videos (lesson_id, user_id) VALUES ($1, $2) RETURNING *';
                const registerResult = await db.query(registerQuery, [lessonID, userID]);

                return registerResult.rows;
            } 

    catch (err) {
        throw err;
    }
};


Profile.addwish = async (userID, courseID) => {
    try {
    
        const isFoundQuery = 'SELECT * FROM courses WHERE id = $1 AND is_deleted = false';
        const isFoundResult = await db.query(isFoundQuery, [courseID]);

        if (isFoundResult.rows.length === 0) {
            throw new Error('The specified course has been deleted or does not exist.');
        }

        
        const insertWishlistQuery = 'INSERT INTO witchlist (course_id, user_id) VALUES ($1, $2)';
        await db.query(insertWishlistQuery, [courseID, userID]);

    } catch (error) {
       
        return error.message;
    }
};


Profile.getwitchlist = async (userID) => {
    try {
        const result = await db.query(`
            SELECT witchlist.id, witchlist.created_at, courses.title
            FROM witchlist
            INNER JOIN courses ON courses.id = witchlist.course_id
            WHERE witchlist.user_id = $1 and courses.is_deleted = false
            ORDER BY created_at DESC;
        `, [userID]);

        return result.rows;
    } catch (error) {
        
        throw error;
    }
};


Profile.deletefromwitchlist = async (userID,whichID) =>{
    try{

        const result = await db.query(`
            UPDATE witchlist
            SET is_deleted = true
            WHERE id = $1 AND user_id = $2;
        `, [whichID, userID]);
        return result.rows;
    }catch(error){
        res.status(500).json(error);
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

Profile.mywatchedvideos = async (userID) => {
    try {
      const queryResult = await db.query(`
      SELECT 
      lesson.id,
      lesson.title,
      REPLACE(lesson.video, 'https://storage.googleapis.com/wiseassist-b8a8a.appspot.com/videos/', '') AS video
    FROM 
      watched_videos
      INNER JOIN lesson ON lesson.id = watched_videos.lesson_id
    WHERE 
      watched_videos.user_id = $1 and lesson.is_deleted = false;
      `, [userID]);
      const formattedResult = await Promise.all(
        queryResult.rows.map(async (row) => {
  
          const videRef = storage.bucket().file('videos/' + row.video);
          const [url] = await videRef.getSignedUrl({ action: 'read', expires: '01-01-2500' });
          row.video = url;
  
          return row;
        })
     
      );
      return formattedResult
  
    
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

      Profile.updateinfo= async (userID,first_name,last_name,user_name, email,phonenumber)=>{
    
        try {
        
            const result = await db.query('update users set first_name = $2 , last_name = $3 ,user_name =$4, email = $5, phonenumber = $6 where id = $1 ', [userID,first_name,last_name,user_name, email,phonenumber]);
            return result.rows;
    

    } catch (err) {
        throw err;
    }
}


Profile.updatepassword = async (userID,hashedPassword) =>{
  const result  = await db.query('update users set password = $2 where id = $1',[userID,hashedPassword]);
  return result.rows;
}


Profile.unrolled = async (courseID,userID) =>{
  const result  = await db.query('update course_attendances set is_deleted = true where course_attendances.course_id = $1 and user_id = $2',[courseID,userID]);
  return result.rows;
}

module.exports = Profile