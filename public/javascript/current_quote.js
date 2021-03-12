

async function quoteFormHandler(event) {

    event.preventDefault();

    let emotion = localStorage.getItem("question1")
    let reason = localStorage.getItem("question2")
   


    let array = [emotion, "-", reason]
    let emotionReason = array.join("")
    console.log(" emotion reason is:", emotionReason)
    
    async function getQuote(emotionReason) {
        await fetch(`/api/quotes/emotion`, {
          method: 'POST',
          body: JSON.stringify({
            "testing": emotionReason
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        // .then((response) => {
        //     console.log("quotes are :", response)
        //     // console.log("single quote is:", response[0])
        //     response.json()
        // } )
        // .then((data)=> {})
    }



        getQuote(emotionReason)


  


    
        // if (val) {
        //   document.location.replace('/question2');
        // } else {
        //   alert(response.statusText);
        // }

      }
//   }
// }
  document.querySelector('#submitButton').addEventListener('click', quoteFormHandler);
  