function updateValues() {
  let resistivity = parseFloat(document.getElementById("resistivity").value);
  let length = parseFloat(document.getElementById("length").value);
  let area = parseFloat(document.getElementById("area").value);

  document.getElementById("resistivity-value").textContent =
    resistivity.toFixed(2);
  document.getElementById("length-value").textContent = length.toFixed(2);
  document.getElementById("area-value").textContent = area.toFixed(2);

  let resistance = (resistivity * length) / area;
  document.getElementById("resistance-value").textContent =
    resistance.toFixed(3);

  let newWidth = length * 20;
  let newHeight = area * 5;
  document.getElementById("conductor").style.width = newWidth + "px";
  document.getElementById("conductor").style.height = newHeight + "px";

  updateDots(resistivity);
}

function updateDots(resistivity) {
  let conductor = document.getElementById("conductor");
  conductor.innerHTML = ""; // Clear previous dots
  let dotCount = Math.floor(resistivity * 100); // More resistivity, more dots

  for (let i = 0; i < dotCount; i++) {
    let dot = document.createElement("div");
    dot.className = "dot";
    dot.style.top = Math.random() * (conductor.offsetHeight - 6) + "px";
    dot.style.left = Math.random() * (conductor.offsetWidth - 6) + "px";
    conductor.appendChild(dot);
  }
}

// Initialize values on load
window.onload = updateValues;
