// 1. Obtener referencia al formulario y al select de ciudades
const selectCity = document.getElementById('selectCity');
// console.log(selectCity)
const cityForm = document.querySelector('#cityForm');

// 2. Definir función para cargar dinámicamente las opciones de ciudades desde datos.json usando fetch
function cargarOpcionesCiudades() {
    // Llamar al archivo usando fetch
    fetch('./public/datos.json')
        .then(response => response.json())
        .then(data => {
            // console.log(data.ciudades)
            const { ciudades } = { ...data }; // ciudades = data.ciudades
            // Almacenar los datos en localStorage para usarlos en clima.html
            localStorage.setItem('ciudades', JSON.stringify(ciudades));
            // Iterar sobre las ciudades obtenidas y agregar opciones al select
            selectCity.innerHTML = '';
            ciudades.forEach((ciudad, id) => {
                /* selectCity.innerHTML += `
                    <option value="${id}">${ciudad.nombre}</option>
                ` */
                const option = document.createElement('option');
                option.value = id;
                option.textContent = ciudad.nombre;
                selectCity.appendChild(option);
            })
        })
        .catch(error => {
            console.error('Error al cargar las opciones de ciudades desde datos.json:', error);
            // Manejar el error, por ejemplo, mostrar un mensaje al usuario
            alert('Error al cargar las opciones de ciudades desde datos.json');
        });
}

// 3. Manejar evento de envío del formulario para redirigir a clima.html con la ciudad seleccionada
cityForm.addEventListener('submit', function (e) {
    // Prevenir el envío del formulario para manejarlo con JavaScript
    e.preventDefault();
    // Redirigir a clima.html con la ciudad seleccionada como parámetro GET
    location.href = `clima.html?ciudad=${selectCity.value}`;
});

// 4. Cargar las opciones de ciudades al cargar la página principal
window.addEventListener('load', () => {
    cargarOpcionesCiudades();
});