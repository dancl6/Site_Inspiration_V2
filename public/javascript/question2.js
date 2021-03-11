
async function question2FormHandler(event) {

    localStorage.removeItem('question2');

    // let question1_LS = localStorage.getItem('question1')
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
        let question1_LS = localStorage.getItem('question1')
        console.log("i am at question 2 js and value is:", question1_LS)
        const response = await fetch('/question2', {
            method: 'get',
            // body: JSON.stringify({
            //   question1_LS: question1_LS
            // }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
      
          if (val) {
            document.location.replace('/quote');
          } else {
            alert(response.statusText);
          }


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
      