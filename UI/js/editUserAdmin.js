/* eslint-disable no-undef */
window.onload = () => {
    const urlString = window.location.href;
    const url = new URL(urlString);
    const id = url.searchParams.get('id');
    const uptateBtn = document.getElementById('edituser');
    (this.viewDetail = async () => {
      const token = await localStorage.getItem('token');
      fetch(`https://localhost:3000/api/v1/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/JSON',
          'x-access-token': token,
        },
      }).then((res) => {
        res.json().then(async (results) => {
          const { data } = results;
          document.getElementById('firstName-user').value = data.first_name;
          document.getElementById('firstName-user').disabled = true;
          document.getElementById('lastName-user').value = data.last_name;
          document.getElementById('lastName-user').disabled = true;
          document.getElementById('username-user').value = data.username;
          document.getElementById('username-user').disabled = true;
          document.getElementById('email-user').value = data.email;
          document.getElementById('email-user').disabled = true;
          document.getElementById('userRole-user').value = data.user_role;
        }).catch(err => err.stack);
      });
    })();
  
    this.updateParcel = async () => {
      const token = await localStorage.getItem('token');
      const userRole = document.getElementById('userRole-user').value;
  
      // change userRole
      fetch(`https://localhost:3000/api/v1/users/${id}/update`, {
        method: 'PUT',
        body: JSON.stringify({
          userRole,
        }),
        headers: {
          'Content-Type': 'Application/JSON',
          'x-access-token': token,
        },
      }).then((res) => {
        res.json()
          .then(async (results) => {
            const { message, status } = results;
            if (status === 200) {
              document.getElementById('output-success').style.display = 'block';
              document.getElementById('output-success').innerHTML = message;
              setTimeout(() => {
                window.location.href = 'admin.html';
              }, 4000);
            } else {
              document.getElementById('output-error').style.display = 'block';
              document.getElementById('output-error').innerHTML = message;
            }
          }).catch(err => err);
      });
    };
  
    if (uptateBtn) {
      uptateBtn.addEventListener('click', updateParcel);
    }
  };