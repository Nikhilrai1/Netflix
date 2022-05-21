const express = require("express");
const connectMongoDb = require("./db");
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const movieRoute = require("./routes/movies")
const listRoute = require("./routes/lists")
const app = express();
const cors = require("cors");
connectMongoDb();


app.use(express.json());
app.use(cors());
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/movie",movieRoute);
app.use("/api/list",listRoute);
app.listen(8800,() => {
    console.log("Backend server is running");
})