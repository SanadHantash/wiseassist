const admin = require('firebase-admin');
const serviceAccount = require('./privatekey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'wiseassist-b8a8a.appspot.com',
});

const storage = admin.storage();

module.exports = { admin, storage };
