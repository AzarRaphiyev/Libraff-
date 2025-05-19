import { getAllBooks, getAllCategs, updateBook } from "./service.js";

const langBar = document.getElementById("langBar");
const subCategory = document.getElementById("subCategory");
const sub2Category = document.getElementById("sub2Category");
const categs = document.getElementById("categs");
const userBar = document.getElementById("userBar");
const categIcon = document.getElementById("categIcon");
const categIcon2 = document.getElementById("categIcon2");
const cataloqModal = document.getElementById("cataloqModal");
const userBarMobile = document.getElementById("userBarMobile");
const cartMenu = document.getElementById("cartMenu");
const enCoxAxtarilanKitablar = document.getElementById(
  "enCoxAxtarilanKitablar"
);

let category = [];
let books = [];
let subcateg = [];
let sub2categ = [];
async function getData() {
  category = await getAllCategs();
  books = await getAllBooks();

  printcategs();
  printbooks();
  printTopViewedBooks();
  printBestseller();
}
getData();
function printcategs() {
  categs.innerHTML = ``;
  subCategory.innerHTML = ``;
  sub2Category.innerHTML = ``;
  category.forEach((element) => {
    categs.innerHTML += `<li onmouseover="openSubCateg('${element.category}')" class="hover:text-red-600 flex justify-between cursor-pointer"> <span>${element.category}</span> <span>›</span></li>`;
  });
}

function printbooks() {
  enCoxAxtarilanKitablar.innerHTML = ``;

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // id-ə görə en böyüklərdən kiçiyə doğru sıralama
  const sortedBooks = books.sort((a, b) => b.id - a.id);

  // İlk 12 kitabı seçirik
  const limitedBooks = sortedBooks.slice(0, 12);

  limitedBooks.forEach((book) => {
    const card = document.createElement("div");
    card.className = "card";

    const isFavorite = favorites.some((item) => item.id == book.id);

    card.innerHTML = `
      <div id="heart-${book.id}" class="card-heart" onclick="likeBtn(${
      book.id
    })" style="color: ${isFavorite ? "red" : "white"}">&#10084;</div>
      
      <img onclick="handleView(${book.id},${book.view})" src="${
      book.img
    }" class="cursor-pointer" alt="${book.name}" />
      
      <div class="card-body">
        <h3 class="card-title">${book.name}</h3>
        <div class="card-author">${book.author}</div>
        <div class="card-price">${book.price} AZN</div>
      </div>
    `;

    enCoxAxtarilanKitablar.appendChild(card);
  });
}

function printTopViewedBooks() {
  encoxbaxila.innerHTML = ``;

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // view sayına görə azalan sıraya düz və ilk 6 kitabı seç
  const topBooks = [...books].sort((a, b) => b.view - a.view).slice(0, 6);

  topBooks.forEach((book) => {
    const card = document.createElement("div");
    card.className = "card";

    const isFavorite = favorites.some((item) => item.id == book.id);

    card.innerHTML = `
      <div id="heart-${book.id}" class="card-heart" onclick="likeBtn(${
      book.id
    })" style="color: ${isFavorite ? "red" : "white"}">&#10084;</div>

      <img onclick="handleView(${book.id},${book.view})" src="${
      book.img
    }" class="cursor-pointer" alt="${book.name}" />

      <div class="card-body">
        <h3 class="card-title">${book.name}</h3>
        <div class="card-author">${book.author}</div>
        <div class="card-price">${book.price} AZN</div>
      </div>
    `;

    encoxbaxila.appendChild(card);
  });
}
function printBestseller() {
  encoxsatilankitablar.innerHTML = ``;
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Kitabları sales dəyərinə görə çoxdan aza sırala
  books.sort((a, b) => b.sales - a.sales);

  books.forEach((book) => {
    const card = document.createElement("div");
    card.className = "card";

    const isFavorite = favorites.some((item) => item.id == book.id);

    card.innerHTML = `
    <div id="heart-${book.id}" class="card-heart" onclick="likeBtn(${
      book.id
    })" style="color: ${isFavorite ? "red" : "white"}">&#10084;</div>
    
    <img onclick="handleView(${book.id},${book.view})" src="${
      book.img
    }" class="cursor-pointer" alt="${book.name}" />
    
    <div class="card-body">
      <h3 class="card-title">${book.name}</h3>
      <div class="card-author">${book.author}</div>
      <div class="card-price">${book.price} AZN</div>
    </div>
  `;

    encoxsatilankitablar.appendChild(card);
  });
}

window.likeBtn = (id) => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const isFavorite = favorites.some((item) => item.id == id);

  if (isFavorite) {
    favorites = favorites.filter((item) => item.id != id);
    showToast("Kitab wishlist-dən silindi", "warning");
  } else {
    const item = books.find((book) => book.id == id);
    if (item) {
      favorites.push(item);
      showToast("Kitab wishlist-ə əlavə olundu", "success");
    }
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  printbooks();
};
function showToast(message, icon = "success") {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: icon,
    title: message,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
}

function printSubcateg() {
  subCategory.innerHTML = ``;
  sub2Category.innerHTML = ``;
  subcateg.forEach((element) => {
    subCategory.innerHTML += `<li onmouseover="openSub2Categ('${element.name}')" class="hover:text-red-600 justify-between flex cursor-pointer"><a href="">
    <span>${element.name}</span> </a><span>›</span></li>`;
  });
}
function printSub2categ() {
  sub2Category.innerHTML = ``;
  sub2categ.forEach((element) => {
    sub2Category.innerHTML += `<li  class="hover:text-red-600 cursor-pointer">${element.name}</li>`;
  });
}
window.openSubCateg = (x) => {
  console.log(x);

  let foundItem = category.find((item) => item.category === x);
  subcateg = foundItem ? foundItem.subcategories : null;

  printSubcateg();
};
window.openSub2Categ = (x) => {
  console.log(x);

  let foundItem = subcateg.find((item) => item.name === x);
  sub2categ = foundItem ? foundItem.subcategories : [];

  console.log(sub2categ);
  printSub2categ();
};

window.showLanbBar = () => {
  langBar.classList.toggle("block");
  langBar.classList.toggle("hidden");
};
window.showUserBar = () => {
  userBar.classList.toggle("block");
  userBar.classList.toggle("hidden");
};
window.sebet = () => {
  cartMenu.classList.toggle("block");
  cartMenu.classList.toggle("hidden");
};

window.openCategModal = () => {
  categIcon.classList.toggle("hidden");
  categIcon.classList.toggle("flex");
  categIcon2.classList.toggle("flex");
  categIcon2.classList.toggle("hidden");
  cataloqModal.classList.toggle("flex");
  cataloqModal.classList.toggle("hidden");
};

window.handleView = async (id, x) => {
  let book = books.find((item) => id == item.id);
  book.view = x + 1;
  await updateBook(book, id);
  console.log(book.view);

  window.location.href = `detail.htm?id=${id}`;
};

// Kampaniyanın bitiş vaxtını 14 gün 17 saat 3 dəqiqə 36 saniyə sonrasına təyin edirik
const now = new Date();
const endTime = new Date(
  now.getTime() +
    15 * 24 * 60 * 60 * 1000 + // gün
    17 * 60 * 60 * 1000 + // saat
    11 * 60 * 1000 + // dəqiqə
    33 * 1000 // saniyə (test üçün 10 saniyə)
);

function updateTimer() {
  const now = new Date();
  const diff = endTime - now;

  if (diff <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    // Sayğacı və düymələri gizlət
    document.querySelector(".timer").style.display = "none";
    document.querySelector(".button-container").style.display = "none";
    document.querySelector("h2").textContent = "Kampaniya başa çatdı";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(
    2,
    "0"
  );
  document.getElementById("seconds").textContent = String(seconds).padStart(
    2,
    "0"
  );
}

setInterval(updateTimer, 1000);
updateTimer();
