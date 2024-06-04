// Récupération de l'élément du DOM qui accueillera les projets
const gallery = document.querySelector(".gallery")



// Récuperation dynamique des projets avec l'API
async function fetchWorks () {
    try {
    const getData = await fetch("http://localhost:5678/api/works");
    return await getData.json();
    } catch (error) {
        console.error("Impossible de contacter le serveur");
    }
}

// Affichage dynamique des projets
async function displayWorks () {
    const works = await fetchWorks();
    works.forEach(work => {
        // Creation balise figure
        const figureElement = document.createElement("figure");
        // Creation des contenus projets
        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        const titreElement = document.createElement("figcaption");
        titreElement.innerText = work.title;
        // On rattache la balise figure à la div Gallery
        gallery.appendChild(figureElement);
        // On rattache l'image et le titre à la balise figure
        figureElement.appendChild(imageElement);
        figureElement.appendChild(titreElement);
    });
}
displayWorks()     
// creer deux methodes : fetch et generer gallery pour le works et categories.








// creer un autre fichier au cas ou besoin d'import
// faire un fichier service.jss pour les appels fetch API par exemple

