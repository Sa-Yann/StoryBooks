const mongoose = require("mongoose")

// const connectDB = async () => {
//     try {
//         // we wonna wait until we connect via the connection string that we have in process.env.MONGO_URI
//         const conn = await mongoose.connect(process.env.MONGO_URI, {
//             // following options avoid warning in console
//             useNewUrlParser: true, //stop warnings in the console
//             useUnifiedTopology: true,   //stop warnings in the console
//             useFindAndModify: false   //stop warnings in the console
//         })
//         console.log(`MongpDB Connected: ${conn.connection.host}`)
//     } catch (err) {
//         console.error(err);
//         // we stop the process
//         process.exit(1) // in case of error we wonna stop with failure hat s why 1 in exit(1)
//     }
// };

// // module.export to allow app.js to use it 
// module.exports = connectDB

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, //stop warnings in the console
            useUnifiedTopology: true,   //stop warnings in the console
            useFindAndModify: false 
        })
        console.log(`Mongo Connected: ${conn.connection.host}`);
        // console.log("🚀 ~ file: db.js ~ line 31 ~ connect ~ conn.connection", conn.connection);
        // console.log("🚀 ~ file: db.js ~ line 31 ~ connect ~ conn", conn);
        

    } catch (err)  {
        console.error(new Error(`Something went wrong impossible to connect to Mongo DB`));
        process.exit(1) // in case of error we wonna stop the process with failure that s why 1 in exit(1)
    }
} 
module.exports = connectDB // export the module to be able to use it the app.js file