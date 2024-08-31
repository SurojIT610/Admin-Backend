const express = require("express");
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const cors = require('cors');
const exp = require("./Routes/UserRoutes/routes"); // Make sure this path is correct
const productRoutes = require("./Routes/ProductRoutes/productRoutes"); // Adjust the path as necessary

const con = require("./db_connect/connect"); // Ensure you have a connection setup if needed
const expAdmin = require("./Routes/AdminRoutes/AdminRoutes");
const PORT = process.env.PORT || 5000;

// Set up all middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Defining paths 
app.use('/api/v1', exp);
// defineing products path
app.use(`/api/product`,productRoutes)
// defining Admin Pathes
app.use(`/admin`,expAdmin)


// Initial point of entry
app.get('/', (req, res) => {
    res.send({ message: "Server initialization" });
});

// Binding server to the port number in the system
app.listen(PORT, () => {
    console.log(`Server running on Port number ${PORT}`);
});
