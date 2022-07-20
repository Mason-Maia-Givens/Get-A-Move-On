const confirmMove = async (event) => {
    // event.preventDefault();
    const targetData =event.target.parentNode.id;

    const moverID = document.getElementById(targetData);

    const selcetedMoverID = moverID.dataset.id;
    const selcetedMoverHourly = moverID.dataset.hourly;

    const response = await fetch('api/moves/confirm', {
        method: 'PUT',
        body: JSON.stringify({ selcetedMoverID, selcetedMoverHourly }),
        headers: { 'Content-Type': 'application/json' }
    })
}

document.querySelector('.confirm').addEventListener('click', confirmMove);