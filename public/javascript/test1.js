
async function loginFormHandler(event) {
    // const { signToken, authMiddleware } = require('../../utils/auth')
    // const  Auth  = require('../../public/utils/auth')
    event.preventDefault();
//     let currentUserToken =  Auth.getToken()
//     console.log("current user token in test1.js is:", currentUserToken)
//    let currentUser = authMiddleware(currentUserToken)
//    console.log("i am at current user in test1.js:", currentUser)
//     // const username = document.querySelector('#username-login').value.trim();
    // const password = document.querySelector('#password-login').value.trim();

    // const { signToken, authMiddleware } = require('../../utils/auth')
    // const bcrypt = require('bcrypt');
    // const  Auth  = require('../../public/utils/auth')
    // import { Auth } from '../../public/utils/auth';
    // import { signToken, authMiddleware } from '../utils/auth';
    if (typeof localStorage === "undefined" || localStorage === null) {
        var LocalStorage = require('node-localstorage').LocalStorage;
        localStorage = new LocalStorage('./scratch');
      }
    localStorage.setItem('test', 'test1')
    let token =  localStorage.getItem('id_token');
    console.log("token from js test 1 is:", token)
    // if (true) {

        const response = await fetch('/api/users/test1', {
            method: 'post',
            body: JSON.stringify({
                username: "test1",
                password: "test2",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7fSwiaWF0IjoxNjE0OTA5MTg4LCJleHAiOjE2MTQ5MTYzODh9.1YrlYhkRrUxD4kuv3TYVnE-6v_VpuVLb5bFt-YaZh7A"
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            console.log("response is :", response)
            // document.location.replace('/')
        } else {
            alert(response.statusText)
        }

        // await fetch(`/api/users/token/${username}/${password}`, {
        //     method: 'GET',
        //     headers: {
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/json'
        //     }
        //   })

    // .then(dbUsers =>{
        // let test = JSON.parse(JSON.stringify(dbUsers))
        // console.log(dbUsers.username)
    // })
    // .then(dbUser => {
    //     fetch(`/api/users/1/token`, {
    //         method: 'post',
    //         body: JSON.stringify({
    //           username,
    //           password
    //         }),
    //         headers: {
    //           'Content-Type': 'application/json'
    //         }
    //       });
      
    //     //   if (response.ok) {
    //     //     document.location.replace('/');
    //     //   } else {
    //     //     alert(response.statusText);
    //     //   }
    // })



    //   try {
    //       Auth.login(token)
    //   } catch (e) {
    //       console.log(e)
    //   }

    // }
  }
// }
  document.querySelector('#submitButton').addEventListener('click', loginFormHandler);
  