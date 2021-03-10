
async function question2FormHandler(event) {

    localStorage.removeItem('question2');


    //  var submitAnswer = function() {
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
        localStorage.setItem("question2", val)
      };
    

    
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
        
        //     if (response.ok) {
        //       document.location.replace('/');
        //     } else {
        //       alert(response.statusText);
        //     }
        //   }
    //   }
    // }
      document.querySelector('#submitButton').addEventListener('click', question2FormHandler);
      