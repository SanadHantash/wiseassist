const db = require('../config');
const Dashboard = {};


Dashboard.createcourse = async (title,detail,description,trainer,course_time,category_id,imageUrl,is_paid,audince_id,site) => {
        const result = await db.query('INSERT INTO courses (title,detail,description,trainer,course_time,category_id,image,is_paid,audince_id,site)  VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10)', [title,detail,description,trainer,course_time,category_id,imageUrl,is_paid,audince_id,site]);
        return result.rows;
    };


    Dashboard.allcourses = async () => {
      try {
        const queryResult = await db.query('SELECT courses.id, courses.title,courses.description,courses.trainer,courses.image, categories.category, courses.course_time, courses.site FROM courses  INNER JOIN categories ON categories.id = courses.category_id  where courses.is_deleted = false;');
        
        
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
    Dashboard.coursedetail = async (courseId) => {
      try {
        const queryResult = await db.query('SELECT courses.id, courses.title, courses.detail, courses.site,courses.course_time , courses.trainer,categories.category  from courses inner join categories on categories.id = courses.category_id  where courses.id = $1;', [courseId]);
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
        
          const result = await db.query('UPDATE users SET is_deleted = TRUE  WHERE id = $1', [userID]);
          return result.rows;
        } catch (err) {
          throw err;
        }
      };
      
      

    Dashboard.createlesson = async (courseID,videoUrl) => {
      const result = await db.query('INSERT INTO lesson (course_id,video) VALUES ($1, $2) RETURNING *', [courseID,videoUrl]);
      return result.rows[0];
    };

module.exports = Dashboard;
