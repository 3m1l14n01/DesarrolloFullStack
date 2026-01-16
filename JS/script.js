
const colorOriginal = "#f0f0f0"; 
let enRojo = false; 

document.addEventListener("click", function() {
  if (!enRojo) {

    document.body.style.backgroundColor = "#ff6666";
    enRojo = true;
  } else {
    document.body.style.backgroundColor = colorOriginal;
    enRojo = false;
  }
});
