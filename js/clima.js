// 1. Obtener referencia a elementos del DOM (tabla de clima, historial de consultas, botón de vaciar historial)
const weatherTable = document.querySelector('#weatherTable tbody');
const historyList = document.querySelector('#historyList');
const clearHistoryBtn = document.querySelector('#clearHistoryBtn');

// 2. Definir función para obtener parámetros GET de la URL (ciudad seleccionada)
function obtenerParametroGET(nombreParametro) {
    return new URLSearchParams(location.search).get(nombreParametro);
}

// 3. Función para obtener información de clima de una ciudad desde localStorage
function obtenerInfoClima(idCiudad) {
    // Obtener los datos del clima almacenados en localStorage
    const ciudades = JSON.parse(localStorage.getItem('ciudades')) || [];
    const ciudadEncontrada = ciudades[idCiudad]
    if (ciudadEncontrada) {
        // Mostrar la información del clima en la tabla
        mostrarClimaEnTabla(ciudadEncontrada)
        // Agregar la ciudad al historial en localStorage
        agregarCiudadAHistorial(ciudadEncontrada)
    } else {
        console.error(`No se encontró información para la ciudad ${idCiudad}`);
        // Manejar el caso donde no se encuentra la ciudad en los datos
        alert(`No se encontró información para la ciudad ${idCiudad}`);
    }
}

// 4. Función para mostrar dinámicamente el clima de la ciudad seleccionada en la tabla
function mostrarClimaEnTabla(ciudad) {
    // console.log(ciudad)
    weatherTable.innerHTML += `
            <tr>
                <td>${ciudad.nombre}</td>
                <td>${ciudad.temperatura}</td>
                <td>${ciudad.condicion}</td>
            </tr>`
}

// 5. Función para agregar una ciudad al historial en localStorage
function agregarCiudadAHistorial(ciudad) {
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    // Evitar duplicados en el historial
    if (!historial.includes(ciudad.nombre)) {
        historial.push(ciudad.nombre);
        localStorage.setItem('historial', JSON.stringify(historial));
    }
    // Actualizar la lista en el DOM
    actualizarHistorialEnDOM()
}

// 6. Función para actualizar el historial en el DOM desde localStorage
function actualizarHistorialEnDOM() {
    // Limpiar el historial actual
    historyList.innerHTML = '';
    // Obtener el array de historial desde el LocalStorage
    const historial = JSON.parse(localStorage.getItem('historial')) || [];
    // Recorrer el historial y cargar en el dom
    historial.forEach(ciudad => {
        historyList.innerHTML += `<li>${ciudad}</li>`
    })
}

// 7. Función para vaciar el historial de consultas en localStorage y en el DOM
function vaciarHistorial() {
    // Vaciar historial en localStorage
    // Vaciar la lista de historial en el DOM
}

// 8. Obtener la ciudad seleccionada desde los parámetros GET y obtener su información de clima al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    // obtener parámetros GET de la URL (ciudad seleccionada)
    const ciudadSeleccionada = obtenerParametroGET('ciudad');
    // console.log(ciudadSeleccionada)
    // obtener información de clima de una ciudad desde localStorage
    obtenerInfoClima(ciudadSeleccionada)
    // actualizar el historial en el DOM desde localStorage
    actualizarHistorialEnDOM();
});

// 9. Manejar evento de clic en el botón de vaciar historial para eliminar todas las consultas anteriores
clearHistoryBtn.addEventListener('click', function () {
    localStorage.removeItem('historial');
    actualizarHistorialEnDOM();
});