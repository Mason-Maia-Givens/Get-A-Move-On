const moverConfirm = async (event) => {
    const clientID = event.target.parentNode.id;

    const response = await fetch('api/moves/accept', {
        method: 'PUT',
        body: JSON.stringify({ clientID }),
        headers: { 'Content-Type': 'application/json' }
    })
};

const moverDecline = async (event) => {
    const clientID = event.target.parentNode.id;
    
    const response = await fetch('api/moves/decline', {
        method: 'PUT',
        body: JSON.stringify({ clientID }),
        headers: { 'Content-Type': 'application/json' }
    })
};

const moverCancel = async (event) => {
    const clientID = event.target.parentNode.id;
    
    const response = await fetch('api/moves/cancel', {
        method: 'PUT',
        body: JSON.stringify({ clientID }),
        headers: { 'Content-Type': 'application/json' }
    })
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