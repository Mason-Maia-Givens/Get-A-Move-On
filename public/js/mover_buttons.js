const acceptButton = document.getElementById("accept");
const declineButton = document.getElementById("decline");
const cancelButton = document.getElementById("cancel");

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

if (acceptButton) {
    document.querySelector("#accept").addEventListener("click", moverConfirm);
}
if (declineButton) {
    document.querySelector("#decline").addEventListener("click", moverDecline);
}
if (cancelButton) {
    document.querySelector("#cancel").addEventListener("click", moverCancel);
}