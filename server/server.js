const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const port = 8080;


const courseRouter = require('./Routes/courseRoutes');
const cookieParser = require('cookie-parser');
const userRouter = require('./Routes/userRoutes');
const dashboardRouter = require('./Routes/dashboardRoutes');
const googleRoute = require("./Routes/googleRoute");
const userprofileRoute = require("./Routes/userprofileRoute");
const techtipRoute = require("./Routes/techtipRoute");
const faqRoute = require("./Routes/faqRoute");
const chatRoute = require("./Routes/chatRoute")
const homeRoute = require("./Routes/homeRoute")
app.use(session({ secret: "cats", resave: true, saveUninitialized: true }));



app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(googleRoute);
app.use(userRouter);
app.use(courseRouter);
app.use(dashboardRouter);
app.use(userprofileRoute);
app.use(techtipRoute);
app.use(faqRoute);
app.use(chatRoute);
app.use(homeRoute);









app.listen(port, ()=> {
   console.log(`server runnning in port ${port}`);
})



