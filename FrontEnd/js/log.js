/*
async function getIds() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({email, password})
        })
        console.log(response)
        if (!response.ok) {
            throw new Error('Identifiants invalides');
        }
        const { userId, token, responseData } = await response.json();
        const { returnedEmail, returnedPassword } = responseData;
        console.log(userId, token, returnedEmail, returnedPassword)
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);
        localStorage.setItem('email', returnedEmail);
        localStorage.setItem('password', returnedPassword);

        window.location.href = "/dashboard";
    } catch (error) {
        console.error('Erreur lors de la connexion:', error.message);
    }
} */
/*
async function getIds() {
    const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({email, password})
    })
    const id = await response.json()
    return id
}
const submitButton = document.getElementById("submit_button")

submitButton.addEventListener ("click", (event) => {
    if (event.button === 0) {
        getIds()
    }
})*/

/*
console.log("fichier chargé")
async function getIds() {
    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({ email, password })
        });
        console.log(response.status)
        console.log(response)
        if (!response.ok) {
            throw new Error('Identifiants invalides');
        }

        const id = await response.json();
        console.log(id);

        
        return id;
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        throw error
    }
}

const loginForm = document.getElementById("login_form");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault()
    console.log("clic")
    
    try {
        const id = await getIds();
        console.log(id);
    } catch (error) {
        console.error('Erreur lors de la connexion:', error.message);
    }
    
});*/

console.log("fichier chargé");

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
    const ids = await response.json();
    return ids;
}

async function log() {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const email = emailInput.value;
    const password = passwordInput.value;
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
        passwordInput.style.border = '1px solid red'  
    }
}

const loginForm = document.getElementById("login_form");
const passwordInput = document.getElementById("password");

passwordInput.addEventListener("click", (event) => {
    if (event.button === 0) {
        passwordInput.style.border = 'none'
    }})

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Formulaire soumis");
    log();
});
/*
async function getIds() {
    try {
        console.log("Envoi de la requête...");
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Ajout du cookie ici
                "credentials": "include"
            },
            body: JSON.stringify({ email, password })
        });

        console.log("Statut de la réponse:", response.status);

        if (!response.ok) {
            throw new Error('Identifiants invalides');
        }

        const id = await response.json();
        console.log("Réponse JSON:", id);

        return id;
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        throw error;
    }
}

const loginForm = document.getElementById("login_form");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("Formulaire soumis");

    try {
        const id = await getIds();
        console.log("Identifiants récupérés:", id);
    } catch (error) {
        console.error('Erreur lors de la connexion:', error.message);
    }
});*/