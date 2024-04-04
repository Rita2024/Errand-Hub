/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
window.onload = async () => {
    const token = await localStorage.getItem('token');
    const userTable = document.getElementById('users');
    const pricePerKg = 100;
    const myparcelTable = document.getElementById('parcels');
    (this.parcels = () => {
      fetch('https://andela-dev-challenge.herokuapp.com/api/v1/parcels', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      })
        .then(res => res.json())
        .then((parcels) => {
          for (let index = 0; index < parcels.data.length; index++) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <tr>
              <td>${parcels.data[index].location}</td>
              <td>${parcels.data[index].destination}</td>
              <td>${parcels.data[index].present_location}</td>
              <td>${parcels.data[index].weight}</td>
              <td>${parcels.data[index].weight * pricePerKg}</td>
              <td>${parcels.data[index].receiver_phone}</td>
              <td>${parcels.data[index].status}</td>
              <td>
                <a href="editParcelAdmin.html?id=${parcels.data[index].id}">
                    <i class="fas fa-edit"></i>
                </a>
              </td>
            </tr>
          `;
            myparcelTable.appendChild(tr);
          }
        })
        .catch(error => error.stack);
    })();
    // users
    (this.users = () => {
      fetch('https://andela-dev-challenge.herokuapp.com/api/v1/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      })
        .then(res => res.json())
        .then((users) => {
          for (let index = 0; index < users.data.length; index++) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
          <tr>
            <td>${users.data[index].email}</td>
            <td>${users.data[index].username}</td>
            <td>${users.data[index].first_name}</td>
            <td>${users.data[index].last_name}</td>
            <td>${users.data[index].user_role}</td>
            <td>
                <a href="editUserAdmin.html?id=${users.data[index].id}">
                    <i class="fas fa-edit"></i>
                </a>
              </td>
          </tr>
        `;
            userTable.appendChild(tr);
          }
        })
        .catch(error => error.stack);
    })();
  };