// modaleAdd.js
const modaleDelete = document.querySelector(".modale_delete")
const modaleAdd = document.querySelector(".modale_add")
const overlay = document.getElementById("overlay")
const inputImg = document.getElementById("input_img")
const inputImgContent = document.getElementById("input_img_content")
const modaleDisplayButton = document.querySelectorAll(".modale_display_button")

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

// gère la fermeture des modales   
export function handleModaleClosure() {
    const toggleButton = document.querySelectorAll(".toggle_modale")
    console.log(toggleButton)
    toggleButton.forEach((button) => {
        button.addEventListener("click", (event) => {
            if (event.button === 0) {
                modaleDeleteDisplay()

                // gère le cas ou une image est selectionnée lors de la fermeture de la modale, permet de l'éffacer
                if (modaleAdd.classList.contains("display_modale")) {
                    if (inputImg.querySelector("img")) {
                        inputImgContent.style.display = "grid"
                        let imgToRemove = inputImg.querySelector("img")
                        imgToRemove.remove()
                    }
                    modalesDisplay()
                }
            } 
        });
    })
}

// change de modale au clic
export function modaleChange () {
    modaleDisplayButton.forEach((button) => {
       button.addEventListener("click", (event) => {
           if (event.button === 0) {
               modalesDisplay();
           }
       });
   });
}