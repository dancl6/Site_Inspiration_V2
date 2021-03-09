const router = require('express').Router();
const { User } = require('../../models');
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
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => {

        res.json(dbUserData)})
    .catch(err => res.status(500).json(err));
});

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