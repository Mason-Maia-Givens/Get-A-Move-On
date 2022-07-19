const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const multer = require('multer');



// MVC-style routes
const routes = require('./controllers');

// db connection with credentials
const sequelize = require('./config/connection');

//photo upload middleware
const upload = multer({
  limits:{
    fileSize: 2000000,
    fileFilter: function (req, file, cb){
      checkFileUploadType(file, cb)
    }
  }
});

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create(); // { helpers }

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.single('photo'))
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});