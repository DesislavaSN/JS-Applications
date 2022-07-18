async function getInfo() {

  const stopInput = document.getElementById("stopId").value;
  const stopName = document.getElementById("stopName");
  const buses = document.getElementById("buses");

  stopName.textContent = '';
  buses.textContent = '';
  stopInput.value = '';

  try {
    const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopInput}`);
    if (response.ok == false) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    stopName.textContent = data.name;
    
    for (const bus of Object.entries(data.buses)) {
      const liEl = document.createElement('li');
      buses.appendChild(liEl);
      liEl.textContent = `Bus ${bus[0]} arrives in ${bus[1]} minutes`
    }

  } catch (error) {
    stopName.textContent = 'Error';
  }
}
