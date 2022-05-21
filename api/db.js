const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectMongoDb = () => {
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("connection to mongodb successfully.")
})
.catch((err) => {
    console.log(err);
})
}


module.exports = connectMongoDb;