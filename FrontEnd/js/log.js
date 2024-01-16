

console.log("fichier chargé")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const loginForm = document.getElementById("login_form")


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

async function log() {
    const email = emailInput.value;
    const password = passwordInput.value
    console.log(email)
    console.log(password)

    try {
        const id = await getIds(email, password);
        console.log(id);
        localStorage.setItem('loggedIn', 'true')
        localStorage.setItem('userId', id.userId)
        localStorage.setItem('token', id.token)
        window.location.href='index.html'
    } catch (error) {
        console.error('Erreur lors de la connexion:', error.message);
        passwordInput.placeholder = 'Erreur dans l’identifiant ou le mot de passe'
        passwordInput.value = ''
        passwordInput.style.border = "1px solid red"  
    }
}



passwordInput.addEventListener("click", (event) => {
    if (event.button === 0) {
        passwordInput.style.border = 'none'
    }
})

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Formulaire soumis");
    log();
});
