function getLogged() {
    const logInfo = {
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
                email: logInfo.email.value,
                password: logInfo.password.value,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.message || data.error) {
                    const error = document.getElementById("error-login")
                    error.textContent = "Erreur dans l\'identifiant ou le mot de passe."

                } else {
                    sessionStorage.setItem("Token", data.token);
                    window.location.replace("index.html");
                }
            })
    })
}
getLogged();


/*
function getLogged() {
    const logInfo = {
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
                email: logInfo.email.value,
                password: logInfo.password.value,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.message || data.error) {
                    alert("Erreur dans l\'identifiant ou le mot de passe");
                } else {
                    sessionStorage.setItem("Token", data.token);
                    window.location.replace("index.html");
                }
            })
    })
}
getLogged();*/
