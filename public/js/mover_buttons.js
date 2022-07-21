const moverConfirm = async (event) => {
    const clientID = event.target.parentNode.id;

    const response = await fetch('api/moves/accept', {
        method: 'PUT',
        body: JSON.stringify({ clientID }),
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

const moverDecline = async (event) => {
    const clientID = event.target.parentNode.id;
    
    const response = await fetch('api/moves/decline', {
        method: 'PUT',
        body: JSON.stringify({ clientID }),
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

const moverCancel = async (event) => {
    const clientID = event.target.parentNode.id;
    
    const response = await fetch('api/moves/cancel', {
        method: 'PUT',
        body: JSON.stringify({ clientID }),
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

const moverComplete = async (event) => {
    const clientID = event.target.parentNode.id;
    
    const response = await fetch('api/moves/complete', {
        method: 'PUT',
        body: JSON.stringify({ clientID }),
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

document.addEventListener("click", function (event) {
    if (event.target.id == "accept") {
        moverConfirm(event)
    }
})

document.addEventListener("click", function (event) {
    if (event.target.id == "decline") {
        moverDecline(event)
    }
})

document.addEventListener("click", function (event) {
    if (event.target.id == "cancel") {
        moverCancel(event)
    }
})

document.addEventListener("click", function (event) {
    if (event.target.id == "complete") {
        moverComplete(event)
    }
})