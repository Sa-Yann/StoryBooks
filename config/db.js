const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        // we wonna wait until we connect via the connection string that we have in process.env.MONGO_URI
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // following options avoid warning in console
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log(`MongpDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.error(err);
        // we stop the process
        process.exit(1)
    }
};

// module.export to allow app.js to use it 
module.exports = connectDB