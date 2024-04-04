/* eslint-disable no-undef */
window.onload = () => {
    const urlString = window.location.href;
    const url = new URL(urlString);
    const id = url.searchParams.get('id');
    const uptateBtn = document.getElementById('createbtn-parcel');
  
    (this.viewDetail = async () => {
      const token = await localStorage.getItem('token');
      fetch(`https://andela-dev-challenge.herokuapp.com/api/v1/parcels/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/JSON',
          'x-access-token': token,
        },
      }).then((res) => {
        res.json().then(async (results) => {
          const { data } = results;
          document.getElementById('location-parcel').value = data.location;
          document.getElementById('location-parcel').disabled = true;
          document.getElementById('present-location-parcel').value = data.present_location;
          document.getElementById('present-location-parcel').disabled = true;
          document.getElementById('destination-parcel').value = data.destination;
          document.getElementById('weight-parcel').value = data.weight;
          document.getElementById('weight-parcel').disabled = true;
          document.getElementById('phone-parcel').value = data.receiver_phone;
          document.getElementById('phone-parcel').disabled = true;
        // update a parcel
        }).catch(err => (err.stack));
      });
    })();
  
    this.updateParcel = async () => {
      const token = await localStorage.getItem('token');
      const destination = document.getElementById('destination-parcel').value;
      fetch(`https://andela-dev-challenge.herokuapp.com/api/v1/parcels/${id}/destination`, {
        method: 'PUT',
        body: JSON.stringify({
          destination,
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
                window.location.href = 'viewParcel.html';
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