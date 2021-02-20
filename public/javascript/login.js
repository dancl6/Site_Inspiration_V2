// import Auth from "../../utils/auth"

async function loginFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
     let response = await fetch(`/api/users/${userArray.id}/token`, {
        method: 'post',
        body: JSON.stringify({
          username,
          password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }

      try {
          Auth.login(token)
      } catch (e) {
          console.log(e)
      }

    }
  }
  
  document.querySelector('#submitButton').addEventListener('click', loginFormHandler);
  