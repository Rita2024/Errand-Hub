/* eslint-disable no-undef */
window.onload = () => {
    const fromQuickQuote = localStorage.getItem('QuickQuote');
    let location = '';
    let destination = '';
    let weight = 0;
    if (fromQuickQuote) {
      location = localStorage.getItem('orderFrom');
      destination = localStorage.getItem('orderTo');
      weight = localStorage.getItem('orderWeight');
      document.getElementById('location-parcel').value = location;
      document.getElementById('destination-parcel').value = destination;
      document.getElementById('weight-parcel').value = weight;
    } else {
      location = document.getElementById('location-parcel').value;
      destination = document.getElementById('destination-parcel').value;
      weight = document.getElementById('weight-parcel').value;
    }
    const presentLocation = document.getElementById('present-location-parcel');
    const phone = document.getElementById('phone-parcel');
    const createBtn = document.getElementById('createbtn-parcel');
    const createParcel = async () => {
      const token = await localStorage.getItem('token');
      fetch('https://andela-dev-challenge.herokuapp.com/api/v1/parcels', {
        method: 'POST',
        body: JSON.stringify({
          location,
          destination,
          presentLocation: presentLocation.value,
          weight: parseInt(weight, 10),
          receiverPhone: phone.value,
        }),
        headers: {
          'Content-Type': 'Application/JSON',
          'x-access-token': token,
        },
      }).then((res) => {
        res.json().then(async (results) => {
          const { message, status } = results;
          await localStorage.setItem('token', token);
          if (status === 201) {
            document.getElementById('output-success').style.display = 'block';
            document.getElementById('output-success').innerHTML = message;
            setTimeout(() => {
              localStorage.setItem('QuickQuote', 'created');
              window.location.href = 'viewParcel.html';
            }, 4000);
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
  
    if (createBtn) {
      createBtn.addEventListener('click', createParcel);
    }
  };