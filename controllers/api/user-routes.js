const router = require('express').Router();
const { User, Reason, Quotes } = require('../../models');
// const jwt = require("jsonwebtoken")
// const sequelize = require('../../config/connection')
const passport = require('../../utils/passport');
const isAuth = require('../../utils/middleware/isAuth');
// const { signToken, authMiddleware } = require('../../utils/auth')
const bcrypt = require('bcrypt');
// const  Auth  = require('../../public/utils/auth')
// const decode = require('../../public/utils/decode_jwt')

// const LocalStorage = require('node-localstorage').LocalStorage,
// localStorage = new LocalStorage('./scratch')
// import { Auth } from '../../public/utils/auth';

// const Auth = require ("../../utils/auth2")
// const hash = require('../../public/javascript/hash')

// GET all users
// router.get('/', (req, res) => {
//     User.findAll({
//         attributes: { exclude: ['password'] }
//     })
//     .then(dbUserData => {

//         res.json(dbUserData)})
//     .catch(err => res.status(500).json(err));
// });

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    })
});

//GET single user
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => {
        console.log(dbUserData)
        if (!dbUserData) {
            res.status(400).json({ message: 'No user found with this id' });
            return
        }
        res.json(dbUserData)
    })
    .catch(err => res.status(500).json(err));
});

// use passport to authenticate login. if invalid credentials, passport will return unauthorized
router.post('/login', passport.authenticate('local'), function(req, res) {
    console.log("logged in is:",req.session.passport.user.id )
    res.render('homepage', {
      loggedIn: req.session.passport.user.id,
    });
  });

  router.get('/brainy',  function(req, res) {
          let loginStatus;
        if (typeof req.session.passport != 'undefined') {
            loginStatus = req.session.passport.user.id;
        } else {
            loginStatus = false;
        }

    console.log("brainy data is :", data )
    res.render('homepage', {
      data,
      loggedIn: loginStatus
    });
  });

//   router.post('/question2', isAuth, (req, res) => {
//     let loginStatus;
//     let test = "happy"
//     // let question1_LS = req.body.question1_LS
//     // console.log(" i am at question 1 ls and it is:", question1_LS)
//     if (typeof req.session.passport != 'undefined') {
//         loginStatus = req.session.passport.user.id;
//     } else {
//         loginStatus = false;
//     }
//     res.render('question2', {
//         loggedIn: loginStatus,
//         test
//     })
// })

  
//GET all users
router.get('/', (req, res) => {
    User.findAll({
        // attributes: ['id', 'category_name'],
        include: [

        {
            model: Quotes,
            // attributes: { exclude: ['password']},
        }
    ]
    
        
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

//POST create new user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
        // quotes_id: req.body.quotes_id
    })
   
    .then(dbUserData => res.json(dbUserData))
        
        .catch(err => res.status(500).json(err));
    });

// Update user table with dark mode toggle preference. Successfully updates value in table, but future implementation needed to retreive value from table and load into localstorage on login
router.put('/dm', (req, res) => {
    if (typeof req.session.passport != 'undefined') {
        User.update({
            dark_mode: req.body.dark_mode
        }, 
        {
            where: {
                id: req.session.passport.user.id
            }
        })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            console.log(`Successfully updated user table for ${req.session.passport.user.username} and dark mode is ${req.body.dark_mode}`)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});

//PUT update user
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => res.status(500).json(err));
});

//DELETE user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user found with this id' });
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => res.status(500).json(err));
});


module.exports = router