const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const cookieParser = require('cookie-parser');
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://Philips:pelumi150@nodejs-tut.u7aknpl.mongodb.net/auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);