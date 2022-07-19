const handleRegister = async (event) => {
    event.preventDefault();

    // User information
    const first_name = document.querySelector('#first-name').value.trim();
    const last_name = document.querySelector('#last-name').value.trim();
    const email = document.querySelector('#email-address').value.trim();
    // const password = document.querySelector('').value.trim();
    const placeholderPass = "pleasereplacethis";
    // const gender = document.querySelector('').value.trim();
    const placholderGender = "F";
    const current_street = document.querySelector('#street-address').value.trim();
        // Is this necessary if we're just doing Chicago?
        const city = document.querySelector('#city').value.trim();
        // const state = document.querySelector('').value.trim();
        const placeholderState = "Not a Real State";
        const zip_code = document.querySelector('#postal-code').value.trim();
    const current_size = document.querySelector('#residence-size').value.trim();
    // const current_floor = document.querySelector('').value.trim();

    // Concatenate full address
    const full_address = `${current_street}, ${city}, ${placeholderState} ${zip_code}`

    //Move information
    const moving_street = document.querySelector('#moving-address').value.trim();
    const items = document.querySelector('#items').value.trim();
    const moving_date = document.querySelector('#moving-date').value;
    // const moving_size = document.querySelector('').value.trim();
    // const moving_floor = document.querySelector('').value.trim();
    // Should this be in the Personal Information section?
    const accessibility = document.querySelector('#accessibility').value;

    const response = await fetch('api/users/signupclient', {
        method: 'POST',
        body: JSON.stringify({ first_name, last_name, email, placeholderPass, placholderGender, full_address }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#register').addEventListener('click', handleRegister);