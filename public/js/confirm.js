const confirmMove = async (event) => {
    const selcetedMoverID = event.target.parentNode.dataset.id;
    const selcetedMoverHourly = event.target.parentNode.dataset.hourly;

    const response = await fetch('api/moves/confirm', {
        method: 'PUT',
        body: JSON.stringify({ selcetedMoverID, selcetedMoverHourly }),
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }

}

// document.querySelector('.confirm').addEventListener('click', confirmMove);

document.addEventListener("click", function (event) {
    if (event.target.className === "confirm") {
        confirmMove(event)
    }
})