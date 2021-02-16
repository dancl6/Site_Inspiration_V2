const router = require('express').Router();
const sequelize = require('../config/connection');
// const { Op } = require('sequelize');

const {
    Quotes,
    User
} = require('../models');
const isAuth = require('../utils/middleware/isAuth');


module.exports = router;