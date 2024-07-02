const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const userRoutes = require('./userRoutes');
const db = require('./dbConnect');

const port = process.env.PORT;

const app = express();
app.use(express.json());
db();
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log('Server started on ',port);
})