const router = require('express').Router();
const { User } = require('../../models');
// const sequelize = require('../../config/connection')
// const passport = require('../../utils/passport');
// const isAuth = require('../../utils/middleware/isAuth');
const { signToken } = require('../../utils/auth')
const bcrypt = require('bcrypt');
const  Auth  = require('../../public/utils/auth')
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
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

router.post('/login', function(req,res) {
    console.log("login user", req.body.password)
    // console.log("login user is:", req.body.user)
    User.findOne({
        where: {
            username: req.body.username,
            // password_input: req.params.password_input
        },
        // attributes: { exclude: ['password'] }
    })
    .then(dbUserData => {
        let parse = JSON.parse(JSON.stringify(dbUserData))
        console.log("login specific user is:", parse.password)
        console.log("login password 2 is :", req.body.password)
        // let testPassword =  bcrypt.hash(parse.password, 10)
        // console.log("login password 3 is:", testPassword)
        var passwordIsValid = bcrypt.compareSync( req.body.password,  parse.password)
        console.log("is password valid test:", passwordIsValid)

        if(passwordIsValid === true) {
        var token = signToken(parse.username, parse.email, parse.id)
        console.log("token is :", token);
        var idToken = token
        localStorage.setItem("lastname", "Smith");
        // localStorage.setItem('id_token', idToken);
        // Auth.login(idToken)
        Auth.testConsole(idToken)
        // localStorage.removeItem('id_token');
        console.log("get local storage", localStorage.getItem("id_token"))
        }
    })
    .catch(err => res.status(500).json(err));

})

router.get(`/token/:username/:password_input`, (req, res) => {
    User.findOne({
        where: {
            username: req.params.username,
            // password_input: req.params.password_input
        },
        // attributes: { exclude: ['password'] }
    })
    .then(dbUserData => {



        console.log("password input is :", req.params.password_input)
        // console.log("user password is:", user.password)
        // var passwordIsValid = bcrypt.compareSync(req.params.password, user.password)
        // console.log(passwordIsValid)
        // bcrypt.compare(loginPw, this.password)
       let test =  bcrypt.hash(req.params.password_input, 10)
       console.log("test is:", test)
        console.log(dbUserData)
        if (!dbUserData) {
            res.status(400).json({ message: 'No user found with this id' });
            return
        }
        res.json(dbUserData)
    })
    .then(test => {
        console.log("test 2 is :", test)
    })
    .catch(err => res.status(500).json(err));
});

//GET single user and sign token then return token
// router.get(`/token/:username`, (req, res) => {
//     User.findOne({
//         where: {
//             username: req.params.username
//         },
//         attributes: { exclude: ['password'] }
//     })
//     .then(dbUserData => {
//         console.log(dbUserData)
//         // console.log("username is :", username)
//         res.json(dbUserData)
//     }) 
//     // .catch(err => res.status(500).json(err));
//     // .then(token => {
//     //     Auth.login(token)
//     // })
//     .catch(err => res.status(500).json(err));
// });

// use passport to authenticate login. if invalid credentials, passport will return unauthorized
// router.post('/login', passport.authenticate('local'), function(req, res) {
//     res.render('homepage', {
//       loggedIn: req.session.passport.user.id,
//     });
//   });

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
// router.put('/dm', (req, res) => {
//     if (typeof req.session.passport != 'undefined') {
//         User.update({
//             dark_mode: req.body.dark_mode
//         }, 
//         {
//             where: {
//                 id: req.session.passport.user.id
//             }
//         })
//         .then(dbUserData => {
//             if (!dbUserData[0]) {
//                 res.status(404).json({ message: 'No user found with this id' });
//                 return;
//             }
//             console.log(`Successfully updated user table for ${req.session.passport.user.username} and dark mode is ${req.body.dark_mode}`)
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
//     }
// });

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

/**
 * Post client errors in order to log them
 */
// router.post('/logger/log-client-errors', (req, res) => {
//     let error           = req.body.error.message;
//     let errorInfo       = req.body.error.stack;

//     // send these errors to some service or to a logger (ex: winston)
//     //ex: logger.error(`The app received a new client log: ${error} ${errorInfo}`);

//     res.status(200);
// })

module.exports = router