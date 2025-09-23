const mongoose = require('mongoose');

const connectionString = "mongodb+srv://admin:SUdpIO5iyd8h4IYn@cluster0.vaqdsj6.mongodb.net/tickethack";


mongoose.connect(connectionString,{connectTimeoutMS : 2000})
.then(()=> console.log("Database connected !"))
.catch(error => console.log(error));