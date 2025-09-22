let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");

let mood = "create";
let tmp;
let searchMode = "title";

let dataPro = localStorage.product ? JSON.parse(localStorage.product) : [];

function getTotal() {
  if (price.value !== "") {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
  } else {
    total.innerHTML = "0";
  }
}

price.oninput = getTotal;
taxes.oninput = getTotal;
ads.oninput = getTotal;
discount.oninput = getTotal;

submit.onclick = function () {

  let countValue = parseInt(count.value);

  let newPro = {
    title: title.value.trim().toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: ((+price.value + +taxes.value + +ads.value) - +discount.value),
    category: category.value.trim().toLowerCase(),
    count: countValue,
  };

  if (newPro.title && newPro.price && newPro.category) {
    if (mood === "create") {
      dataPro.push(newPro);
    } else {
      dataPro[tmp] = newPro;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "inline";
    }
    localStorage.setItem("product", JSON.stringify(dataPro));
    clearData();
    showData();
  }
};

function showData() {
  let table = "";

  for (let i = 0; i < dataPro.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td>${dataPro[i].count}</td>
        <td><button onclick="updateData(${i})">Update</button></td>
        <td><button onclick="deleteData(${i})">Delete</button></td>
      </tr>
    `;
  }

  document.getElementById("tbody").innerHTML = table;

  if (dataPro.length > 0) {
    document.getElementById("deleteAll").innerHTML =
      `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`;
  } else {
    document.getElementById("deleteAll").innerHTML = "";
  }
}

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "0";
  count.value = "";
  category.value = "";
}

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(dataPro));
  showData();
}

function deleteAll() {
  dataPro = [];
  localStorage.removeItem("product");
  showData();
}

function updateData(i) {
  let pro = dataPro[i];
  title.value = pro.title;
  price.value = pro.price;
  taxes.value = pro.taxes;
  ads.value = pro.ads;
  discount.value = pro.discount;
  getTotal();
  count.style.display = "none";
  category.value = pro.category;
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({ top: 0, behavior: "smooth" });
}

function setSearchMode(mode) {
  searchMode = mode;
  search.placeholder = "Search by " + mode;
  search.focus();
  search.value = "";
  showData();
}

search.oninput = function () {
  let table = "";
  let val = search.value.toLowerCase();

  for (let i = 0; i < dataPro.length; i++) {
    if (searchMode === "title" && dataPro[i].title.includes(val)) {
      table += rowHTML(i);
    } else if (searchMode === "category" && dataPro[i].category.includes(val)) {
      table += rowHTML(i);
    }
  }

  document.getElementById("tbody").innerHTML = table;
};

function rowHTML(i) {
  return `
    <tr>
      <td>${i + 1}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].category}</td>
      <td>${dataPro[i].count}</td>
      <td><button onclick="updateData(${i})">Update</button></td>
      <td><button onclick="deleteData(${i})">Delete</button></td>
    </tr>
  `;
}

showData();