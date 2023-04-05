const express = require('express');
const cors = require('cors');

require('dotenv').config();
const bodyParser = require('body-parser');            //can send requests with data
const fileUpload = require('express-fileupload');     //can use multipart form data
const mongoose = require('mongoose');                 //to connect with mongoDb


//routers
const userRouter = require('./routes/userRouter');    
const categoryRouter = require('./routes/categoryRouter');
const subCategoryRouter = require('./routes/subCategoryRouter');
const childCategoryRouter = require('./routes/childCategoryRouter');
const tagRouter = require('./routes/tagRouter');


// database connection
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DATABASE_NAME}`)
  .then(() => console.log('Connected!'))
  .catch(() => console.log('Not Connected'));

  const app = express();        //Initiate the project

app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());

//Routing
app.use('/users' , userRouter);
app.use('/categories' , categoryRouter);
app.use('/sub-categories' , subCategoryRouter);
app.use('/child-categories' , childCategoryRouter);
app.use('/tags' , tagRouter);


//catch all errors
app.use((err , req , res , next) => {
      err.status = err.status || 404;
      res.status(err.status).json({condition : false ,  message : err.message});
})

//catch all wrong routes
app.get("*" , (req , res) => {
      res.status(200).json({condition : false , message : "Not Found!"});
})




//Run server
app.listen(process.env.PORT , () => {console.log(`Server is listening on port ${process.env.PORT}`)});