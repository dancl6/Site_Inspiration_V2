
// async function loginFormHandler(event) {
    // event.preventDefault();
    let category = localStorage.getItem('category')
    // const category = document.querySelector('#quote-category').value.trim();
    // const password = document.querySelector('#password-login').value.trim();
    // localStorage.setItem("category", category)
    // document.location.replace('/display-quotes');
        await fetch(`https://brainyquotes.vercel.app/quotes?category=${category}`, {
          method: 'GET',

        }).then((response) => response.json())
        .then((data) => {
        //     console.log(data)
         await   fetch('/display-quotes', {
                method: 'get',
                // body: JSON.stringify({
                //   data
                // }),
                // headers: {
                //   'Content-Type': 'application/json'
                // }
              });
        //       document.location.replace('/display-quotes');

        })
    

//   }

//   document.querySelector('#submitButton').addEventListener('click', loginFormHandler);
  