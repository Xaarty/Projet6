// login.js
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const loginForm = document.getElementById("login_form")

// fonction asynchrone qui envoie identifiant et mot de passe et retourne l'id utilisateur, userIDs et token
async function getIds(email, password) {
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
        throw Error ('Erreur dans l’identifiant ou le mot de passe')
    }
    const ids = await response.json()
    return ids
}

// fonction qui gère le processus de login, conserve dans le local storage les information utilisateur et renvoie qur la page d'acceuil
async function login() {
    const email = emailInput.value
    const password = passwordInput.value
    console.log(email)
    console.log(password)

    try {
        const id = await getIds(email, password)
        console.log(id);
        localStorage.setItem('loggedIn', 'true')
        localStorage.setItem('userId', id.userId)
        localStorage.setItem('token', id.token)
        window.location.href='index.html'
    } catch (error) {
        console.error('Erreur lors de la connexion:', error.message);
        // affiche le message d'erreur à l'emplacement ou l'utilisateur doit saisir son mot de passe avec du visuel
        passwordInput.placeholder = 'Erreur dans l’identifiant ou le mot de passe'
        passwordInput.value = ''
        passwordInput.style.border = "1px solid red"  
    }
}


// enleve le visuel d'erreur lors de la saisie d'un mot de passe 
passwordInput.addEventListener("click", (event) => {
    if (event.button === 0) {
        passwordInput.style.border = 'none'
    }
})

// fonction qui gère la soumission du formulaire de login
loginForm.addEventListener("submit", async (event) => {
    // évite le refresh de page 
    event.preventDefault();  
    console.log("Formulaire soumis");
    login();
});
