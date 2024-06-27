function filterPaquetes() {
    const searchBar = document.getElementById('searchBar').value.toLowerCase();
    const paquetesList = document.getElementById('paquetesList');
    const paquetes = paquetesList.getElementsByClassName('pro');

    for (let i = 0; i < paquetes.length; i++) {
        const paquete = paquetes[i];
        const nombre = paquete.querySelector('.des span').textContent.toLowerCase();

        if (nombre.includes(searchBar)) {
            paquete.style.display = '';
        } else {
            paquete.style.display = 'none';
        }
    }
}