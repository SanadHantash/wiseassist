const db = require('../config');
const { admin, storage } = require('../firebase');
const Course = {};




Course.allelderliescourses = async () => {
    try {
      const queryResult = await db.query(`
      SELECT 
        courses.id,
        courses.title,
        courses.description,
        courses.trainer,
        REPLACE(courses.image, 'https://storage.googleapis.com/wiseassist-b8a8a.appspot.com/images/', '') AS image,
        categories.category,
        courses.course_time,
        courses.site
      FROM 
        courses
        INNER JOIN categories ON categories.id = courses.category_id
      WHERE 
        courses.is_deleted = false ;
    `);
      
    const formattedResult = await Promise.all(
      queryResult.rows.map(async (row) => {
        if (row.course_time !== null) {
          row.course_time = row.course_time.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
          });
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
  };

  Course.onsiteelderliescourses = async () => {
    try {
      const queryResult = await db.query(`
        SELECT 
          courses.id,
          courses.title,
          courses.description,
          courses.trainer,
          REPLACE(courses.image, 'https://storage.googleapis.com/wiseassist-b8a8a.appspot.com/images/', '') AS image,
          categories.category,
          courses.course_time,
          courses.site
        FROM 
          courses
          INNER JOIN categories ON categories.id = courses.category_id
        WHERE 
          courses.category_id = 1 and courses.is_deleted = false;
      `);
      
      
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

  Course.onsiteworkshops = async () => {
    try {
      const queryResult = await db.query(`
        SELECT 
          courses.id,
          courses.title,
          courses.description,
          courses.trainer,
          REPLACE(courses.image, 'https://storage.googleapis.com/wiseassist-b8a8a.appspot.com/images/', '') AS image,
          categories.category,
          courses.course_time,
          courses.site
        FROM 
          courses
          INNER JOIN categories ON categories.id = courses.category_id
        WHERE 
        courses.category_id = 3 and courses.is_deleted = false;
      `);
      
      
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
  Course.onlineworkshops = async () => {
    try {
      const queryResult = await db.query(`
        SELECT 
          courses.id,
          courses.title,
          courses.description,
          courses.trainer,
          REPLACE(courses.image, 'https://storage.googleapis.com/wiseassist-b8a8a.appspot.com/images/', '') AS image,
          categories.category,
          courses.course_time,
          courses.site
        FROM 
          courses
          INNER JOIN categories ON categories.id = courses.category_id
        WHERE 
        courses.category_id = 4 and courses.is_deleted = false;
      `);
      
      
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


  Course.onlineelderliescourses = async () => {
    try {
      const queryResult = await db.query(`
      SELECT 
        courses.id,
        courses.title,
        courses.description,
        courses.trainer,
        REPLACE(courses.image, 'https://storage.googleapis.com/wiseassist-b8a8a.appspot.com/images/', '') AS image,
        categories.category
      FROM courses
        INNER JOIN categories ON categories.id = courses.category_id
      WHERE 
      courses.category_id = 2 and courses.is_deleted = false;
    `);

    const formattedResult = await Promise.all(
      queryResult.rows.map(async (row) => {

        const imageRef = storage.bucket().file('images/' + row.image);
        const [url] = await imageRef.getSignedUrl({ action: 'read', expires: '01-01-2500' });
        row.image = url;

        return row;
      })
   
    );
    return formattedResult
    
      
  
    } catch (err) {
      throw err;
    }
  };

  Course.detail = async (courseId) => {
    try {
      const queryResult = await db.query(`
        SELECT 
          courses.id,
          courses.title,
          courses.description,
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
        return formattedResult
    } catch (err) {
      throw err;
    }
  };

  Course.alllessonspaid = async (userID,courseID) => {
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
    
            const registerQuery = 'SELECT lesson.id, lesson.title FROM lesson INNER JOIN courses ON courses.id = lesson.course_id WHERE courses.id = $1 AND lesson.is_deleted = false';
            const registerResult = await db.query(registerQuery, [courseID]);
              return registerResult.rows;
          } else if(userRole === 'unsubscriber') {
            const registerQuery = 'SELECT lesson.id, lesson.title FROM lesson INNER JOIN courses ON courses.id = lesson.course_id WHERE courses.id = $1 AND lesson.is_deleted = false order by created_at limit 2 ';
            const registerResult = await db.query(registerQuery, [courseID]);
            return registerResult.rows;
          }
      } else {
          throw new Error('User not found or is deleted.');
      }
    } catch (err) {
      throw err;
    }
  };
  Course.alllessonspaid= async (userID,courseID) => {
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
    
            const registerQuery = 'SELECT lesson.id, lesson.title FROM lesson INNER JOIN courses ON courses.id = lesson.course_id WHERE courses.id = $1 AND lesson.is_deleted = false';
            const registerResult = await db.query(registerQuery, [courseID]);
              return registerResult.rows;
          } else if(userRole === 'unsubscriber') {
            const registerQuery = 'SELECT lesson.id, lesson.title FROM lesson INNER JOIN courses ON courses.id = lesson.course_id WHERE courses.id = $1 AND lesson.is_deleted = false ORDER BY lesson.created_at LIMIT 2';
            const registerResult = await db.query(registerQuery, [courseID]);
            return registerResult.rows;
          }
      } else {
          throw new Error('User not found or is deleted.');
      }
    } catch (err) {
      throw err;
    }
  };


  Course.alllessonsfree = async (courseID) => {
    try {
        const isFreeQuery = 'SELECT * FROM courses WHERE id = $1 AND is_paid = false AND is_deleted = false';
        const isFreeResult = await db.query(isFreeQuery, [courseID]);

        if (isFreeResult.rows.length === 0) {
            throw new Error('The specified course is not free.');
        }

        const registerQuery = 'SELECT lesson.id, lesson.title FROM lesson INNER JOIN courses c ON c.id = lesson.course_id WHERE c.id = $1 AND lesson.is_deleted = false';
        const registerResult = await db.query(registerQuery, [courseID]);

        return registerResult.rows;
    } catch (err) {
        throw err;
    }
};


  Course.lessonpage= async(lessonID)=>{
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

  
  
module.exports = Course;