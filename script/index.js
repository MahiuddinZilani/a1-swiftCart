// console.log("hello");

const loadAllProducts = () => {
  const url = "https://fakestoreapi.com/products";
  fetch(url)
    .then((res) => res.json())
    .then((allProducts) => {
      displayCategoryProducts(allProducts);
      //   displayCategories();
    });
};

const loadCategories = () => {
  const url = "https://fakestoreapi.com/products/categories";
  fetch(url)
    .then((res) => res.json())
    .then((categories) => displayCategories(categories));
};

const removeActive = () => {
  const categoryButtons = document.querySelectorAll(".category-btn");
  categoryButtons.forEach((btn) => btn.classList.remove("active"));
};

const displayCategories = (categories) => {
  //   console.log(categories);

  const categoriesContainer = document.getElementById("categories-container");
  categoriesContainer.innerHTML = "";

  for (let category of categories) {
    // console.log(category);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id="category-btn-${category}" onclick="loadProductsCategory('${category}')" class="btn btn-outline category-btn">${category}</button>
    `;
    categoriesContainer.append(btnDiv);
  }
};

const loadProductsCategory = (category) => {
  const url = `https://fakestoreapi.com/products/category/${category}`;

  console.log(url);

  fetch(url)
    .then((res) => res.json())
    .then((products) => {
      removeActive();
      const clickBtn = document.getElementById(`category-btn-${category}`);
      console.log(clickBtn);
      clickBtn.classList.add("active");
      displayCategoryProducts(products);
    });
};

const displayCategoryProducts = (products) => {
  //   console.log(Array.isArray(products));
  const cardContainer = document.getElementById("cards-container");
  cardContainer.innerHTML = "";

  if (products.length === 0) {
    alert("item not found");
    return;
  }

  products.forEach((product) => {
    const ratingValue = product?.rating?.rate || 0;
    const roundedRating = Math.round(ratingValue * 2) / 2;
    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
      const checked = i <= roundedRating ? "checked" : "";
      const half = i - 0.5 === roundedRating ? "half" : "";

      starsHTML += `
        <input
          type="radio"
          name="rating-${product.id}"
          class="mask mask-star-2 bg-orange-400 ${half ? "mask-half-1" : ""} ${half ? "mask-half-2" : ""}"
          ${checked ? "checked" : ""}
          disabled
          aria-label="${i} star"
        />
      `;
    }

    const card = document.createElement("div");
    card.innerHTML = card.innerHTML = `
      <div class="card bg-base-100 shadow-sm h-full flex flex-col">
        <figure class="px-4 pt-4">
          <img
            src=${product?.image}
            alt=${product?.title}
            class="h-32 object-contain"
          />
        </figure>
        <div class="card-body flex flex-col p-4">
          <div class="flex justify-between items-center mb-2">
            <div class="badge badge-soft badge-primary text-xs truncate max-w-[100px]">${product.category}</div>
            <div class="rating rating-xs flex-shrink-0">${starsHTML}</div> 
          </div>
          
          <h2 class="card-title text-base font-bold line-clamp-1 mb-1">${product?.title}</h2>
          
          <p class="text-sm text-gray-600 line-clamp-2 mb-3 flex-grow">${product.description}</p>
          
          <div class="card-actions justify-between mt-auto pt-2">
            <button class="btn btn-soft btn-sm">Details</button>
            <button class="btn btn-primary btn-sm">Add</button>
          </div>
        </div>
      </div>
    `;
    cardContainer.append(card);
  });
};

loadCategories();
loadAllProducts();
