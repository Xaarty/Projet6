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
async function getIds() {
    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error('Identifiants invalides');
        }

        const id = await response.json();
        console.log(id);

        // Tu peux retourner id ici si tu veux l'utiliser ailleurs
        // return id;
    } catch (error) {
        console.error('Erreur lors de la connexion:', error.message);
    }
}

const submitButton = document.getElementById("submit_button");

submitButton.addEventListener("click", async (event) => {
    if (event.button === 0) {
        try {
            const id = await getIds();
            console.log(id);
        } catch (error) {
            console.error('Erreur lors de la connexion:', error.message);
        }
    }
});