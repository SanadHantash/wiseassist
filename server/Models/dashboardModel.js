const db = require('../config');
const jwt = require('jsonwebtoken');
const { admin, storage } = require('../firebase');
const Dashboard = {};

Dashboard.createcourse = async (title,detail,description,trainer,course_time,category_id,imageUrl,audince_id,site) => {
        const result = await db.query('INSERT INTO courses (title,detail,description,trainer,course_time,category_id,image,audince_id,site)  VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9)', [title,detail,description,trainer,course_time,category_id,imageUrl,audince_id,site]);
        return result.rows;
    };


    Dashboard.allcourses = async () => {
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
          courses
          INNER JOIN categories ON categories.id = courses.category_id
        WHERE 
          courses.is_deleted = false and (courses.category_id = 1 or courses.category_id = 2);
      `);
    
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
        throw new Error(`Error retrieving courses: ${err.message}`);
      }
    };

    
    Dashboard.allworkshops = async () => {
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
          courses
          INNER JOIN categories ON categories.id = courses.category_id
        WHERE 
          courses.is_deleted = false and (courses.category_id = 3 or courses.category_id = 4);
      `);
    
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
        throw new Error(`Error retrieving courses: ${err.message}`);
      }
    };
    
    Dashboard.coursedetail = async (courseId) => {
      try {
        const queryResult = await db.query(`
        SELECT 
          courses.id,
          courses.title,
          courses.detail,
          courses.trainer,
          REPLACE(courses.image, 'https://storage.googleapis.com/wiseassist-b8a8a.appspot.com/images/', '') AS image,
          categories.category,
          courses.course_time,
          courses.site
        FROM 
          courses
          INNER JOIN categories ON categories.id = courses.category_id
        WHERE 
          courses.id=$1 and courses.is_deleted = false;
      `,[courseId]);
          
        const formattedResult = await Promise.all(
          queryResult.rows.map(async (row) => {
            row.course_time = row.course_time.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
            });
    
  
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
    };

  

    Dashboard.updatecourse = async (courseID, title, detail, description, trainer, course_time, category_id, site) => {
      try {
        const result = await db.query('UPDATE courses SET title=$2, detail=$3, description=$4, course_time=$5, trainer=$6, category_id=$7, site=$8 WHERE id=$1', [courseID, title, detail, description, course_time, trainer, category_id, site]);
    
        return result.rows;
      } catch (err) {
        throw err;
      }
    };
    

      Dashboard.deletecourse = async (courseID) => {
        try {
        
          const result = await db.query('UPDATE courses SET is_deleted = TRUE  WHERE id = $1', [courseID]);
          return result.rows;
        } catch (err) {
          throw err;
        }
      };


      Dashboard.deleteuser = async (userID) => {
        try {
          const result = await db.query('UPDATE users SET is_deleted = NOT is_deleted WHERE users.id = $1', [userID]);
          return result.rows;
        } catch (err) {
          throw err;
        }
      };
      

    Dashboard.createlesson = async (courseID,videoUrl,title,description) => {
      const result = await db.query('INSERT INTO lesson (course_id,video,title,description) VALUES ($1, $2,$3,$4) RETURNING *', [courseID,videoUrl,title,description]);
      return result.rows[0];
    };


    Dashboard.alllessons = async (courseID) => {
      try {
        const result = await db.query('SELECT lesson.id,lesson.title FROM lesson inner join courses on courses.id= lesson.course_id where courses.id=$1 and lesson.is_deleted = false;',[courseID]);
       return  result.rows
      } catch (err) {
        throw err;
      }
    };

    Dashboard.lessonpage= async(lessonID)=>{
      try {
        const queryResult = await db.query(`
        SELECT 
          lesson.id,
          lesson.title,
          REPLACE(lesson.video, 'https://storage.googleapis.com/wiseassist-b8a8a.appspot.com/videos/', '') AS video,
          lesson.description
        FROM lesson
        WHERE lesson.id = $1 and  lesson.is_deleted = false;
      `,[lessonID]);
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
    };
  

    Dashboard.createtichtip = async ( title,short_detail, detail, imageUrl) => {
      const result = await db.query('INSERT INTO techtips (title,short_detail,detail,image)  VALUES ($1, $2, $3,$4)', [title,short_detail, detail, imageUrl]);
        return result.rows;
    };

    Dashboard.alltechtips = async () => {
      try {
        const queryResult = await db.query(`
        SELECT 
  techtips.id,
  techtips.title,
  techtips.short_detail,
  REPLACE(techtips.image, 'https://storage.googleapis.com/wiseassist-b8a8a.appspot.com/images/', '') AS image
FROM 
  techtips
WHERE 
  techtips.is_deleted = false;
      `);
    
      const formattedResult = await Promise.all(
        queryResult.rows.map(async (row) => {
      
          const imageRef = storage.bucket().file('images/' + row.image);
          const [url] = await imageRef.getSignedUrl({ action: 'read', expires: '01-01-2500' });
          row.image = url;
      
          return row;
        })
      );
    
        return formattedResult;
      } catch (err) {
        throw new Error(`Error retrieving courses: ${err.message}`);
      }
    };

    Dashboard.techtipdetail = async (techId) => {
      try {
        const queryResult = await db.query(`
        SELECT 
            techtips.id,
            techtips.title,
            techtips.detail,
            REPLACE(techtips.image, 'https://storage.googleapis.com/wiseassist-b8a8a.appspot.com/images/', '') AS image
        FROM 
            techtips
        WHERE 
            techtips.id = $1 and techtips.is_deleted = false;
    `, [techId]);
          
        const formattedResult = await Promise.all(
          queryResult.rows.map(async (row) => {

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
    };

    Dashboard.updatetechtip = async (techId,title, short_detail,detail) => {
      try {
        const result = await db.query('UPDATE techtips SET title=$2, short_detail=$3, detail=$4 WHERE id=$1', [techId,title, short_detail,detail]);

        return result.rows;
      } catch (err) {
        throw err;
      }
    };
    
    Dashboard.deletetechtip = async (courseID) => {
      try {
      
        const result = await db.query('UPDATE techtips SET is_deleted = TRUE  WHERE id = $1', [courseID]);
        return result.rows;
      } catch (err) {
        throw err;
      }
    };
    
    Dashboard.allquestions = async () => {
      try {
        const result = await db.query('SELECT faq.id,faq.question,users.user_name from faq  inner join  users on users.id = faq.user_id where faq.is_deletedq = false;');
       return  result.rows
      } catch (err) {
        throw err;
      }
    };

    Dashboard.addanswer = async (questionID,answer) => {
      const result = await db.query('update faq set answer=$2 where faq.id = $1 Returning *', [questionID,answer]);
      return result.rows[0];
    };


    Dashboard.updateanswer = async (answerID,answer) => {
      const result = await db.query('update faq set answer=$2 where faq.id = $1 Returning *', [answerID,answer]);
      return result.rows[0];
    };


    Dashboard.deleteanswer = async (answerID) =>{
      try {
        const result = await db.query('UPDATE faq SET is_deleteda = TRUE  WHERE id = $1', [answerID]);
        return result.rows;
      } catch (err) {
        throw err;
      }
    }
    

    Dashboard.accepttechtipcomment = async (techID) => {
      try {
        const result = await db.query('UPDATE techtip_comment SET is_available = TRUE  WHERE techtip_comment.id = $1 RETURNING * ', [techID]);
        return result.rows;
      } catch (err) {
        throw err;
      }
    }


    Dashboard.login = async (email) => {
      try {
        const user = await db.query('SELECT users.id, email, roles.role  FROM users inner join roles on roles.id = users.role_id WHERE email = $1 And users.is_deleted= false;', [email]);
        if (user.rows[0]) {
          return user.rows[0];
        } else {
          return "Email not found or user is denied to access.";
        }
      } catch (error) {
        throw error;
      }
    };
    
    Dashboard.getrecivedmessages = async (sender, reciver) => {
      try {
          const result = await db.query('SELECT chat.id, chat.message, users.user_name FROM chat INNER JOIN users ON users.id = chat.sender_id WHERE chat.sender_id = $1 and chat.receiver_id = $2 ',[sender, reciver]);
          return result.rows;
      } catch (error) {
          throw error;
      }
  };

  Dashboard.getadmins = async () => {
    try {
        const result = await db.query('SELECT users.id, roles.role FROM users INNER JOIN roles ON roles.id = users.role_id WHERE roles.role = \'admin\'');
        return result.rows.map(admin => admin.id);
    } catch (err) {
        throw err;
    }
  };
  
  Dashboard.sendmessagetouser =  async(sendersID, reciverID, message) =>{
    const result = await db.query('insert into chat (sender_id,receiver_id,message)values ($1,$2,$3)',[sendersID, reciverID, message]);
    return result.rows;
}

Dashboard.getsentmessages = async (senderID,reciverID) => {
  try {
      const result = await db.query('SELECT chat.id, chat.message,users.user_name FROM chat INNER JOIN users ON users.id = chat.sender_id WHERE users.role_id = 3 and chat.sender_id = $1 and chat.receiver_id = $2 ',[senderID,reciverID]);
      return result.rows;
  } catch (error) {
      throw error;
  }
};


Dashboard.acceptcoursecomment = async (courseID) => {
  try {
    const result = await db.query('UPDATE course_reaction SET is_available = TRUE  WHERE course_reaction.id = $1 RETURNING * ', [courseID]);
    return result.rows;
  } catch (err) {
    throw err;
  }
}
Dashboard.acceptlessoncomment = async (lessonID) => {
  try {
    const result = await db.query('UPDATE lesson_reaction SET is_available = TRUE  WHERE lesson_reaction.id = $1 RETURNING * ', [lessonID]);
    return result.rows;
  } catch (err) {
    throw err;
  }
}


module.exports = Dashboard;
