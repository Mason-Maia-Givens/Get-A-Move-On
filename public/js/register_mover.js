const handleRegister = async (event) => {
    event.preventDefault();

    // User information
    const first_name = document.querySelector('#first-name').value.trim();
    const last_name = document.querySelector('#last-name').value.trim();
    const email = document.querySelector('#email-address').value.trim();
    const password = document.querySelector('#password').value.trim();
    const gender = document.querySelector('#gender').value.trim();
    const profile_picture = document.querySelector(`#profilePicture`).file[0];


    // Current Residence
    const current_street = document.querySelector('#street-address').value.trim();
    const city = document.querySelector('#city').value.trim();
    // const state = document.querySelector('#state').value.trim();
    const placeholderState = "Not a Real State";
    const zip_code = document.querySelector('#postal-code').value.trim();

    // Concatenate full address
    const full_address = `${current_street}, ${city}, ${placeholderState} ${zip_code}`

    // Mover Information
    const hourly_rate = document.querySelector('#hourly-rate').value;
    const crew_select = document.querySelector('#crew');
    // const crew = crew_select.querySelectorAll(':scope > option:selected');
    const placeholderCrew = 4
    const vehicle_model = document.querySelector('#vehicle-model');
    const drivers_license = document.querySelector('#license-number').value;

    const response = await fetch('api/users/signupmover', {
        method: 'POST',
        body: JSON.stringify({ first_name, last_name, email, password, gender, full_address, hourly_rate, vehicle_model, drivers_license, crew, profile_picture }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
    
}

document.querySelector('#register').addEventListener('click', handleRegister);