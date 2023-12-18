const db = require("../config");
const {storage } = require("../firebase");
const Course = {};

Course.allcourses = async () => {
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
          row.start_time = row.start_time.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          });

          if (row.end_time !== null) {
            row.end_time = row.end_time.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            });
          }
        }

        const imageRef = storage.bucket().file("images/" + row.image);
        const [url] = await imageRef.getSignedUrl({
          action: "read",
          expires: "01-01-2500",
        });
        row.image = url;

        return row;
      })
    );

    return formattedResult;
  } catch (err) {
    throw err;
  }
};

Course.allworkshops = async () => {
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
          row.start_time = row.start_time.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
          });

          if (row.end_time !== null) {
            row.end_time = row.end_time.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
            });
          }
        }

        const imageRef = storage.bucket().file("images/" + row.image);
        const [url] = await imageRef.getSignedUrl({
          action: "read",
          expires: "01-01-2500",
        });
        row.image = url;

        return row;
      })
    );

    return formattedResult;
  } catch (err) {
    throw err;
  }
};

Course.detail = async (courseId) => {
  try {
    const queryResult = await db.query(
      `
        SELECT 
          courses.id,
          courses.title,
          courses.description,
          courses.detail,
          courses.trainer,
          REPLACE(courses.image, 'https://storage.googleapis.com/wiseassist-b8a8a.appspot.com/images/', '') AS image,
          categories.category,
          courses.start_time,
          courses.end_time,
          courses.site,
          courses.is_paid
        FROM 
          courses
          INNER JOIN categories ON categories.id = courses.category_id
        WHERE 
          courses.id=$1 and courses.is_deleted = false;
      `,
      [courseId]
    );

    const formattedResult = await Promise.all(
      queryResult.rows.map(async (row) => {
        if (row.start_time !== null) {
          row.start_time = row.start_time.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
          });

          if (row.end_time !== null) {
            row.end_time = row.end_time.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
            });
          }
        }

        const imageRef = storage.bucket().file("images/" + row.image);
        const [url] = await imageRef.getSignedUrl({
          action: "read",
          expires: "01-01-2500",
        });
        row.image = url;

        return row;
      })
    );

    return formattedResult;
  } catch (err) {
    throw err;
  }
};

Course.alllessonspaidauth = async (userID,courseID) => {
  try {
    let result;
    if (userID) {
      const userRoleQuery =
        "SELECT users.role_id, roles.role FROM users INNER JOIN roles ON users.role_id = roles.id WHERE users.id = $1 AND users.is_deleted = false";
      const userRoleResult = await db.query(userRoleQuery, [userID]);

      if (userRoleResult.rows.length > 0) {
        const userRole = userRoleResult.rows[0].role;
        if (userRole === "subscriber") {
          result = await db.query(
            "SELECT lesson.id, lesson.title, REPLACE(lesson_image.image, 'https://storage.googleapis.com/wiseassist-b8a8a.appspot.com/images/', '') AS image FROM lesson INNER JOIN courses ON courses.id = lesson.course_id INNER JOIN lesson_image ON lesson.id = lesson_image.lesson_id WHERE courses.id = $1 AND lesson.is_deleted = false;",
            [courseID]
          );
        } else if (userRole === "unsubscriber") {
          result = await db.query(
            "SELECT lesson.id, lesson.title, REPLACE(lesson_image.image, 'https://storage.googleapis.com/wiseassist-b8a8a.appspot.com/images/', '') AS image FROM lesson INNER JOIN courses ON courses.id = lesson.course_id INNER JOIN lesson_image ON lesson.id = lesson_image.lesson_id WHERE courses.id = $1 AND lesson.is_deleted = false limit 2;",
            [courseID]
          );
        }

        const formattedResult = await Promise.all(
          result.rows.map(async (row) => {
            const imageRef = storage.bucket().file("images/" + row.image);
            const [url] = await imageRef.getSignedUrl({
              action: "read",
              expires: "01-01-2500",
            });
            row.image = url;

            return row;
          })
        );

        return formattedResult;
      } 
    } else {
      result = await db.query(
        "SELECT lesson.id, lesson.title, REPLACE(lesson_image.image, 'https://storage.googleapis.com/wiseassist-b8a8a.appspot.com/images/', '') AS image FROM lesson INNER JOIN courses ON courses.id = lesson.course_id INNER JOIN lesson_image ON lesson.id = lesson_image.lesson_id WHERE courses.id = $1 AND lesson.is_deleted = false limit 2;",
        [courseID]
      );

      const formattedResult = await Promise.all(
        result.rows.map(async (row) => {
          const imageRef = storage.bucket().file("images/" + row.image);
          const [url] = await imageRef.getSignedUrl({
            action: "read",
            expires: "01-01-2500",
          });
          row.image = url;

          return row;
        })
      );

      return formattedResult;
    }
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};

Course.alllessonspaid = async (courseID) => {
  try {
      const result = await db.query(
        "SELECT lesson.id, lesson.title, REPLACE(lesson_image.image, 'https://storage.googleapis.com/wiseassist-b8a8a.appspot.com/images/', '') AS image FROM lesson INNER JOIN courses ON courses.id = lesson.course_id INNER JOIN lesson_image ON lesson.id = lesson_image.lesson_id WHERE courses.id = $1 AND lesson.is_deleted = false limit 2;",
        [courseID]
      );

      const formattedResult = await Promise.all(
        result.rows.map(async (row) => {
          const imageRef = storage.bucket().file("images/" + row.image);
          const [url] = await imageRef.getSignedUrl({
            action: "read",
            expires: "01-01-2500",
          });
          row.image = url;

          return row;
        })
      );

      return formattedResult;
    }
    catch (err) {
    console.error("Error:", err);
    throw err;
  }
};


Course.alllessonsfree = async (courseID) => {
  try {
    const result = await db.query(
      "SELECT lesson.id, lesson.title, REPLACE(lesson_image.image, 'https://storage.googleapis.com/wiseassist-b8a8a.appspot.com/images/', '') AS image FROM lesson INNER JOIN courses ON courses.id = lesson.course_id INNER JOIN lesson_image ON lesson.id = lesson_image.lesson_id WHERE courses.id = $1 AND lesson.is_deleted = false;",
      [courseID]
    );

    const formattedResult = await Promise.all(
      result.rows.map(async (row) => {
        const imageRef = storage.bucket().file("images/" + row.image);
        const [url] = await imageRef.getSignedUrl({
          action: "read",
          expires: "01-01-2500",
        });
        row.image = url;

        return row;
      })
    );

    return formattedResult;
  } catch (err) {
    throw err;
  }
};

Course.lessonpage = async (lessonID) => {
  try {
    const queryResult = await db.query(
      `
      SELECT 
        lesson.id,
        lesson.title,
        REPLACE(lesson.video, 'https://storage.googleapis.com/wiseassist-b8a8a.appspot.com/videos/', '') AS video,
        lesson.description
      FROM lesson
      WHERE lesson.id = $1 and  lesson.is_deleted = false;
    `,
      [lessonID]
    );
    const formattedResult = await Promise.all(
      queryResult.rows.map(async (row) => {
        const videRef = storage.bucket().file("videos/" + row.video);
        const [url] = await videRef.getSignedUrl({
          action: "read",
          expires: "01-01-2500",
        });
        row.video = url;

        return row;
      })
    );
    return formattedResult;
  } catch (err) {
    throw err;
  }
};

Course.addratetocourse = async (courseID, userID, rate) => {
  try {
    const insertrating = await db.query(
      `
            INSERT INTO course_reaction (rate, user_id, course_id) VALUES ($1, $2, $3) RETURNING rate
            `,
      [rate, userID, courseID]
    );

    insertrating.rows[0].rate;

    const result = await db.query(
      "UPDATE courses SET rate= (SELECT AVG(rate) FROM course_reaction WHERE course_id = $1) WHERE id = $1 RETURNING *",
      [courseID]
    );

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

Course.addcommenttocourse = async (courseID, userID, comment) => {
  try {
    const result = await db.query(
      "INSERT INTO course_reaction (course_comment, user_id, course_id) VALUES ($1, $2, $3)",
      [comment, userID, courseID]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

Course.getcoursecomments = async (courseID) => {
  try {
    const result = await db.query(
      "SELECT course_reaction.id,  course_reaction.course_comment, users.user_name FROM course_reaction INNER JOIN users ON users.id = course_reaction.user_id   WHERE course_id = $1 AND course_reaction.is_deleted = false",
      [courseID]
    );
    return result.rows;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

Course.addratetolesson = async (lessonID, userID, rate) => {
  try {
    const insertrating = await db.query(
      `
            INSERT INTO lesson_reaction (rate, user_id, lesson_id) VALUES ($1, $2, $3) RETURNING rate
            `,
      [rate, userID, lessonID]
    );

    insertrating.rows[0].rate;

    const result = await db.query(
      "UPDATE lesson SET rate= (SELECT AVG(rate) FROM lesson_reaction WHERE lesson_id = $1) WHERE id = $1 RETURNING *",
      [lessonID]
    );

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

Course.addcommenttolesson = async (lessonID, userID, comment) => {
  try {
    const result = await db.query(
      "INSERT INTO lesson_reaction (lesson_comment, user_id, lesson_id) VALUES ($1, $2, $3)",
      [comment, userID, lessonID]
    );
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

Course.getlessoncomments = async (lessonID) => {
  try {
    const result = await db.query(
      "SELECT lesson_reaction.id,  lesson_reaction.lesson_comment, users.user_name FROM lesson_reaction INNER JOIN users ON users.id = lesson_reaction.user_id  WHERE lesson_id = $1 AND lesson_reaction.is_deleted = false",
      [lessonID]
    );
    return result.rows;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

module.exports = Course;
