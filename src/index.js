// index.js

// Callbacks
const handleClick = (ramen) => {
  const detailImage = document.querySelector(".detail-image");
  const detailName = document.querySelector(".name");
  const detailRestaurant = document.querySelector(".restaurant");
  const ratingDisplay = document.getElementById("rating-display");
  const commentDisplay = document.getElementById("comment-display");

  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
};

const addSubmitListener = () => {
  const form = document.getElementById("new-ramen");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const newRamen = {
      name: form["new-name"].value,
      restaurant: form["new-restaurant"].value,
      image: form["new-image"].value,
      rating: form["new-rating"].value,
      comment: form["new-comment"].value,
    };

    addRamenToMenu(newRamen);
    form.reset();
  });
};

const displayRamens = () => {
  fetch("http://localhost:3000/ramens")
    .then((response) => response.json())
    .then((ramens) => {
      const ramenMenu = document.getElementById("ramen-menu");
      ramens.forEach((ramen) => {
        const img = document.createElement("img");
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener("click", () => handleClick(ramen));
        ramenMenu.appendChild(img);
      });
      // Display the first ramen by default
      if (ramens.length > 0) handleClick(ramens[0]);
    })
    .catch((error) => console.error("Error fetching ramens:", error));
};

const main = () => {
  displayRamens();
  addSubmitListener();
};

// Add a new ramen to the #ramen-menu div
const addRamenToMenu = (ramen) => {
  const ramenMenu = document.getElementById("ramen-menu");
  const img = document.createElement("img");
  img.src = ramen.image;
  img.alt = ramen.name;
  img.addEventListener("click", () => handleClick(ramen));
  ramenMenu.appendChild(img);
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
