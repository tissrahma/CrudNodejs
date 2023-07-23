const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes.js');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
// Middleware
app.use(express.json());

// Connect to MongoDB database
mongoose
  .connect('mongodb://localhost:27017/crud', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.use('/', userRoutes);



app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Something went wrong.' });
});
app.use(morgan('start'));
app.use(express.json());
app.use('/img', express.static('public/images'));
app.use(express.urlencoded({ extended: true }));
