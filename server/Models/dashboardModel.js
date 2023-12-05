const db = require("../config");
const jwt = require("jsonwebtoken");
const { admin, storage } = require("../firebase");
const Dashboard = {};

Dashboard.createcourse = async (
  title,
  detail,
  description,
  trainer,
  start_time,
  end_time,
  category_id,
  imageUrl,
  audince_id,
  site
) => {
  const result = await db.query(
    "INSERT INTO courses (title,detail,description,trainer,start_time,end_time,category_id,image,audince_id,site)  VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10)",
    [
      title,
      detail,
      description,
      trainer,
      start_time,
      end_time,
      category_id,
      imageUrl,
      audince_id,
      site,
    ]
  );
  return result.rows;
};

Dashboard.allcourses = async (
  page,
  pageSize,
  searchTerm,
  categoryFilter,
  isPaidFilter
) => {
  try {
    const offset = (page - 1) * pageSize;
    let queryString = `
          SELECT 
            courses.id,
            courses.title,
            courses.description,
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
            courses.is_deleted = false and (courses.category_id = 1 or courses.category_id = 2)`;

    const params = [];

    if (searchTerm) {
      queryString += ` AND (LOWER(courses.title) LIKE LOWER($${
        params.length + 1
      }) OR LOWER(courses.description) LIKE LOWER($${params.length + 1}))`;
      params.push(`%${searchTerm}%`);
    }

    if (categoryFilter) {
      queryString += ` AND LOWER(categories.category) = LOWER($${
        params.length + 1
      })`;
      params.push(categoryFilter);
    }

    if (isPaidFilter !== undefined) {
      queryString += ` AND courses.is_paid = $${params.length + 1}`;
      params.push(isPaidFilter);
    }

    queryString += ` ORDER BY courses.id LIMIT $${params.length + 1} OFFSET $${
      params.length + 2
    };`;

    params.push(pageSize, offset);

    const queryResult = await db.query(queryString, params);

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
        row.is_paid = row.is_paid ? "Paid" : "Free";

        return row;
      })
    );

    return formattedResult;
  } catch (err) {
    throw new Error(`Error retrieving courses: ${err.message}`);
  }
};
Dashboard.allworkshops = async (
  page,
  pageSize,
  searchTerm,
  categoryFilter,
  isPaidFilter
) => {
  try {
    const offset = (page - 1) * pageSize;
    let queryString = `
          SELECT 
            courses.id,
            courses.title,
            courses.description,
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
            courses.is_deleted = false and (courses.category_id = 3 or courses.category_id = 4)`;

    const params = [];

    if (searchTerm) {
      queryString += ` AND (LOWER(courses.title) LIKE LOWER($${
        params.length + 1
      }) OR LOWER(courses.description) LIKE LOWER($${params.length + 1}))`;
      params.push(`%${searchTerm}%`);
    }

    if (categoryFilter) {
      queryString += ` AND LOWER(categories.category) = LOWER($${
        params.length + 1
      })`;
      params.push(categoryFilter);
    }

    if (isPaidFilter !== undefined) {
      queryString += ` AND courses.is_paid = $${params.length + 1}`;
      params.push(isPaidFilter);
    }

    queryString += ` ORDER BY courses.id LIMIT $${params.length + 1} OFFSET $${
      params.length + 2
    };`;

    params.push(pageSize, offset);

    const queryResult = await db.query(queryString, params);

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
        row.is_paid = row.is_paid ? "Paid" : "Free";

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
    const queryResult = await db.query(
      `
        SELECT 
          courses.id,
          courses.title,
          courses.detail,
          courses.trainer,
          REPLACE(courses.image, 'https://storage.googleapis.com/wiseassist-b8a8a.appspot.com/images/', '') AS image,
          categories.category,
          start_time,
          end_time,
          courses.site
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

Dashboard.updatecourse = async (
  courseID,
  title,
  detail,
  description,
  trainer,
  start_time,
  end_time,
  category_id,
  site
) => {
  try {
    const result = await db.query(
      "UPDATE courses SET title=$2, detail=$3, description=$4, start_time=$5,end_time=$6, trainer=$7, category_id=$8, site=$9 WHERE id=$1",
      [
        courseID,
        title,
        detail,
        description,
        start_time,
        end_time,
        trainer,
        category_id,
        site,
      ]
    );

    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.deletecourse = async (courseID) => {
  try {
    const result = await db.query(
      "UPDATE courses SET is_deleted = TRUE  WHERE id = $1",
      [courseID]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.deleteuser = async (userID) => {
  try {
    const result = await db.query(
      "UPDATE users SET is_deleted = NOT is_deleted WHERE users.id = $1",
      [userID]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.createlesson = async (courseID, videoUrl, title, description,duration) => {
  const result = await db.query(
    "INSERT INTO lesson (course_id,video,title,description,duration) VALUES ($1, $2,$3,$4,$5) RETURNING *",
    [courseID, videoUrl, title, description,duration]
  );
  return result.rows[0];
};

Dashboard.alllessons = async (courseID, page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    const result = await db.query(
      "SELECT lesson.id, lesson.title FROM lesson INNER JOIN courses ON courses.id = lesson.course_id WHERE courses.id = $1 AND lesson.is_deleted = false LIMIT $2 OFFSET $3;",
      [courseID, pageSize, offset]
    );

    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.lessonpage = async (lessonID) => {
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

Dashboard.uploadlessonimage = async (lessonID, imageUrl) => {
  try {
    const result = await db.query(
      "INSERT INTO lesson_image (lesson_id, image) VALUES ($1, $2)",
      [lessonID, imageUrl]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.createtichtip = async (title, short_detail, detail, imageUrl) => {
  const result = await db.query(
    "INSERT INTO techtips (title,short_detail,detail,image)  VALUES ($1, $2, $3,$4)",
    [title, short_detail, detail, imageUrl]
  );
  return result.rows;
};

Dashboard.alltechtips = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    const queryResult = await db.query(
      `
        SELECT 
  techtips.id,
  techtips.title,
  techtips.short_detail,
  REPLACE(techtips.image, 'https://storage.googleapis.com/wiseassist-b8a8a.appspot.com/images/', '') AS image
FROM 
  techtips
WHERE 
  techtips.is_deleted = false LIMIT $1 OFFSET $2;
      `,
      [pageSize, offset]
    );

    const formattedResult = await Promise.all(
      queryResult.rows.map(async (row) => {
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
    throw new Error(`Error retrieving courses: ${err.message}`);
  }
};

Dashboard.techtipdetail = async (techId) => {
  try {
    const queryResult = await db.query(
      `
        SELECT 
            techtips.id,
            techtips.title,
            techtips.detail,
            REPLACE(techtips.image, 'https://storage.googleapis.com/wiseassist-b8a8a.appspot.com/images/', '') AS image
        FROM 
            techtips
        WHERE 
            techtips.id = $1 and techtips.is_deleted = false;
    `,
      [techId]
    );

    const formattedResult = await Promise.all(
      queryResult.rows.map(async (row) => {
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

Dashboard.updatetechtip = async (techId, title, short_detail, detail) => {
  try {
    const result = await db.query(
      "UPDATE techtips SET title=$2, short_detail=$3, detail=$4 WHERE id=$1",
      [techId, title, short_detail, detail]
    );

    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.deletetechtip = async (techId) => {
  try {
    const result = await db.query(
      "UPDATE techtips SET is_deleted = TRUE  WHERE id = $1",
      [techId]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.allquestions = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    const result = await db.query(
      "SELECT faq.id,faq.question,users.user_name from faq  inner join  users on users.id = faq.user_id where faq.is_deletedq = false LIMIT $1 OFFSET $2;",
      [pageSize, offset]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.addanswer = async (questionID, answer) => {
  const result = await db.query(
    "update faq set answer=$2 where faq.id = $1 Returning *",
    [questionID, answer]
  );
  return result.rows[0];
};

Dashboard.updateanswer = async (answerID, answer) => {
  const result = await db.query(
    "update faq set answer=$2 where faq.id = $1 Returning *",
    [answerID, answer]
  );
  return result.rows[0];
};

Dashboard.deleteanswer = async (answerID) => {
  try {
    const result = await db.query(
      "UPDATE faq SET is_deleteda = TRUE  WHERE id = $1",
      [answerID]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.login = async (email) => {
  try {
    const user = await db.query(
      "SELECT users.id, email,password, roles.role  FROM users inner join roles on roles.id = users.role_id WHERE email = $1 And users.is_deleted= false;",
      [email]
    );
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
    const result = await db.query(
      "SELECT chat.id, chat.message, users.user_name FROM chat INNER JOIN users ON users.id = chat.sender_id WHERE chat.sender_id = $1 and chat.receiver_id = $2 ",
      [sender, reciver]
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

Dashboard.getadmins = async () => {
  try {
    const result = await db.query(
      "SELECT users.id, roles.role FROM users INNER JOIN roles ON roles.id = users.role_id WHERE roles.role = 'admin'"
    );
    return result.rows.map((admin) => admin.id);
  } catch (err) {
    throw err;
  }
};

Dashboard.sendmessagetouser = async (sendersID, reciverID, message) => {
  const result = await db.query(
    "insert into chat (sender_id,receiver_id,message)values ($1,$2,$3)",
    [sendersID, reciverID, message]
  );
  return result.rows;
};

Dashboard.getsentmessages = async (senderID, reciverID) => {
  try {
    const result = await db.query(
      "SELECT chat.id, chat.message,users.user_name FROM chat INNER JOIN users ON users.id = chat.sender_id WHERE users.role_id = 3 and chat.sender_id = $1 and chat.receiver_id = $2 ",
      [senderID, reciverID]
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

Dashboard.allusers = async (page, pageSize, searchTerm, roleFilter) => {
  try {
    const offset = (page - 1) * pageSize;
    let queryString = `SELECT users.id, users.first_name, users.last_name, users.user_name, users.email, users.is_deleted, roles.role FROM users INNER JOIN roles ON roles.id = users.role_id WHERE roles.role != 'admin'`;

    const params = [];

    if (searchTerm) {
      queryString += ` AND LOWER(users.user_name) LIKE LOWER($${
        params.length + 1
      })`;
      params.push(`%${searchTerm}%`);
    }

    if (roleFilter) {
      queryString += ` AND LOWER(roles.role) = LOWER($${params.length + 1})`;
      params.push(roleFilter);
    }

    queryString += ` ORDER BY users.id LIMIT $${params.length + 1} OFFSET $${
      params.length + 2
    };`;

    params.push(pageSize, offset);

    const queryResult = await db.query(queryString, params);
    return queryResult.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.countusers = async () => {
  try {
    const result = await db.query(
      "select count(id) from users where is_deleted = false"
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.countcourses = async () => {
  try {
    const result = await db.query(
      "select count(id) from courses where category_id = 1 or category_id = 2 where is_deleted = false"
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};
Dashboard.countworkshops = async () => {
  try {
    const result = await db.query(
      "select count(id) from courses where category_id = 3 or category_id = 4 where is_deleted = false"
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.counttechtips = async () => {
  try {
    const result = await db.query(
      "select count(id) from techtips where is_deleted = false "
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};
Dashboard.countfaq = async () => {
  try {
    const result = await db.query(
      "select count(id) from faq where is_deletedq = false and is_deleteda = false"
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.countlessons = async (courseID) => {
  try {
    const result = await db.query(
      "select count(id) from lesson where course_id =$1 and is_deleted = false",
      [courseID]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.attendances = async (courseID) => {
  try {
    const result = await db.query(
      "select course_attendances.id ,users.user_name,users.email,users.phonenumber,roles.role from course_attendances  inner join users on users.id = course_attendances.user_id inner join roles on roles.id = users.role_id where course_id = $1",
      [courseID]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.countattendances = async (courseID) => {
  try {
    const result = await db.query(
      "select count(id) from course_attendances where course_id =$1",
      [courseID]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.videoviewers = async (lessonID) => {
  try {
    const result = await db.query(
      "select watched_videos.id ,users.user_name,users.email,users.phonenumber,roles.role from watched_videos  inner join users on users.id = watched_videos.user_id inner join roles on roles.id = users.role_id where lesson_id = $1",
      [lessonID]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.countvideoviewers = async (lessonID) => {
  try {
    const result = await db.query(
      "select count(id) from watched_videos where lesson_id =$1",
      [lessonID]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.topratedcourse = async () => {
  try {
    const result = await db.query(
      "SELECT courses.title FROM courses WHERE rate = (SELECT MAX(rate) FROM courses where is_deleted = false and (courses.category_id = 1 or courses.category_id = 2)) "
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.topratedworkshop = async () => {
  try {
    const result = await db.query(
      "SELECT courses.title FROM courses WHERE rate = (SELECT MAX(rate) FROM courses where is_deleted = false and (courses.category_id = 3 or courses.category_id = 4))"
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.minratedcourse = async () => {
  try {
    const result = await db.query(
      "SELECT courses.title FROM courses WHERE rate = (SELECT MIN(rate) FROM courses where is_deleted = false and (courses.category_id = 1 or courses.category_id = 2))"
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.minratedworkshop = async () => {
  try {
    const result = await db.query(
      "SELECT courses.title FROM courses WHERE rate = (SELECT MIN(rate) FROM courses  where is_deleted = false and (courses.category_id = 3 or courses.category_id = 4))"
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.topratedlesson = async () => {
  try {
    const result = await db.query(
      "SELECT lesson.title FROM lesson WHERE rate = (SELECT MAX(rate) FROM lesson where  is_deleted = false )"
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.minratedlesson = async () => {
  try {
    const result = await db.query(
      "SELECT lesson.title FROM lesson WHERE rate = (SELECT MIN(rate) FROM lesson where is_deleted = false )"
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.mostenrolledcourse = async () => {
  try {
    const result = await db.query(
      "SELECT course_id,courses.title FROM course_attendances inner join courses on courses.id = course_attendances.course_id where courses.is_deleted = false and (courses.category_id = 1 or courses.category_id = 2)GROUP BY course_id,courses.title ORDER BY COUNT(course_id) DESC LIMIT 1"
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.mostenrolledworkshop = async () => {
  try {
    const result = await db.query(
      "course_id,courses.title FROM course_attendances inner join courses on courses.id = course_attendances.course_id where courses.is_deleted = false and (courses.category_id = 3 or courses.category_id = 4) GROUP BY course_id,courses.title ORDER BY COUNT(course_id) DESC LIMIT 1;"
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.mostviewedvideo = async (courseID) => {
  try {
    const result = await db.query(
      "SELECT lesson_id,lesson.title FROM watched_videos inner join lesson on lesson.id = watched_videos.lesson_id where lesson.is_deleted = false GROUP BY lesson_id , lesson.title ORDER BY COUNT(lesson_id) DESC LIMIT 1"
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

module.exports = Dashboard;
