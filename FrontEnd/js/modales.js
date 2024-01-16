// modaleAdd.js
const modaleDelete = document.querySelector(".modale_delete")
const modaleAdd = document.querySelector(".modale_add")
const overlay = document.getElementById("overlay")

// gère l'affichage de la modale de suppression de travaux

export function modaleDeleteDisplay () {
    modaleDelete.classList.toggle("display_modale")
    overlay.classList.toggle("display_overlay")
}

// gère le changement entre la modale de suppression de travaux et celle d'ajout de travaux

export function modalesDisplay () {
    modaleDelete.classList.toggle("display_modale")
    modaleAdd.classList.toggle("display_modale")
}

// gère l'affichage de la modale d'ajout de travaux

export function modaleAddDisplay () {
    modaleAdd.classList.toggle("display_modale")
    overlay.classList.toggle("display_overlay")
}