// console.log("hello");

const loadCategories = () => {
  const url = "https://fakestoreapi.com/products/categories";
  fetch(url)
    .then((res) => res.json())
    .then((categories) => displayCategories(categories));
};

const displayCategories = (categories) => {
  console.log(categories);

  const categoriesContainer = document.getElementById("categories-container");
  categoriesContainer.innerHTML = "";

  for (let category of categories) {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button class="btn btn-outline">${category}</button>
    `;
    categoriesContainer.append(btnDiv);
  }
};

loadCategories();
