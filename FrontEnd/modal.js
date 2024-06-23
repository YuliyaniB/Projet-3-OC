// Affichage de la modale modify au click
function displayModify () {
    const modify = document.getElementById("modify-gallery");
    const edit = document.getElementById("edition-mode")
    const modal = document.getElementById("modify-container");
    const xmark = document.querySelector("#modify-container .fa-xmark");
    modify.addEventListener("click", () => {
        modal.style.display = "flex";
    })
    edit.addEventListener("click", () => {
        modal.style.display = "flex";
    })
    xmark.addEventListener("click", () => {
        modal.style.display = "none";
    })
    /*
    modal.addEventListener("click", (e) => {
        if (e.target.idName = "modify-container") {
            modal.style.display = "none";
        }
    })*/
}
displayModify()



/*
// Affichage de la modale edit au click
function displayEdit () {
    const edit = document.getElementById("edition-mode")
    const modal = document.getElementById("edit-container")
    const xmark = document.querySelector("#edit-container .fa-xmark")
    const arrow = document.querySelector("#edit-container .fa-arrow-left")
    edit.addEventListener("click", () => {
        modal.style.display = "flex";
    })
    xmark.addEventListener("click", () => {
        modal.style.display = "none"
    })
    // Fleche ?
    /* Necessaire ?
    modal.addEventListener("click", (e) => {
        if (e.target.idName = "edit-container") {
            modal.style.display = "none"
        }
    })
}
displayEdit()
*/

// Modify modal
// Récuperation dynamique des projets avec l'API pour la modale
async function fetchWorks() {
    try {
        const getData = await fetch("http://localhost:5678/api/works");
        return await getData.json();
    } catch (error) {
        console.error("Impossible de contacter le serveur");
    }
}

// Affichage dynamique des projets sur la modale
async function displayWorksModal() {
    gallery.innerHTML = ""
    const works = await fetchWorks();
    works.forEach(work => {
    // Creation balise figure
    const figure = document.createElement("figure");
    // Creation des contenus projets
    const img = document.createElement("img");
    img.src = work.imageUrl;
    // Création span
    const span = document.createElement("span")
    // Création icone poubelle
    const trash = document.createElement("i")
    trash.classList.add("fa-solid", "fa-trash-can")
    trash.id = work.id
    // On rattache la balise figure à la div HandleWorks
    const gallery = document.querySelector("#handle-works")
    gallery.appendChild(figure);
    // On rattache l'image et le span à la balise figure
    figure.appendChild(img);
    figure.appendChild(span)
    // On rattache l'icone poubelle au span
    span.appendChild(trash)
    });
    deleteWorks()
}
displayWorksModal();

// Suppréssion des projets dans la modale
function deleteWorks() {
    const allTrash = document.querySelectorAll("fa-trash-can")
    allTrash.forEach( trash => {
        trash.addEventListener("click", (e) => {
            const id = trash.id
            const init = {
                method: "DELETE",
                headers: {"content-Type":"application/json"} ,
            }
            fetch("http://localhost:5678/api/works/1" + id + init)
            .then((response) => {
                if (!response.ok) {
                    console.error("Erreur")
                }
                return response.json()
            })
            .then((data) => {
                console.log("Tout est ok");
                displayWorksModal()
            })
        })
    })
}
