// Récupération de l'élément du DOM qui accueillera les projets
const gallery = document.querySelector(".gallery")
// Récupération de l'élément du DOM qui accueillera les boutons filtres
const filters = document.getElementById("filter-container")


// Récuperation dynamique des projets avec l'API
async function fetchWorks() {
    try {
        const getData = await fetch("http://localhost:5678/api/works");
        return getData.json();
    } catch (error) {
        console.error("Impossible de contacter le serveur");
    }
}

// Affichage dynamique des projets
function displayWorks() {
    const gallery = document.querySelector(".gallery")
    gallery.innerHTML = ""
    fetchWorks()
    .then((data) => {
        data.forEach((work) => {
            createWorks(work)
        })
    })
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


displayWorks();
displayCategories();
filterCategories();

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





// Affichage de la Première modale au click sur modifier ou mode Edition
function displayModals() {
    const modify = document.getElementById("modify-gallery");
    const edit = document.getElementById("edition-mode");
    const modal = document.getElementById("modify-container");
    modify.addEventListener("click", () => {
        modal.style.display = "flex";
    })
    edit.addEventListener("click", () => {
        modal.style.display = "flex";
    })
    /*
    modal.addEventListener("click", (e) => {
        if (e.target.idName = "modify-container") {
            modal.style.display = "none";
        }
    })*/
}
displayModals();

// Accès à la deuxieme partie de la modale au click de l'input "Ajouter une photo"
function displaySecondModal() {
    const addButton = document.getElementById("add");
    const modify = document.getElementById("modify-container");
    const addWorks = document.getElementById("edit-container");
    addButton.addEventListener("click", () => {
        modify.style.display = "none";
        addWorks.style.display = "flex";
    })
}
displaySecondModal();

// Retour à la Première Modale au click de la flèche
function BackToFirstModal() {
    const arrow = document.querySelector(".fa-arrow-left");
    const modify = document.getElementById("modify-container");
    const addWorks = document.getElementById("edit-container");
    arrow.addEventListener("click", () => {
        //Supréssion de la prewiew a clik sur retour dans la modale
        /*inputFile.value = "";
        previewImage.style.display = "none";*/
        modify.style.display = "flex";
        addWorks.style.display = "none";
    });
}
BackToFirstModal();

// Fermeture des modales au click de la croix
function closeModals() {
    const firstXmark = document.querySelector("#modify-container .fa-xmark");
    const SecondXmark = document.querySelector("#edit-container .fa-xmark");
    const deleteWorks = document.getElementById("modify-container");
    const addWorks = document.getElementById("edit-container");
    firstXmark.addEventListener("click", () => {
        deleteWorks.style.display = "none";
    })
    SecondXmark.addEventListener("click", () => {
        addWorks.style.display = "none";
    })
}
closeModals();


// Affichage dynamique des projets sur la premiere modale
function WorksModal() {
    gallery.innerHTML = ""
    fetchWorks()
    .then((works) => {
        works.forEach((work) => {
            createWorksModal(work);
        })
        deleteWorks()
    })
}
WorksModal();

function createWorksModal(work) {
    // Creation balise figure
    const figure = document.createElement("figure");
    // Creation des contenus projets
    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title
    // Création span
    const span = document.createElement("span");
    // Création icone poubelle
    const trash = document.createElement("i");
    trash.classList.add("fa-solid", "fa-trash-can");
    trash.id = work.id;
    // On rattache la balise figure à la div HandleWorks
    const gallery = document.querySelector("#handle-works");
    gallery.appendChild(figure);
    // On rattache l'image et le span à la balise figure
    figure.appendChild(img);
    figure.appendChild(span);
    // On rattache l'icone poubelle au span
    span.appendChild(trash);
}


// Suppréssion des projets dans la première modale et dans la gallery
function deleteWorks() {
    const token = window.sessionStorage.getItem("Token");
    console.log(token);
    const allTrash = document.querySelectorAll(".fa-trash-can")
    console.log(allTrash);
    allTrash.forEach(trash => {
        trash.addEventListener("click", (e) => {
            const id = trash.id
            const init = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: `*/*`,
                    "Content-Type": "application/json",
                }
            }
            fetch(`http://localhost:5678/api/works/${id}`, init)
                .then((response) => {
                    if (!response.ok) {
                        console.log("didn't work");
                    }
                    return response.json()                 
                })
                .then((data) => {
                    console.log("worked" + data);
                    WorksModal()
                    displayWorks()
                })
                
        })
    })
}





// Previsualisation de l'image dans la deuxieme modale
function previewImage() {
    const icon = document.querySelector("#add-image .fa-image")
    const label = document.querySelector("#add-image label")
    const input = document.querySelector("#add-image input")
    const img = document.querySelector("#add-image img")
    const p = document.querySelector("#add-image p")
    input.addEventListener("change", () => {
        const file = input.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = function (e) {
                img.src = e.target.result
                img.style.display = "flex"
                icon.style.display = "none"
                label.style.display = "none"
                p.style.display = "none"
            }
            reader.readAsDataURL(file)
        } else {
            img.style.display = "none"
        }
    })
}
previewImage()


// Gerer les categories dans l'input category de la deuxieme modale
async function fetchCategories() {
    try {
        const getData = await fetch("http://localhost:5678/api/categories");
        return await getData.json();
    } catch (error) {
        console.error("Impossible de contacter le serveur");
    }
}

async function categorySelect() {
    const select = document.querySelector("form select");
    const categorys = await fetchCategories();
    categorys.forEach((category) => {
        const option = document.createElement("option");
        option.textContent = category.name;
        option.value = category.id;
        select.appendChild(option);
    });
}
categorySelect()




// Post works



// Rajouter fonction size max img

// faire un fichier service.js avec les fetch 
// Postman pour m'entrainer au appel backend