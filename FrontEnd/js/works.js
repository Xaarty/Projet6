// works.js
import { getWorks } from "./script.js"
import {modaleAddDisplay, modaleDeleteDisplay} from "./modales.js"
import { deleteExistingImage } from "./imagePreview.js"
const gallery = document.querySelector(".gallery")
const modaleGallery = document.getElementById("gallery_photo")
const portfolio = document.getElementById("portfolio")
const listSubmit = document.getElementById("list")
const inputImgContent = document.getElementById("input_img_content")

// fonction asynchrone pour effacer les projets en communiquant avec l'api 
export async function handleDeletWork (deleteWork, storedToken) {
    try {
        const authorizationHeader = `Bearer ${storedToken}`;
        console.log('Authorization Header:', authorizationHeader);
        const response = await fetch(`http://localhost:5678/api/works/${deleteWork.dataset.id}`, {
            method: "DELETE",
            headers: {
                'accept': '*/*',
                'Authorization': `Bearer ${storedToken}`
            },
        });
        if (response.ok) {
            console.log("deleted")
            // supprime les photos dans les deux galleries grace à l'id
            const galleryFigureToRemove = document.querySelectorAll(`figure[data-id="${deleteWork.dataset.id}"]`)
            console.log(galleryFigureToRemove)
            galleryFigureToRemove.forEach((figure) => {
                figure.remove()
            })
            modaleDeleteDisplay()
        }else{
            console.error(`Failed to delete work. Server response: error.message`)
        }
    } 
    catch (error) {
        console.error("error during delete:", error.message)
    }
}


// fonction pour importer les travaux de "getWorks" dans la section portfolio 
export function createWork (works) {
    gallery.innerHTML=""
    works.forEach((work) => {

        let figure = document.createElement("figure")
        figure.dataset.id =`${work.id}`
        figure.innerHTML=`
            <img src="${work.imageUrl}" alt="${work.title}"/>
            <figcaption>${work.title}</figcaption>
        `
        
        gallery.appendChild(figure)
    })
}

// fonction pour filtrer les catégories des travaux et afficher ceux concerner 
export function handleFilter(works) {
    let sortingButtons = document.querySelectorAll(".sort_button")

    sortingButtons.forEach((sortButton) => {
        sortButton.addEventListener ("click", (event) => {
            if (event.button === 0) {
                // supprime la classe "selected" et l'ajoute à l'élément cliqué
                removeSelected(sortingButtons)
                sortButton.classList.add("button_selected")
                console.log(sortButton)
                // catégorie "tous"
                if (sortButton.dataset.id == 0) {
                    createWork(works)
                } else {
                    // filtre les travaux à afficher en conparant leur id à id du bouton selectionné
                    const filterWorks = works.filter((work) => work.categoryId == sortButton.dataset.id)
                    console.log(filterWorks)
                    createWork(filterWorks)
                }
            }
        });
    })
}

// fonction pour enlever la classe "button_selected"
function removeSelected (sortingButtons) {
    sortingButtons.forEach(sortButton => {
        sortButton.classList.remove("button_selected")
    })
}

// fonction pour générer les travaux existant dans la partie gallerie de la modaledelete
export function createGalleryWork (works) {
    modaleGallery.innerHTML=""
    works.forEach((work) => {
        let figure = document.createElement("figure")
        figure.dataset.id = `${work.id}`
        figure.classList.add("delete_work_photo")
        figure.innerHTML=`
            <img src="${work.imageUrl}" alt="${work.title}"/>
            <button class="delete_work" data-id="${work.id}">
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="11" viewBox="0 0 9 11" fill="none">
                    <path d="M2.71607 0.35558C2.82455 0.136607 3.04754 0 3.29063 0H5.70938C5.95246 0 6.17545 0.136607 6.28393 0.35558L6.42857 0.642857H8.35714C8.71272 0.642857 9 0.930134 9 1.28571C9 1.64129 8.71272 1.92857 8.35714 1.92857H0.642857C0.287277 1.92857 0 1.64129 0 1.28571C0 0.930134 0.287277 0.642857 0.642857 0.642857H2.57143L2.71607 0.35558ZM0.642857 2.57143H8.35714V9C8.35714 9.70915 7.78058 10.2857 7.07143 10.2857H1.92857C1.21942 10.2857 0.642857 9.70915 0.642857 9V2.57143ZM2.57143 3.85714C2.39464 3.85714 2.25 4.00179 2.25 4.17857V8.67857C2.25 8.85536 2.39464 9 2.57143 9C2.74821 9 2.89286 8.85536 2.89286 8.67857V4.17857C2.89286 4.00179 2.74821 3.85714 2.57143 3.85714ZM4.5 3.85714C4.32321 3.85714 4.17857 4.00179 4.17857 4.17857V8.67857C4.17857 8.85536 4.32321 9 4.5 9C4.67679 9 4.82143 8.85536 4.82143 8.67857V4.17857C4.82143 4.00179 4.67679 3.85714 4.5 3.85714ZM6.42857 3.85714C6.25179 3.85714 6.10714 4.00179 6.10714 4.17857V8.67857C6.10714 8.85536 6.25179 9 6.42857 9C6.60536 9 6.75 8.85536 6.75 8.67857V4.17857C6.75 4.00179 6.60536 3.85714 6.42857 3.85714Z" fill="white"/>
                </svg>
            </button>
        `
        modaleGallery.appendChild(figure)
    })
}

// fonction asynchrone qui communique avec l'api pour envoyer un nouveau travail
export async function sendWork (formData, storedToken, form) {
    try {
        const authorizationHeader = `Bearer ${storedToken}`
        console.log('Authorization Header:', authorizationHeader)
        const response = await fetch(`http://localhost:5678/api/works`, {
            method: "POST",
            headers: {
                'accept': 'application/json',
                'Authorization' : `Bearer ${storedToken}`,
            },
            body: formData,
        });
        console.log(response)
        if (response.ok) {
            console.log("added")
            // récupère tout les travaux avec le nouveau et les réintegre
            let works = await getWorks()
            createWork(works, gallery)
            createGalleryWork(works, modaleGallery)

            // ferme la modale et efface la prévisualisation d'image
            modaleAddDisplay()
            form.reset()
            deleteExistingImage()
            inputImgContent.style.display = "grid"
        }else{
            console.error(`Failed to add work. Server response:`, error.message)
        }
    } 
    catch (error) {
        console.error("error during add:", error.message)
    }
}

// fonction pour créer les boutons de tri de catégories des travaux dans les deux galleries
export function createButtonCategory(categories) {
    // assure la création de la div qui va contenir les boutons de tri et les places avant la gallerie
    let sortingButtons = document.createElement("div")
    sortingButtons.id = "sorting_buttons"
    portfolio.insertBefore(sortingButtons, gallery)  

    // créer le bouton pour afficher tout les travaux
    let allButton = document.createElement("button")
    allButton.classList.add("sort_button")
    allButton.dataset.id = "0"
    allButton.innerHTML = "<p>Tous</p>"
    if (allButton.dataset.id === "0") {
        allButton.classList.add("button_selected")
    }
    sortingButtons.appendChild(allButton)

    // créer l'option vide dans la liste du form pour submit un travail 
    let categorySubmitZero = document.createElement("option")
    categorySubmitZero.value= ""
    listSubmit.appendChild(categorySubmitZero)    

    // boucle sur les catégories existantes
    categories.forEach((category) => {
        // créer les boutons de catégories dans la div de bouton de tri
        let sortButton = document.createElement("button")
        sortButton.classList.add("sort_button")
        sortButton.dataset.id = `${category.id}`
        sortButton.innerHTML=`
            <p>${category.name}<p/>
        `
        sortingButtons.appendChild(sortButton)

        // créer les options dans la liste du form pour submit un travail
        let categorySubmit = document.createElement("option")
        categorySubmit.value=`${category.id}`
        categorySubmit.innerHTML=`${category.name}`

        listSubmit.appendChild(categorySubmit)
    })
}