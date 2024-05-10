const mongoose = require("mongoose");


const connectDb = async()=>{
    try {
          await mongoose.connect(process.env.MONGO_DB);
          console.log("Mongodb is connected")
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb