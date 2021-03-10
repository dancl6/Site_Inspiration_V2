// const { LocalStorage } = require("node-localstorage");

async function question1FormHandler(event) {

  
    localStorage.removeItem('question1');

//  var response = function() {
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
    localStorage.setItem("question1", val)
//   };


  


    
        if (val) {
          document.location.replace('/question2');
        } else {
          alert(response.statusText);
        }

      }
//   }
// }
  document.querySelector('#submitButton').addEventListener('click', question1FormHandler);
  