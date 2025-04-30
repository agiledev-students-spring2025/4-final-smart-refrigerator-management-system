// import and instantiate express
require('dotenv').config();
const express = require("express") 
const cors = require("cors");
const app = express() 
const path = require('path');
const itemsRoutes = require('./routes/items');
const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipes');
const accountSeetingRoutes = require('./routes/accountSetting');
const fridgeModelRoutes = require('./routes/fridgeModel');
const analyticsRoutes = require('./routes/analytics');
const wasteRoutes = require('./routes/waste');
const recommendationsRoutes = require('./routes/recommendations');


app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://new-fridge-9qc4v.ondigitalocean.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }, // Allow requests from your React app
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed request methods
  allowedHeaders: ["Content-Type", "Authorization"] // add "Authorization"
}));

app.use(express.static(path.join(__dirname, '../public')));

// we will put some server logic here later...
app.get("/", (req, res) => {
    res.send("Smart Refrigerator Management System API");
  });  

app.use('/api/items', itemsRoutes);
app.use('/api', accountSeetingRoutes);
app.use('/api', fridgeModelRoutes);
app.use('/api', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/waste', wasteRoutes);
app.use('/api/recommendations', recommendationsRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong'
  });
});


// export the express app we created to make it available to other modules
module.exports = app