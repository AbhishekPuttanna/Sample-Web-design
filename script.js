let designs = [];
let currentPage = 1;
const itemsPerPage = 20;

async function loadData() {
    const res = await fetch('data/designs.json');
    designs = await res.json();
    displayPage(1);
}

function displayPage(page) {
    currentPage = page;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    designs.slice(start, end).forEach(d => {
        gallery.innerHTML += `
            <div class="card">
                <img src="${d.image}" loading="lazy">
                <p>${d.name}</p>
            </div>
        `;
    });

    setupPagination();
}

function setupPagination() {
    const totalPages = Math.ceil(designs.length / itemsPerPage);
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        pagination.innerHTML += `<button onclick="displayPage(${i})">${i}</button>`;
    }
}

document.getElementById("search").addEventListener("input", e => {
    const term = e.target.value.toLowerCase();
    const filtered = designs.filter(d => d.name.toLowerCase().includes(term));

    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";

    filtered.forEach(d => {
        gallery.innerHTML += `
            <div class="card">
                <img src="${d.image}" loading="lazy">
                <p>${d.name}</p>
            </div>
        `;
    });
});

loadData();
