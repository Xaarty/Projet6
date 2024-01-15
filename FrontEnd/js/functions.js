import { getWorks } from "./script.js"

const gallery = document.querySelector(".gallery")
const portfolio = document.getElementById("portfolio")
const portfolioTitleGroup = document.getElementById("portfolio_title_group")
const logs = document.getElementById("logs")
const modaleDelete = document.querySelector(".modale_delete")
const modaleAdd = document.querySelector(".modale_add")
const portfolioH2 = document.querySelector("#portfolio h2")
const modaleGallery = document.getElementById("gallery_photo")
const modaleDisplayButton = document.querySelectorAll(".modale_display_button")
const inputImg = document.getElementById("input_img")
const imageInput = document.getElementById("image");
const inputImgContent = document.getElementById("input_img_content")
const listSubmit = document.getElementById("list")
const submitButton = document.getElementById("submit")
// fonction asynchrone pour effacer les projets 

async function handleDeletWork (deleteWork, storedToken) {
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
            const galleryFigureToRemove = document.querySelectorAll(`figure[data-id="${deleteWork.dataset.id}"]`)
            console.log(galleryFigureToRemove)
            galleryFigureToRemove.forEach((figure) => {
                figure.remove()
            })
            modaleDeleteDisplay()
        }else{
            console.error("Failed to delete work. Server response: ${errorText}")
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
                removeSelected(sortingButtons)
                sortButton.classList.add("button_selected")
                console.log(sortButton)
                if (sortButton.dataset.id == 0) {
                    createWork(works)
                } else {
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

// fonction pour créer les boutons de tri de catégories des travaux

export function createButtonCategory(categories) {
    let sortingButtons = document.createElement("div")
    sortingButtons.id = "sorting_buttons"
    portfolio.insertBefore(sortingButtons, gallery)

    let allButton = document.createElement("button")
    allButton.classList.add("sort_button")
    allButton.dataset.id = "0"
    allButton.innerHTML = "<p>Tous</p>"
    if (allButton.dataset.id === "0") {
        allButton.classList.add("button_selected")
    }
    sortingButtons.appendChild(allButton)

    let categorySubmitZero = document.createElement("option")
    categorySubmitZero.value= ""
    listSubmit.appendChild(categorySubmitZero)    

    categories.forEach((category) => {
        let sortButton = document.createElement("button")
        sortButton.classList.add("sort_button")
        sortButton.dataset.id = `${category.id}`
        sortButton.innerHTML=`
            <p>${category.name}<p/>
        `
        sortingButtons.appendChild(sortButton)

        let categorySubmit = document.createElement("option")
        categorySubmit.value=`${category.id}`
        categorySubmit.innerHTML=`${category.name}`

        listSubmit.appendChild(categorySubmit)
    })
}

// fonction qui gère la connexion de la cliente à son compte pour pouvoir gérer ses travaux

export function log () {
    const loggedIn = localStorage.getItem('loggedIn')
    console.log(loggedIn)
    const userId = localStorage.getItem('userId')
    console.log(userId)
    const storedToken = localStorage.getItem('token')
    console.log(storedToken)

    const sortingButtons = document.getElementById("sorting_buttons")

    // gère le cas ou la cliente est loggin, enleve le tri de catégories, met à la place un bouton pour ouvrir la modale

    if (loggedIn === "true") {
        logs.innerHTML = "logout"
        sortingButtons.remove()
        let buttonOpenModale = document.createElement("button")
        buttonOpenModale.id = "button_open_modale"
        buttonOpenModale.classList.add("toogle_modale")
        buttonOpenModale.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.5229 1.68576L13.8939 2.05679C14.1821 2.34503 14.1821 2.81113 13.8939 3.0963L13.0016 3.99169L11.5879 2.57808L12.4803 1.68576C12.7685 1.39751 13.2346 1.39751 13.5198 1.68576H13.5229ZM6.43332 7.73578L10.5484 3.61759L11.9621 5.03121L7.84387 9.14633C7.75494 9.23525 7.64455 9.29964 7.52496 9.33337L5.73111 9.84546L6.2432 8.05162C6.27693 7.93203 6.34133 7.82164 6.43025 7.73271L6.43332 7.73578ZM11.4408 0.646245L5.39074 6.6932C5.12397 6.95998 4.93078 7.28808 4.82959 7.64685L3.9526 10.7133C3.879 10.9708 3.94953 11.2468 4.13965 11.4369C4.32977 11.627 4.60574 11.6976 4.86332 11.624L7.92973 10.747C8.29156 10.6427 8.61967 10.4495 8.88338 10.1858L14.9334 4.13888C15.7951 3.27722 15.7951 1.87894 14.9334 1.01728L14.5624 0.646245C13.7007 -0.215415 12.3024 -0.215415 11.4408 0.646245ZM2.69844 1.84214C1.20816 1.84214 0 3.05031 0 4.54058V12.8812C0 14.3715 1.20816 15.5796 2.69844 15.5796H11.0391C12.5293 15.5796 13.7375 14.3715 13.7375 12.8812V9.44683C13.7375 9.039 13.4094 8.71089 13.0016 8.71089C12.5937 8.71089 12.2656 9.039 12.2656 9.44683V12.8812C12.2656 13.5589 11.7167 14.1078 11.0391 14.1078H2.69844C2.02076 14.1078 1.47188 13.5589 1.47188 12.8812V4.54058C1.47188 3.86291 2.02076 3.31402 2.69844 3.31402H6.13281C6.54065 3.31402 6.86875 2.98591 6.86875 2.57808C6.86875 2.17025 6.54065 1.84214 6.13281 1.84214H2.69844Z" fill="black"/>
            </svg>
            <p>modifier</p>
        `
        portfolioTitleGroup.appendChild(buttonOpenModale)
        portfolioTitleGroup.style.marginBottom = "92px"

        // gère la fermeture de la modale   
        const toogleButton = document.querySelectorAll(".toogle_modale")
        console.log(toogleButton)
        toogleButton.forEach((button) => {
            button.addEventListener("click", (event) => {
                if (event.button === 0) {
                    modaleDeleteDisplay()
                    if (modaleAdd.classList.contains("display_modale")) {
                        if (inputImg.querySelector("img")) {
                            inputImgContent.style.display = "grid"
                            let imgToRemove = inputImg.querySelector("img")
                            imgToRemove.remove()
                        }
                        modaleAddDisplay()
                    }
                } 
            });
        })
        
        // gère le logout
        logs.addEventListener(("click"), (event) => {
            if (event.button === 0) {
                event.preventDefault()
                localStorage.setItem('loggedIn', 'false')
                localStorage.removeItem('token')
                localStorage.removeItem('userId')
                window.location.href='index.html'  
            }
        })

        // gère la suppression de travaux au clic
        const deleteWorks = document.querySelectorAll(".delete_work")
        console.log(deleteWorks)

        deleteWorks.forEach((deleteWork) => {
            deleteWork.addEventListener(("click"), (event) => {
                if (event.button === 0) {
                    handleDeletWork(deleteWork, storedToken)
                }
            })
        })
        
        // change de modale au clic
        modaleDisplayButton.forEach((button) => {
            button.addEventListener("click", (event) => {
                if (event.button === 0) {
                    modaleAddDisplay();
                }
            });
        });

        // fonction pour l'envoie de nouveaux projets
        const formContent = document.querySelectorAll(".form_content")
        const elementArray = [false, false, false]
        formContent.forEach((el, id) => {
            el.addEventListener("input", () => {
                if (el.value === "") {
                    elementArray[id] = false
                }else{
                    elementArray[id] = true
                }
                const falseList = elementArray.filter((el)=> el === false)
                console.log(falseList)
                if (falseList.length === 0) {
                    submitButton.disabled = false
                    submitButton.style.background = "#1D6154"
                    console.log("tout les éléments sont valide")
                }else{
                    submitButton.disabled = true
                    submitButton.style.background = "#A7A7A7"
                }
            })
        }) 
        console.log(formContent)
        const formWork = document.getElementById("form")

        formWork.addEventListener("submit", (event) => {
            event.preventDefault()
            const formData = new FormData(formWork)
            

            sendWork(formData, storedToken, formWork)
        })


    // // Add an event listener for the form submission
    // form.addEventListener("submit", async (event) => {
    //     // Prevent the default form submission
    //     event.preventDefault();

    //     // Create a FormData object from the form
    //     const formData = new FormData(form);

    //     // Check if the FormData is empty
    //     if (formData.has("image") || formData.has("title") || formData.has("list")) {
    //         // The FormData is not empty, proceed with the API request
    //         console.log("not empty")
    //         const storedToken = localStorage.getItem('token');
    //         await sendWork(formData, storedToken);
    //     } else {
    //         // The FormData is empty, display an error or take appropriate action
    //         console.error("FormData is empty. Please fill out the form before submitting.");
    //     }
    // });



    // gère le cas ou on n'est pas loggin, enleve l'acces aux modales
    }else{
        modaleDelete.remove()
        overlay.remove()
    }
}

// fonction qui gère la prévisualisation des images

function imagePreview(event) {
    console.log("File selected:", event.target.files[0]);

    let imageDownloaded = URL.createObjectURL(event.target.files[0]);
    let newImage = document.createElement("img");
    newImage.src = imageDownloaded;
    newImage.classList.add("image_preview")
    inputImg.appendChild(newImage);
    inputImgContent.style.display = "none"
}

imageInput.addEventListener("change", imagePreview);



function modaleDeleteDisplay () {
    modaleDelete.classList.toggle("display_modale")
    overlay.classList.toggle("display_overlay")
}

function modaleAddDisplay () {
    modaleDelete.classList.toggle("display_modale")
    modaleAdd.classList.toggle("display_modale")
}

function modaleAddClose () {
    modaleAdd.classList.toggle("display_modale")
    overlay.classList.toggle("display_overlay")
}

async function sendWork (formData, storedToken, formWork) {
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
            let works = await getWorks()
            createWork(works, gallery)
            createGalleryWork(works, modaleGallery)
            modaleAddClose()
            formWork.reset()
            const previewImage = document.querySelector(".image_preview")
            previewImage.remove()
            inputImgContent.style.display = "grid"
        }else{
            console.error(`Failed to add work. Server response: ${ErrorEvent}`)
        }
    } 
    catch (error) {
        console.error("error during add:", error.message)
    }
}

