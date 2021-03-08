async function loginFormHandler(event) {
    event.preventDefault();
    const secretKey = 'mysecretsshhhhh'
    const response = await fetch('/api/users/verify_token/id', {
        method: 'post',
        body: JSON.stringify({
            username: "test1",
            password: "test2",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7fSwiaWF0IjoxNjE0OTA5MTg4LCJleHAiOjE2MTQ5MTYzODh9.1YrlYhkRrUxD4kuv3TYVnE-6v_VpuVLb5bFt-YaZh7A"
        }),
        headers: {
            'Content-Type': 'application/json',
            'authorization': secretKey
        }
    })

    if (response.ok) {
        console.log("response is :", response)
        // document.location.replace('/')
    } else {
        alert(response.statusText)
    }
}
    document.querySelector('#submitButton').addEventListener('click', loginFormHandler);