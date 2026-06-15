const loginButton = document.getElementById("login-button");

if (loginButton) {
    loginButton.addEventListener("click", function () {
        window.location.href = "login.html";
    });
}

const enterButton = document.getElementById("enter-button");

if (enterButton) {
    enterButton.addEventListener("click", function () {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email !== "" && password !== "") {
            window.location.href = "dashboard.html";

        } else {
            alert("Complete todos los campos");
        }
    });
}

const logoutButton = document.getElementById("logout-button");

if (logoutButton) {
    logoutButton.addEventListener("click", function () {
        window.location.href = "index.html";
    });
}

const catalogButton = document.getElementById("catalog-button");

if (catalogButton) {
    catalogButton.addEventListener("click", function () {
        window.location.href = "catalogo.html";
    });
}

const librosDefault = [
    {
        titulo: "Clean Code",
        autor: "Robert C. Martin",
        disponible: true
    },
    {
        titulo: "1984",
        autor: "George Orwell",
        disponible: false
    },
    {
        titulo: "Dune",
        autor: "Frank Herbert",
        disponible: true
    }
];

let libros = JSON.parse(localStorage.getItem("libros"));

if (!libros) {
    libros = librosDefault;
}

const booksContainer = document.getElementById("books-container");

function renderBooks(listaLibros) {
    if (!booksContainer) return;

    booksContainer.innerHTML = "";

    listaLibros.forEach(function (libro) {
        const card = document.createElement("div");
        card.classList.add("book-card");

        let estado = "Prestado";
        let textoBoton = "Solicitar préstamo";

        if (libro.disponible) {
            estado = "Disponible";
        } else {
            textoBoton = "Devolver";
        }

        card.innerHTML = `
            <h2>${libro.titulo}</h2>
            <p>Autor: ${libro.autor}</p>
            <p>Estado: ${estado}</p>
            <button>${textoBoton}</button>
        `;

        const button = card.querySelector("button");

        button.addEventListener("click", function () {
            libro.disponible = !libro.disponible;

            localStorage.setItem("libros", JSON.stringify(libros));

            renderBooks(listaLibros);
        });

        booksContainer.appendChild(card);
    });
}

if (booksContainer) {
    renderBooks(libros);
}


const backButton = document.getElementById("back-dashboard");

if (backButton) {
    backButton.addEventListener("click", function () {
        window.location.href = "dashboard.html";
    });
}

const resetButton = document.getElementById("reset-books");

if (resetButton) {
    resetButton.addEventListener("click", function () {
        localStorage.removeItem("libros");
        location.reload();
    });
}

const searchInput = document.getElementById("search-input");

if (searchInput) {
    searchInput.addEventListener("input", function () {
        const textoBusqueda = searchInput.value.toLowerCase();

        const librosFiltrados = libros.filter(function (libro) {
            return libro.titulo.toLowerCase().includes(textoBusqueda);
        });

        renderBooks(librosFiltrados);
    });
}