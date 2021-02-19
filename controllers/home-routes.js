const router = require('express').Router();
const sequelize = require('../config/connection');
const { Op } = require('sequelize');

const {
    Quotes,
    User,
    Reason,
    User_Quotes
} = require('../models');
const isAuth = require('../utils/middleware/isAuth');

router.get('/', (req,res) => {
    User.findAll({})
    .then(dbPostData => {
        res.render('test')
    })
})

module.exports = router;