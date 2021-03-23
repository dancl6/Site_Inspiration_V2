
async function loginFormHandler(event) {
    event.preventDefault();
  
    const category = document.querySelector('#quote-category').value.trim();
    // const password = document.querySelector('#password-login').value.trim();
  
    // if (category) {
        await fetch(`https://brainyquotes.vercel.app/quotes?category=${category}`, {
          method: 'GET',
        //   body: JSON.stringify({
        //     // username,
        //     // password
        //   }),
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        }).then((response) => response.json())
        .then((data) => {
            console.log(data)
            fetch('/api/users/brainy', {
                method: 'get',
                // body: JSON.stringify({
                //   data
                // }),
                // headers: {
                //   'Content-Type': 'application/json'
                // }
              });


        })
    
        // if (response.ok) {
        //   document.location.replace('/');
            // console.log("response is :", response)

        // } else {
        //   alert(response.statusText);
        // }
    //   }
  }
// }
  document.querySelector('#submitButton').addEventListener('click', loginFormHandler);
  