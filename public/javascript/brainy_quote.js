
async function loginFormHandler(event) {
    event.preventDefault();
  
    const category = document.querySelector('#quote-category').value.trim();
    // const password = document.querySelector('#password-login').value.trim();
    localStorage.setItem("category", category)
    document.location.replace('/display-quotes');
        // await fetch(`https://brainyquotes.vercel.app/quotes?category=${category}`, {
        //   method: 'GET',

        // }).then((response) => response.json())
        // .then((data) => {
        //     console.log(data)
        //     fetch('/api/users/brainy', {
        //         method: 'post',
        //         body: JSON.stringify({
        //           data
        //         }),
        //         headers: {
        //           'Content-Type': 'application/json'
        //         }
        //       });
        //       document.location.replace('/display-quotes');

        // })
    

  }

  document.querySelector('#submitButton').addEventListener('click', loginFormHandler);
  