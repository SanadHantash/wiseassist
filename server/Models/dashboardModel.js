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
  is_paid,
  site,
  seats
) => {
  const result = await db.query(
    "INSERT INTO courses (title,detail,description,trainer,start_time,end_time,category_id,image,is_paid,site,seats)  VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11)",
    [
      title,
      detail,
      description,
      trainer,
      start_time,
      end_time,
      category_id,
      imageUrl,
      is_paid,
      site,
      seats,
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
  starttime,
  endtime,
  site
) => {
  try {
    const result = await db.query(
      "UPDATE courses SET title = $2, detail = $3, description = $4, trainer = $5, start_time = $6, end_time = $7, site = $8 WHERE id = $1 RETURNING *",
      [courseID, title, detail, description, trainer,starttime,endtime,site]
    );

    return result.rows[0];
  } catch (error) {
    throw error;
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

Dashboard.createlesson = async (courseID, videoUrl, title,imageUrl) => {
  try {
    const result = await db.query(
      "INSERT INTO lesson (course_id,video,title,image) VALUES ($1, $2,$3,$4) RETURNING *",
      [courseID, videoUrl, title,imageUrl]
    );
    return result.rows[0];
  } catch (error) {
    console.log(error);
    return error;
  }
};

Dashboard.alllessons = async (courseID) => {
  try {
    const result = await db.query(
      "SELECT lesson.id, lesson.title, REPLACE(lesson.image, 'https://storage.googleapis.com/wiseassist-b8a8a.appspot.com/images/', '') AS image FROM lesson INNER JOIN courses ON courses.id = lesson.course_id WHERE courses.id = $1 AND lesson.is_deleted = false;",
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
    console.error(err);
    return [];
  }
};



Dashboard.createtichtip = async (title, short_detail, detail, imageUrl) => {
  const result = await db.query(
    "INSERT INTO techtips (title,short_detail,detail,image) VALUES ($1, $2, $3,$4)",
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
  techtips.detail,
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


Dashboard.allfaq = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    const result = await db.query(
      `select faq.id,faq.question,faq.answer FROM faq WHERE faq.is_deleted = false LIMIT $2 OFFSET $1;`,
      [offset, pageSize]
    );

    const Questions = result.rows;

    return Questions;
  } catch (err) {
    throw err;
  }
};
Dashboard.updatefaq = async (faqID,question, answer) => {
  const result = await db.query(
    "update faq set question=$2,answer=$3 where faq.id = $1 Returning *",
    [faqID, question,answer]
  );
  return result.rows[0];
};



Dashboard.deletefaq = async (faqID) => {
  try {
    const result = await db.query(
      "UPDATE faq SET is_deleted = TRUE  WHERE id = $1",
      [faqID]
    );
    return result.rows;
  } catch (err) {
    throw err;
  }
};

Dashboard.countfaq = async () => {
  try {
    const result = await db.query(
      "select count(id) from faq where is_deleted = false"
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



Dashboard.allusers = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;
    let queryString = `SELECT users.id, users.first_name, users.last_name, users.user_name, users.email,users.phonenumber, users.is_deleted, roles.role FROM users INNER JOIN roles ON roles.id = users.role_id WHERE roles.role != 'admin'`;

    const params = [];

    // if (roleFilter) {
    //   queryString +=  AND LOWER(roles.role) = LOWER($${params.length + 1});
    //   params.push(roleFilter);
    // }

    queryString += ` ORDER BY users.id LIMIT $${params.length + 1} OFFSET $${
      params.length + 2
    }; `;

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
      `SELECT COUNT(users.id) AS user_count
      FROM users
      INNER JOIN roles ON users.role_id = roles.id
      WHERE roles.role != 'admin' AND users.is_deleted = false;`
    );
    return result.rows[0].user_count;
  } catch (err) {
    throw err;
  }
};

Dashboard.countcourses = async () => {
  try {
    const result = await db.query(
      "select count(id) from courses where is_deleted = false and (courses.category_id = 1 or courses.category_id = 2 )"
    );
    return result.rows[0].count;
  } catch (err) {
    throw err;
  }
};
Dashboard.countworkshops = async () => {
  try {
    const result = await db.query(
      "SELECT count(id) FROM courses WHERE is_deleted = false AND (courses.category_id = 3 OR courses.category_id = 4)"
    );
    return result.rows[0].count;
  } catch (err) {
    throw err;
  }
};

Dashboard.counttechtips = async () => {
  try {
    const result = await db.query(
      "select count(id) from techtips where is_deleted = false "
    );
    return result.rows[0].count;
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



Dashboard.addfaq = async (question,answer) => {
  try {

    const result = await db.query(
      "INSERT INTO faq (question,answer) VALUES ($1, $2) RETURNING *",
      [question,answer]
    );
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

module.exports = Dashboard;
