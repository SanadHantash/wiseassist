const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 8080;

const courseRouter = require('./Routes/courseRoutes');
const cookieParser = require('cookie-parser');
const userRouter = require('./Routes/userRoutes');
const dashboardRouter = require('./Routes/dashboardRoutes');



app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(cookieParser());

app.use(userRouter);
app.use(courseRouter);
app.use(dashboardRouter);








app.listen(port, ()=> {
   console.log(`server runnning in port ${port}`);
})



