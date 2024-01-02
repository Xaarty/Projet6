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
        figure.innerHTML=`
            <img src="${work.imageUrl}" alt="${work.title}"/>
            <figcaption>${work.title}<figcaption/>
        `
        gallery.appendChild(figure)
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
    }else{
        modale.remove()
    }
}
