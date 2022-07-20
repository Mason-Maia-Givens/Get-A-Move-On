const confirmMove = async (event) => {
    // event.preventDefault();
    
    const response = await fetch('api/moves/confirm', {
        method: 'POST'
    })
}

document.querySelector('.confirm').addEventListener('click', confirmMove);