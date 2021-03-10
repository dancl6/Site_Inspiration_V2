
async function question1FormHandler(event) {

  


 var response = function() {
    event.preventDefault();
    var radios = document.getElementsByName('choice');
    var val= "";
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
           val = radios[i].value; 
           break;
         }
    }
    


    console.log("value for answer is:", val)
  };

}

    // const username = document.querySelector('#username-login').value.trim();
    // const password = document.querySelector('#password-login').value.trim();
  
    // if (username && password) {
    //     const response = await fetch('/api/users/login', {
    //       method: 'post',
    //       body: JSON.stringify({
    //         username,
    //         password
    //       }),
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     });
    
        if (response.ok) {
          document.location.replace('/question2');
        } else {
          alert(response.statusText);
        }
    //   }
//   }
// }
  document.querySelector('#submitButton').addEventListener('click', question1FormHandler);
  