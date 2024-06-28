// GESTION DES MODALES
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
}

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


// Previsualisation de l'image dans la deuxieme modale
function previewImage() {
    const icon = document.querySelector("#add-image .fa-image");
    const label = document.querySelector("#add-image label");
    const input = document.querySelector("#add-image input");
    const img = document.querySelector("#add-image img");
    const p = document.querySelector("#add-image p");
    input.addEventListener("change", () => {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                img.src = e.target.result;
                img.style.display = "flex";
                icon.style.display = "none";
                label.style.display = "none";
                p.style.display = "none";
            }
            reader.readAsDataURL(file);
            console.log(file);
        } else {
            img.style.display = "none";
        }
    })
}

// Gerer les categories dans l'input category de la deuxieme modale
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


// Suppréssion des projets dans la première modale et dans la gallery
function deleteWorks() {
    const token = window.sessionStorage.getItem("Token");
    const allTrash = document.querySelectorAll(".fa-trash-can");
    allTrash.forEach(trash => {
        trash.addEventListener("click", (e) => {
            const id = trash.id;
            const init = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
            fetch(`http://localhost:5678/api/works/${id}`, init)
                .then((result) => result.text())
                .then((response) => {
                    console.log("La suppression a abouti:" + response);
                    worksModal()
                    displayWorks()
                })
                .catch((error) => console.error(error)

                )

        })
    })
}

// Affichage dynamique des projets sur la premiere modale
async function worksModal() {
    const modalGallery = document.getElementById("handle-works");
    modalGallery.innerHTML = "";
    const fetch = await fetchWorks();
    fetch.forEach(work => {
        const figure = document.createElement("figure");
        // Creation des contenus projets
        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;
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
    })
    deleteWorks()
}


// Post works
function postWorks() {
    const form = document.getElementById("edit-form");
    const token = window.sessionStorage.getItem("Token");
    form.addEventListener("submit", (e) => {
        e.preventDefault()
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            const fileInput = document.querySelector("#file");
            const title = document.getElementById("form-title");
            const category = document.getElementById("form-category");
            const formdata = new FormData();
            formdata.append("image", fileInput.files[0]);
            formdata.append("title", title.value);
            formdata.append("category", category.value);
            
            const requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: formdata,
              redirect: "follow"
            };
            
            fetch("http://localhost:5678/api/works", requestOptions)
              .then((response) => response.text())
              .then((result) => {
                console.log(result);
                displayWorks();
                worksModal();
            })
              .catch((error) => console.error(error));
        })
}



function mainModalFunction() {
    displayModals();
    displaySecondModal();
    BackToFirstModal();
    closeModals();
    previewImage();
    categorySelect();
    worksModal();
    postWorks();
}
mainModalFunction();