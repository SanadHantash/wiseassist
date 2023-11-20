const db = require('../config');

const { admin, storage } = require('../firebase');
const Techtip = {};

Techtip.alltechtips = async () => {
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

Techtip.techtipdetail = async (techId) => {
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

module.exports = Techtip