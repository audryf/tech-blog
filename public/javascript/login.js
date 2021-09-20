

async function loginClickHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#login-username').value;
    const password = document.querySelector('#login-password').value;

    const res = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
        console.log('success')
    } else {
        console.log(res.status)
    }
}

async function signupClickHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#signup-email').value;
    const username = document.querySelector('#signup-username').value;
    const password = document.querySelector('#signup-password').value;


    const res = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
        console.log('success');
    } else {
        console.log(res.statusText);
    }

}

document.querySelector('.login').addEventListener('submit', loginClickHandler);
document.querySelector('.signup').addEventListener('submit', signupClickHandler);
