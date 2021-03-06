const router = require('express').Router();
const sequelize = require('../config/connection');
const { Op } = require('sequelize');
// const  Auth  = require('../public/utils/auth')

const {
    Quotes,
    User,
    Reason,
    User_Quotes
} = require('../models');
const isAuth = require('../utils/middleware/isAuth');
// const { login } = require('../public/utils/auth');

// router.get('/', (req,res) => {
//     User.findAll({})
//     .then(dbPostData => {
//         res.render('test')
//     })
// })

//Sign-up page
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

//Login route/render
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/test1', (req, res) => {
    // if (req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    // }
    res.render('test1');
});

router.get('/test2', (req, res) => {
    // if (req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    // }
    res.render('test2');
});

router.get('/user', (req, res) => {
    // if (req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    // }
    res.render('user');
});

router.get('/quote2', (req, res) => {
    let loginStatus;
    if (typeof req.session.passport != 'undefined') {
        loginStatus = req.session.passport.user.id;
    } else {
        loginStatus = false;
    }
    res.render('quote2', {
        loggedIn: loginStatus
    })
});

router.get('/question1', isAuth, (req, res) => {
    let loginStatus;
    if (typeof req.session.passport != 'undefined') {
        loginStatus = req.session.passport.user.id;
    } else {
        loginStatus = false;
    }
    res.render('question1', {
        loggedIn: loginStatus
    })
});

router.get('/quote', isAuth, (req, res) => {
    let loginStatus;
    if (typeof req.session.passport != 'undefined') {
        loginStatus = req.session.passport.user.id;
    } else {
        loginStatus = false;
    }
    res.render('quote', {
        loggedIn: loginStatus
    })
});

router.get('/question2', isAuth, (req, res) => {
    let loginStatus;
    let test = "happy"
    // let question1_LS = req.body.question1_LS
    // console.log(" i am at question 1 ls and it is:", question1_LS)
    if (typeof req.session.passport != 'undefined') {
        loginStatus = req.session.passport.user.id;
    } else {
        loginStatus = false;
    }
    res.render('question2', {
        loggedIn: loginStatus,
        test
    })
})



router.get(`/:username/token`, (req,res) => {
    res.render('/')
})

router.post(`/`, (req,res) => {
    let loginStatus;
    if (typeof req.session.passport != 'undefined') {
        loginStatus = req.session.passport.user.id;
    } else {
        loginStatus = false;
    }
    res.render('homepage', {
        loggedIn: loginStatus
    })
})

  router.get('/display-quotes',  function(req, res) {
        //   let loginStatus;
        // if (typeof req.session.passport != 'undefined') {
        //     loginStatus = req.session.passport.user.id;
        // } else {
        //     loginStatus = false;
        // }

    // console.log("brainy data is :", data )
    res.render('display-quotes', {
    //   data,
    //   loggedIn: loginStatus
    })
  });

//GET all quotes
// router.get('/', (req, res) => {
//     Quotes.findAll({
//         // attributes: ['id', 'category_name'],
//         include: [
//         {
//             model: Reason
//         },
//         {
//             model: User,
//             attributes: { exclude: ['password']},
//         }
//     ]
    
        
//     })
//     .then(dbQuotesData => {
//     var quotesData = JSON.parse(JSON.stringify(dbQuotesData))
//     let loginStatus;
//     // if (Auth.loggedIn) {
//     //     loginStatus = true
//     // } else {
//     //     loginStatus = false
//     // }
//     //  res.json(dbQuotesData)
//      res.render('user', {
//         loggedIn: loginStatus,
//         quotesData
//      })
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     })
// });

module.exports = router;