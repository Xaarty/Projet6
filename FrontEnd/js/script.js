import {test} from './test.js'


let works = null
let categories = null

async function getWorks() {
    const reponse = await fetch("http://localhost:5678/api/works")
    const work = await reponse.json()
    return work
}  

async function getCategories() {
    const reponse = await fetch("http://localhost:5678/api/categories")
    const category = await reponse.json()
    return category
}

const gallery = document.querySelector(".gallery")
const portfolio = document.getElementById("portfolio")

const logs = document.getElementById("logs")
const modale = document.querySelector(".modale")
const portfolioH2 = document.querySelector("#portfolio h2")

async function init() {
    works = await getWorks()
    categories = await getCategories()
    console.log(categories)
    test()
    
    console.log(works)
    createWork(works)
    createButtonCategory(categories)
        /*
        let imgCategory = works[i].categoryId
        figure.classList.add(imgCategory)
        figure.setAttribute('data-id', imgCategory)

        let imgGallery = document.createElement("img")
        imgGallery.src = `${works[i].imageUrl}`
        imgGallery.alt = `${works[i].title}`
        figure.appendChild(imgGallery)

        let figCaption = document.createElement("figcaption")
        figCaption.innerHTML = works[i].title
        figure.appendChild(figCaption)
        */

    
    
    
    console.log(gallery)

    handleFilter()
    createGalleryWork(works)
    log()
}

function handleFilter() {
    

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
                /*
                figures.forEach( figure => {
                    figure.classList.remove("show_element", "hide_element")
                    let figureCategory = figure.classList.value
                    let buttonClasses = Array.from(sortButton.classList)

                    if (buttonClasses.includes("0")) {
                        figure.classList.add("show_element")
                    }

                    if (buttonClasses.some((buttonClasses) => figureCategory.includes(buttonClasses))) {
                        figure.classList.add("show_element")
                    } else {
                        figure.classList.add("hide_element")
                    }
                })*/
            }
        });
    })
}

init()

function createWork (works) {
    gallery.innerHTML=""
    works.forEach((work) => {

        let figure = document.createElement("figure")
        //mentorat
        figure.dataset.id =`${work.id}`
        figure.innerHTML=`
            <img src="${work.imageUrl}" alt="${work.title}"/>
            <figcaption>${work.title}</figcaption>
        `
        
        gallery.appendChild(figure)
    })
}

const modaleGallery = document.getElementById("gallery_photo")

function createGalleryWork (works) {
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

function createButtonCategory(categories) {
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

    categories.forEach((category) => {
        let sortButton = document.createElement("button")
        sortButton.classList.add("sort_button")
        sortButton.dataset.id = `${category.id}`
        sortButton.innerHTML=`
            <p>${category.name}<p/>
        `
        sortingButtons.appendChild(sortButton)
    })
}

function removeSelected (sortingButtons) {
    sortingButtons.forEach(sortButton => {
        sortButton.classList.remove("button_selected")
    })
}






function log () {
    const loggedIn = localStorage.getItem('loggedIn')
    console.log(loggedIn)
    const userId = localStorage.getItem('userId')
    console.log(userId)
    const storedtoken = localStorage.getItem('token')
    console.log(storedtoken)

    const sortingButtons = document.getElementById("sorting_buttons")

    if (loggedIn === "true") {
        logs.innerHTML = "logout"
        sortingButtons.remove()
        let buttonOpenModale = document.createElement("button")
        buttonOpenModale.id = "button_open_modale"
        buttonOpenModale.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.5229 1.68576L13.8939 2.05679C14.1821 2.34503 14.1821 2.81113 13.8939 3.0963L13.0016 3.99169L11.5879 2.57808L12.4803 1.68576C12.7685 1.39751 13.2346 1.39751 13.5198 1.68576H13.5229ZM6.43332 7.73578L10.5484 3.61759L11.9621 5.03121L7.84387 9.14633C7.75494 9.23525 7.64455 9.29964 7.52496 9.33337L5.73111 9.84546L6.2432 8.05162C6.27693 7.93203 6.34133 7.82164 6.43025 7.73271L6.43332 7.73578ZM11.4408 0.646245L5.39074 6.6932C5.12397 6.95998 4.93078 7.28808 4.82959 7.64685L3.9526 10.7133C3.879 10.9708 3.94953 11.2468 4.13965 11.4369C4.32977 11.627 4.60574 11.6976 4.86332 11.624L7.92973 10.747C8.29156 10.6427 8.61967 10.4495 8.88338 10.1858L14.9334 4.13888C15.7951 3.27722 15.7951 1.87894 14.9334 1.01728L14.5624 0.646245C13.7007 -0.215415 12.3024 -0.215415 11.4408 0.646245ZM2.69844 1.84214C1.20816 1.84214 0 3.05031 0 4.54058V12.8812C0 14.3715 1.20816 15.5796 2.69844 15.5796H11.0391C12.5293 15.5796 13.7375 14.3715 13.7375 12.8812V9.44683C13.7375 9.039 13.4094 8.71089 13.0016 8.71089C12.5937 8.71089 12.2656 9.039 12.2656 9.44683V12.8812C12.2656 13.5589 11.7167 14.1078 11.0391 14.1078H2.69844C2.02076 14.1078 1.47188 13.5589 1.47188 12.8812V4.54058C1.47188 3.86291 2.02076 3.31402 2.69844 3.31402H6.13281C6.54065 3.31402 6.86875 2.98591 6.86875 2.57808C6.86875 2.17025 6.54065 1.84214 6.13281 1.84214H2.69844Z" fill="black"/>
            </svg>
            <p>modifier</p>
        `
        portfolio.appendChild(buttonOpenModale)
        portfolioH2.style.marginBottom = "92px"


        
        
        const buttonCloseModale = document.getElementById("button_close_modale")
        const overlay = document.getElementById("overlay")

        buttonOpenModale.addEventListener("click", (event) => {
            if (event.button === 0) {
                modale.style.display = "grid";
                overlay.style.display = "block"
            }   
        });


        buttonCloseModale.addEventListener("click", (event) => {
            if (event.button === 0) {
                modale.style.display = "none"
                overlay.style.display = "none"
            }
        })

        overlay.addEventListener(("click"), (event) => {
            if (event.button ===0) {
                modale.style.display = "none"
                overlay.style.display = "none"
            }
        })

        logs.addEventListener(("click"), (event) => {
            if (event.button === 0) {
                event.preventDefault()
                localStorage.setItem('loggedIn', 'false')
                localStorage.removeItem('token')
                localStorage.removeItem('userId')
                window.location.href='index.html'  
            }
        })

        const deleteWorks = document.querySelectorAll(".delete_work")
        console.log(deleteWorks)

        deleteWorks.forEach((deleteWork) => {
            deleteWork.addEventListener(("click"), (event) => {
                if (event.button === 0) {
                    handleDeletWork(deleteWork, storedtoken)
                }
            })
        })

    }else{
        modale.remove()
        overlay.remove()
    }
}

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
        }else{
            console.error("Failed to delete work. Server response: ${errorText}")
        }
    } 
    catch (error) {
        console.error("error during delete:", error.message)
    }
}
