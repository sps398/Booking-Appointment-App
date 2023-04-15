const sequelize = require('./util/database');
const userRoutes = require('./routes/user');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
var cors = require('cors');

const app = express();

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', userRoutes);

sequelize
    .sync()
    .then(result => {
        app.listen(3000);
    })
    .catch(err => console.log(err));