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

//Sign-up page
router.get('/signup', (req, res) => {
    // if (req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    // }
    res.render('signup');
});

module.exports = router;