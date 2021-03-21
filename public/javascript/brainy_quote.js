
async function loginFormHandler(event) {
    event.preventDefault();
  
    const category = document.querySelector('#quote-category').value.trim();
    // const password = document.querySelector('#password-login').value.trim();
  
    if (category) {
        const response = await fetch(`brainyquotes.vercel.app/quotes?${category}`, {
          method: 'post',
          body: JSON.stringify({
            // username,
            // password
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
    
        if (response.ok) {
        //   document.location.replace('/');
            console.log("response is :", response)

        } else {
          alert(response.statusText);
        }
      }
  }
// }
  document.querySelector('#submitButton').addEventListener('click', loginFormHandler);
  