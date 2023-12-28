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




const loggedIn = localStorage.getItem('loggedIn')
console.log(loggedIn)
const userId = localStorage.getItem('userId')
console.log(userId)
const storedtoken = localStorage.getItem('token')
console.log(storedtoken)

let logs = document.getElementById("logs")

if (loggedIn === "true") {
    logs.innerHTML = "logout"

    logs.addEventListener(("click"), (event) => {
        if (event.button === 0) {
            event.preventDefault()
            localStorage.setItem('loggedIn', 'false')
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            window.location.href='index.html'  
        }
    })
}