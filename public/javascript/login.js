// const { signToken } = require("../../utils/auth");


async function loginFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    async function getUserInfo(username, password) {
        await fetch(`/api/users/`, {
          method: 'GET',
        }).then((response) =>  response.json())
        .then((data) => {
            console.log("data is this:", data)
            var userObject =  {
                username: "",
                email: "",
                password: "",
                id: ""
            }
          for (let i = 0; i < data.length; i++) {
              if((data[i].username === username) && (data[i].password === password)) {
                userObject.username = data[i].username
                userObject.email = data[i].email
                userObject.password = data[i].password 
                userObject.id = data[i].id
                  break
              }
          }  
          signToken(userObject.username, userObject.email, userObject.id)          
        }) 

          console.log("I AM HERE AT FOR ")
            // res.json(userObject)
        
    }
        getUserInfo(username, password)

    // if (username && password) {

    //     const response = await fetch('/api/users/login', {
    //         method: 'post',
    //         body: JSON.stringify({
    //             username,
    //             password
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })

    //     if (response.ok) {
    //         console.log("response is :", response)
    //         // document.location.replace('/')
    //     } else {
    //         alert(response.statusText)
        // }

        // console.log(" we are at response :", data.username)
        // const payload = { username, email, id };

        // return jwt.sign({ data: payload }, secret, { expiresIn: expiration });

  }
// }
  document.querySelector('#submitButton').addEventListener('click', loginFormHandler);
  