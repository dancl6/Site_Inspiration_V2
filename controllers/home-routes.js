const router = require('express').Router();
const sequelize = require('../config/connection');
const { Op } = require('sequelize');
const  Auth  = require('../public/utils/auth')

const {
    Quotes,
    User,
    Reason,
    User_Quotes
} = require('../models');
const isAuth = require('../utils/middleware/isAuth');
const { login } = require('../public/utils/auth');

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

//Login route/render
router.get('/login', (req, res) => {
    // if (req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    // }
    res.render('login');
});

router.get('/user', (req, res) => {
    // if (req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    // }
    res.render('user');
});

router.get(`/:username/token`, (req,res) => {
    res.render('/')
})

//GET all quotes
router.get('/', (req, res) => {
    Quotes.findAll({
        // attributes: ['id', 'category_name'],
        include: [
        {
            model: Reason
        },
        {
            model: User,
            attributes: { exclude: ['password']},
        }
    ]
    
        
    })
    .then(dbQuotesData => {
    var quotesData = JSON.parse(JSON.stringify(dbQuotesData))
    let loginStatus;
    if (Auth.loggedIn) {
        loginStatus = true
    } else {
        loginStatus = false
    }
    //  res.json(dbQuotesData)
     res.render('user', {
        loggedIn: loginStatus,
        quotesData
     })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;