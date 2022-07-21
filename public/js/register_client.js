const handleRegister = async (event) => {
    event.preventDefault();

    // User information
    const first_name = document.querySelector('#first-name').value.trim();
    const last_name = document.querySelector('#last-name').value.trim();
    const gender = document.querySelector('#gender').value.trim();
    const email = document.querySelector('#email-address').value.trim();
    const password = document.querySelector('#password').value.trim();
    //profile picture
    // const profile_picture = document.querySelector(`#profilePicture`).files[0];

    // Move information
    // Current Residence
    const current_street = document.querySelector('#street-address').value.trim();
    const city = document.querySelector('#city').value.trim();
    // const state = document.querySelector('#state').value.trim();
    const placeholderState = "Not a Real State";
    const zip_code = document.querySelector('#postal-code').value.trim();
    // const current_size = document.querySelector('#residence-size').value.trim();
    // const current_floor = document.querySelector('').value.trim();

    // Concatenate full address
    const full_address = `${current_street}, ${city}, ${placeholderState} ${zip_code}`

    // Future Residence
    // THIS SHOULD BE A FULL ADDRESS
    const moving_street = document.querySelector('#moving-address').value.trim();
    const items = document.querySelector('#items').value.trim();
    const moving_date = document.querySelector('#moving-date').value;
    // const moving_size = document.querySelector('#moving-size').value.trim();
    // const moving_floor = document.querySelector('#moving-floor').value.trim();
    
    // Should this be in the Personal Information section?
    const accessibility = document.querySelector('#accessibility').checked;

    const response = await fetch('api/users/signupclient', {
        method: 'POST',

        body: JSON.stringify({ first_name, last_name, email, password, gender, full_address, moving_date, items, moving_street, accessibility }),

        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
    
}

document.querySelector('#register').addEventListener('click', handleRegister);