// Récupération de l'élément du DOM qui accueillera les projets
const gallery = document.querySelector(".gallery")
// Récupération de l'élément du DOM qui accueillera les boutons filtres
const filters = document.getElementById("filter-container")


// Récuperation dynamique des projets avec l'API
async function fetchWorks() {
    try {
        const getData = await fetch("http://localhost:5678/api/works");
        return await getData.json();
    } catch (error) {
        console.error("Impossible de contacter le serveur");
    }
}

// Affichage dynamique des projets
async function displayWorks() {
    const works = await fetchWorks();
    works.forEach(work => {
        createWorks(work)
    });
}


function createWorks(work) {
    // Creation balise figure
    const figureElement = document.createElement("figure");
    // Creation des contenus projets
    const imageElement = document.createElement("img");
    imageElement.src = work.imageUrl;
    const titreElement = document.createElement("figcaption");
    titreElement.innerText = work.title;
    // On rattache la balise figure à la div Gallery
    const gallery = document.querySelector(".gallery")
    gallery.appendChild(figureElement);
    // On rattache l'image et le titre à la balise figure
    figureElement.appendChild(imageElement);
    figureElement.appendChild(titreElement);
}

// Récuperation dynamique des catégories avec l'API
async function fetchCategories() {
    try {
        const getData = await fetch("http://localhost:5678/api/categories");
        return await getData.json();
    } catch (error) {
        console.error("Impossible de contacter le serveur");
    }
}

// Affichage dynamique des catégories
async function displayCategories() {
    const categories = await fetchCategories();
    categories.unshift({ id: 0, name: "Tous" });
    categories.forEach((category) => {
        // Création des boutons filtres
        const filtresElement = document.createElement("button");
        filtresElement.textContent = category.name;
        filtresElement.id = category.id;
        // On rattache les balises button à la div filtres
        const filters = document.getElementById("filter-container")
        filters.appendChild(filtresElement);


    });

}

// creer une class selected/clicked pour le bouton tous


// Filtrer dynamiquement au click
async function filterCategories() {
    const filterWork = await fetchWorks()
    console.log(filterWork);
    const buttons = document.querySelectorAll("#filter-container button");
    buttons.forEach(button => {
        button.addEventListener("click", (e) => {
            btnId = e.target.id;
            gallery.innerHTML = "";
            if (btnId !== "0") {
                const sortWorks = filterWork.filter((work) => {
                    return work.categoryId == btnId;
                })
                sortWorks.forEach(work => {
                    createWorks(work)
                });
            } else {
                displayWorks()
            }
        })
    })
}




// creer un autre fichier au cas ou besoin d'import
// faire un fichier service.jss pour les appels fetch API par exemple

// mettre tout les appels à fonction en bas de page
// creer super fonction HOF en haut " init ui" => recupere les works avec les 3 fonctions 
//pour eviter les fetch api a chaque debut de fonction.
// Appeler l'API le moins possible

displayWorks();
displayCategories();
filterCategories();

/*
function loggedElements() {
    const login = document.getElementById("login-li")
    const filter = document.getElementById("filter-container")
    
    if (JSON.parse(sessionStorage.getItem("isConnected"))) {
        login.style.display = "none"
        filter.style.display = "none"
    } else {

    }
    }
loggedElements()


function logout() {
    const logout = document.getElementById("logout")
    logoutStatus.addEventListener("click", (event) => {
        event.preventDefault();
        sessionStorage.removeItem("Token");
        sessionStorage.removeItem("isConnected");
        window.location.replace("login.html");
    });    
}
logout()
*/


// Affichage de la page admin lorsque le user est connecté
function logged() {
    const user = window.sessionStorage.getItem("Token");
    const logout = document.getElementById("login-li");
    const filter = document.getElementById("filter-container");
    const edit = document.getElementById("edition-mode");
    const modify = document.getElementById("modify-gallery");
    if (user) {
        logout.textContent= "logout";
        filter.style.display = "none";
    } else {
        edit.style.display = "none";
        modify.style.display = "none";
    }
}
logged()

// Suppresion du token lors du click sur Logout et deconnexion
function logout() {
    const logout = document.getElementById("login-li")
    const user = window.sessionStorage.getItem("Token");
    logout.addEventListener("click", () => {
        if (user) {
            window.sessionStorage.setItem("Token", "");
            logout.textContent = "login";
            window.location.replace("index.html");
        } else {
            window.location.replace("login.html");
        }
    })
}
logout();