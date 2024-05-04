/* eslint-disable no-undef */
window.onload = () => {
    document.getElementById('output-error').style.display = 'none';
    const email = document.getElementById('email-login');
    const password = document.getElementById('password-login');
    const loginBtn = document.getElementById('submit-login');
    const login = () => {
      fetch('https://localhost:3000/api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: email.value, password: password.value }),
        headers: {
          'Content-Type': 'Application/JSON',
        },
      }).then((res) => {
        res.json().then(async (results) => {
          const { token, data, message } = results;
          if (token) {
            await localStorage.setItem('token', token);
            const quote = localStorage.getItem('QuickQuote');
            if (data.user_role === 'ADMIN') {
              window.location.href = 'admin.html';
            } else if (quote === 'QuickQuote') {
              window.location.href = 'createParcel.html';
            } else {
              window.location.href = 'viewParcel.html';
            }
          } else {
            document.getElementById('output-error').style.display = 'block';
            document.getElementById('output-error').innerHTML = message;
          }
        }).catch(err => err);
      });
    };
  
    if (loginBtn) {
      loginBtn.addEventListener('click', login);
    }
  };