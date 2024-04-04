/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
window.onload = async () => {
    const token = await localStorage.getItem('token');
    let pending = 0;
    let arrived = 0;
    let transit = 0;
    let delivered = 0;
    let cancelled = 0;
    const pricePerKg = 100;
    const myparcelTable = document.getElementById('parcels');
    (this.parcels = () => {
      fetch('https://andela-dev-challenge.herokuapp.com/api/v1/users/:userId/parcels', {
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
            if (parcels.data[index].status === 'PENDING') {
              pending++;
            } else if (parcels.data[index].status === 'IN_TRANSIT') {
              transit++;
            } else if (parcels.data[index].status === 'ARRIVED') {
              arrived++;
            } else if (parcels.data[index].status === 'DELIVERED') {
              delivered++;
            } else {
              cancelled++;
            }
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
                  <a title="Cancel a Parcel" onclick="cancel('${parcels.data[index].id}')">
                      <i class="fas fa-times-circle"></i>
                  </a>
                  <a href="editParcel.html?id=${parcels.data[index].id}">
                      <i class="fas fa-edit"></i>
                  </a>
              </td>
            </tr>
          `;
            myparcelTable.appendChild(tr);
          }
          document.getElementById('pending').innerHTML = pending;
          document.getElementById('arrived').innerHTML = arrived;
          document.getElementById('transit').innerHTML = transit;
          document.getElementById('delivered').innerHTML = delivered;
          document.getElementById('cancelled').innerHTML = cancelled;
        })
        .catch(error => error.stack);
    })();
    // cancel a parcel
    this.cancel = (item) => {
      fetch(`https://andela-dev-challenge.herokuapp.com/api/v1/parcels/${item}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'Application/JSON',
          'x-access-token': token,
        },
      }).then((res) => {
        res.json().then(async (results) => {
          const { message, status } = results;
          if (status === 200) {
            document.getElementById('output-success').style.display = 'block';
            document.getElementById('output-success').innerHTML = message;
          } else {
            document.getElementById('output-error').style.display = 'block';
            document.getElementById('output-error').innerHTML = message;
          }
          // clear
          setTimeout(() => {
            document.getElementById('output-error').style.display = 'none';
            document.getElementById('output-success').style.display = 'none';
          }, 4000);
        }).catch(err => err);
      });
    };
  };