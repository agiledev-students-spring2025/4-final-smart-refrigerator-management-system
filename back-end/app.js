// import and instantiate express
const express = require("express") // CommonJS import style!
const cors = require("cors");
const app = express() // instantiate an Express object
const path = require('path');
const itemsRoutes = require('./routes/items');
const authRoutes = require('./routes/auth');


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
app.use('/api', authRoutes);

let userName = "john white"

app.get("/Account-Setting/:field", (req, res) => {
  try {
    const { field } = req.params;
    
    // Define allowed fields
    const allowedFields = ["name", "email", "phone"];
    
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ error: "Invalid field" });
    }
    
    //for database
    // const user = await User.findById(req.user.id);
    
    // Mock data for example
    const userSettings = {
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
    };
    
    // Check if the field exists for this user
    if (userSettings[field] === undefined) {
      return res.status(404).json({ error: `${field} not found` });
    }
    
    // Return just the requested field
    res.json({ [field]: userSettings[field] });
    
  } catch (error) {
    console.error(`Error fetching ${req.params.field}:`, error);
    res.status(500).json({ error: "Server error while fetching user data" });
  }
});

app.post("/Account-Setting/:field", (req,res)=> {
  try{
    const { field } = req.params;
    const { value } = req.body;

    res.json({ [field]: value });
  }
  catch (error) {
    console.error("Error updating user field:", error);
    res.status(500).json({ error: "Server error while updating user data" });
  }
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong'
  });
});

// export the express app we created to make it available to other modules
module.exports = app