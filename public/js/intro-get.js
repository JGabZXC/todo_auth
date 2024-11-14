"use strict";
const labelTextRotation = document.querySelector(".text-rotation");

let counter = 0;

fetch("http://localhost:3000/intro")
  .then((data) => data.json())
  .then((response) => {
    labelTextRotation.textContent = response.data;

    function updateContent() {
      fetch("http://localhost:3000/intro")
        .then((data) => data.json())
        .then((response) => {
          if (labelTextRotation.textContent !== response.data) {
            labelTextRotation.classList.remove("fade-in", "fade-out");
            labelTextRotation.classList.add("fade-out");

            setTimeout(() => {
              labelTextRotation.textContent = response.data;

              labelTextRotation.classList.remove("fade-out");
              labelTextRotation.classList.add("fade-in");

              console.log("Content updated and fade-in applied!");
            }, 500);
          } else {
            console.log("No content change, skipping fade transition.");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      setTimeout(updateContent, 5000);
    }

    updateContent();
  });
