// const { login } = require("../utils/auth");


async function loginFormHandler(event) {
    event.preventDefault();
  
    // const username = document.querySelector('#username-login').value.trim();
    // const password = document.querySelector('#password-login').value.trim();
  
    // if (username && password) {
        console.log("I GET HERE")
        const response = await fetch('/api/users/get_user', {
            method: 'get',
            // body: JSON.stringify({
            //     username,
            //     password
            // }),
            headers: {
                'Accept': 'application/json',
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
document.querySelector('#get-me').addEventListener('click', loginFormHandler);