async function editFormHandler(event) {
    event.preventDefault();
    // extract product id from url
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    // get number of items in inventory
    const stock = document.querySelector('input[name="sold"]').value.trim();
    console.log(" I am here")
    console.log(stock)
    console.log(id)
    await fetch(`/api/users/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      document.location.replace('/');
  }
  
  document.querySelector('#sold-text').addEventListener('click', editFormHandler);
