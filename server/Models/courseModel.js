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
        courses.is_deleted = false and courses.category_id <>  2 ;
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

  Course.alllessons = async (courseID) => {
    try {
      const result = await db.query('SELECT lesson.id,lesson.title FROM lesson inner join courses on courses.id= lesson.course_id where courses.id=$1 and lesson.is_deleted = false;',[courseID]);
     return  result.rows
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