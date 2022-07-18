function solve() {
  const infoInput = document.getElementById("info");
  const departBtn = document.getElementById("depart");
  const arriveBtn = document.getElementById("arrive");

  let stop = {
    next: "depot",
  };

  async function depart() {
    try {
      departBtn.disabled = true;
      const response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${stop.next}`);
      // console.log(response);
      const data = await response.json();
      //   console.log(data);
      
      stop = JSON.parse(JSON.stringify(data));
      infoInput.textContent = `Next stop ${stop.name}`;
      arriveBtn.disabled = false;
    } catch (error) {
        infoInput.textContent = 'Error';
        arriveBtn.disabled = true;
        departBtn.disabled = true;
    }
  }

  function arrive() {
    infoInput.textContent = `Arriving at ${stop.next}`;
    arriveBtn.disabled = true;
    departBtn.disabled = false;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
