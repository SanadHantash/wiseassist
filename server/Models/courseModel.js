const db = require('../config');

const Course = {};




Course.allelderliescourses = async () => {
    try {
      const queryResult = await db.query('SELECT courses.id, courses.title,courses.description, courses.detail, courses.trainer,  categories.category, courses.course_time, courses.site FROM courses INNER JOIN categories ON categories.id = courses.category_id;');
      
      
      const formattedResult = queryResult.rows.map(row => {
        
        row.course_time = row.course_time.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        hour : 'numeric'
        });
        return row;
      });
  
      return formattedResult;
    } catch (err) {
      throw err;
    }
  };

  Course.onsiteelderliescourses = async () => {
    try {
      const queryResult = await db.query('SELECT courses.id, courses.title,courses.description, courses.detail, courses.trainer, categories.category ,courses.course_time FROM courses  INNER JOIN categories ON categories.id = courses.category_id  where courses.category_id = 1;');
      
      
      const formattedResult = queryResult.rows.map(row => {
        
        row.course_time = row.course_time.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        hour : 'numeric',
        });
        return row;
      });
  
      return formattedResult;
    } catch (err) {
      throw err;
    }
  };



  Course.onlineelderliescourses = async () => {
    try {
      const queryResult = await db.query('SELECT courses.id, courses.title,courses.description, courses.detail, courses.trainer, categories.category,courses.course_time   FROM courses  INNER JOIN categories ON categories.id = courses.category_id  where courses.category_id = 2;');
      
      
        return queryResult.rows;
      
  
    } catch (err) {
      throw err;
    }
  };

  Course.coursedetail = async (courseId) => {
    try {
      const queryResult = await db.query('SELECT courses.id, courses.title, courses.detail, courses.site,courses.course_time , courses.trainer,categories.category FROM courses  inner join categories on categories.id = courses.category_id  where courses.id = $1;', [courseId]);
      const formattedResult = queryResult.rows.map(row => {
        
        row.course_time = row.course_time.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        hour : 'numeric',
        });
        return row;
      });
      return formattedResult;
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
      const result = await db.query('SELECT lesson.id,lesson.title,lesson.video,lesson.description FROM lesson where lesson.id=$1 and lesson.is_deleted = false;',[lessonID]);
      
     return  result.rows
    } catch (err) {
      throw err;
    }
  };

  
module.exports = Course;