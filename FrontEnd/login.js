/*
// Variables globales pour le login
const form = document.querySelector("form")
const email = document.getElementById("email")
const password = document.getElementById("password")
const messageError = document.querySelector("#login p")




async function fetchLogin() {
    try {
        const reponse = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Accept": "application.json",
                "Content-type": "application.json"
            },
            body : JSON.stringify()
        });
        const postData = await reponse.json();
    } catch (error) {
        console.error("Impossible de contacter le serveur");
    }
}



async function login() {
    const users = await fetchLogin();
    console.log(users);
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const userEmail = email.value;
        const userPwd = password.value;
        console.log(userEmail, userPwd);

    })
}
login()

console.log("Hello Worlds");
*/

// si je lance la fonction le serveur plante

// l'element html email 


const element = {
    password: document.getElementById("password"),
    email: document.getElementById("email"),
    submit: document.getElementById("connect"),
   
};


addEventListener("submit", (e) => {
    e.preventDefault();

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
        email: element.email.value,
        password: element.password.value,
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if (data.message || data.error) {
                alert("Erreur dans l\'identifiant ou le mot de passe");
            } else {
                //sessionStorage.setItem("isConnected", JSON.stringify(true));//
                sessionStorage.setItem("Token", data.token);
                window.location.replace("index.html");
            }
        })
});

// possibilite de changer le texte sur le bouton login au lieur de rajouter un logout