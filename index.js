const express = require('express');
const dotenv = require('dotenv');
const { authenticateDatabase,syncModels } = require('./config/db'); 
const cors = require('cors');
const router =  require('./routes/router')

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

authenticateDatabase();
syncModels();

const PORT = process.env.PORT || 5000;

app.use('/api/v1/users', router);

app.listen(PORT,(PORT)=>{
    console.log(`server is running on port ${{PORT}}`)
})
