// import and instantiate express
const express = require("express") // CommonJS import style!
const cors = require("cors");
const app = express() // instantiate an Express object
const path = require('path');
const itemsRoutes = require('./routes/items');

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // Allow requests from your React app
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed request methods
  allowedHeaders: ["Content-Type"] // Allowed headers
}));

app.use(express.static(path.join(__dirname, '../public')));

// we will put some server logic here later...
app.get("/", (req, res) => {
    res.send("Smart Refrigerator Management System API");
  });  

app.use('/api/items', itemsRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong'
  });
});

// export the express app we created to make it available to other modules
module.exports = app