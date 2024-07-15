// GESTION DES MODALES
// Set-up de la Première modale au click sur modifier ou mode Edition
function setUpModal() {
    const modifyButton = document.getElementById("modify-gallery");
    const editButton = document.getElementById("edition-mode");
    const modal = document.getElementById("modal-container");
    const deleteWorks = document.getElementById("delete-modal");
    const firstXmark = document.querySelector("#delete-modal .fa-xmark");
    const addButton = document.getElementById("add");
    const addWorks = document.getElementById("add-modal");    
    // Affichage modale au click sur Modifier
    modifyButton.addEventListener("click", () => {
        modal.style.display = "flex";
        deleteWorks.style.display = "flex";
        addWorks.style.display = "none";
    })
    // Affichage modale au click sur Edition
    editButton.addEventListener("click", () => {
        modal.style.display = "flex";
        deleteWorks.style.display = "flex";
        addWorks.style.display = "none";
    })
    // Fermeture modale au click sur la croix
    firstXmark.addEventListener("click", () => {
        modal.style.display = "none";
    })
    // Fermeture modale au click sur l'exterieur de la modale
    modal.addEventListener("click", (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    })
    // Accès à la seconde modale au click sur "Ajouter une photo"
    addButton.addEventListener("click", () => {
        deleteWorks.style.display = "none";
        addWorks.style.display = "flex";
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

// Suppréssion des projets (au click sur icone poubelle) dans la première modale et dans la gallery
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
                    worksModal();
                    displayWorks();
                })
                .catch((error) => console.error(error)
                )
        })
    })
}

// Set-up de la deuxieme partie de la modale
function setUpSecondModal() {
    const modal = document.getElementById("modal-container");
    const deleteWorks = document.getElementById("delete-modal");
    const addWorks = document.getElementById("add-modal");
    const SecondXmark = document.querySelector("#add-modal .fa-xmark");
    const arrow = document.querySelector(".fa-arrow-left");
    const form = document.getElementById("edit-form");
    const img = document.getElementById("img-form");
    // Fermeture modale au click sur la croix
    SecondXmark.addEventListener("click", () => {
        img.style.display = "none";
        modal.style.display = "none";
        form.reset();
    })
    // Fermeture modale au click sur l'exterieur de la modale
    modal.addEventListener("click", (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
            img.style.display = "none";
            form.reset();
        }
    })
    // Retour sur première modale au click sur la fleche
    arrow.addEventListener("click", () => {
        deleteWorks.style.display = "flex";
        addWorks.style.display = "none";
        img.style.display = "none";
        form.reset();
    });
}

// Previsualisation de l'image dans la deuxieme modale
function previewImage() {
    const input = document.querySelector("#add-image input");
    const img = document.querySelector("#add-image img");
    input.addEventListener("change", () => {
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                img.src = event.target.result;
                img.style.display = "flex";
            }
            reader.readAsDataURL(file);
        } else {
            img.style.display = "none";
        }
    })
}

// Gerer les categories dans l'input category de la deuxieme modale
async function categorySelect() {
    const select = document.querySelector("form select");
    const categorys = await fetchCategories();
    const optionVide = document.createElement("option");
    select.appendChild(optionVide);
    categorys.forEach((category) => {
        const option = document.createElement("option");
        option.textContent = category.name;
        option.value = category.id;
        select.appendChild(option);
    });
}

// Post works
function postWorks() {
    const form = document.getElementById("edit-form");
    const fileInput = document.getElementById("file");
    const title = document.getElementById("form-title");
    const category = document.getElementById("form-category");
    const modal = document.getElementById("modal-container");
    const addWorks = document.getElementById("add-modal");
    const deleteWorks = document.getElementById("delete-modal");
    const preview = document.getElementById("img-form");
    const token = window.sessionStorage.getItem("Token");
    const submit = document.getElementById("submit-img");
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        const formdata = new FormData();
        formdata.append("image", fileInput.files[0]);
        formdata.append("title", title.value);
        formdata.append("category", category.value);

        const fetchInfo = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
        };

        fetch("http://localhost:5678/api/works", fetchInfo)
            .then((response) => response.text())
            .then((result) => {
                displayWorks();
                worksModal();
                modal.style.display = "none";
                addWorks.style.display = "none";
                deleteWorks.style.display = "none";
                preview.style.display = "none";
                form.reset();
                submit.style.backgroundColor = "#A7A7A7";   
            })
            .catch((error) => console.error(error));
    })
}

// Verification de la completion du formulaire
function validateForm() {
    const form = document.getElementById("edit-form");
    const image = document.getElementById("file");
    const title = document.getElementById("form-title");
    const category = document.getElementById("form-category");
    const submit = document.getElementById("submit-img")
    // Change l'input de couleur si les 3 champs sont remplis
    form.addEventListener("input", () => {
        if (!image.files[0] == "" && !title.value == "" && !category.value == "") {
            submit.style.backgroundColor = "#1D6154";
          }
    })
}

function mainModalFunction() {
    setUpModal();
    worksModal();
    setUpSecondModal();
    previewImage();
    categorySelect();  
    postWorks();
    validateForm();
}
mainModalFunction();