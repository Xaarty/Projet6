import {test} from './test.js'


let works = null
let figures = null

async function getWorks() {
    const reponse = await fetch("http://localhost:5678/api/works")
    const films = await reponse.json()
    return films
}  

const gallery = document.querySelector(".gallery")
let category = 0

async function init() {
    works = await getWorks()
    test()
    
    console.log(works)

    works.forEach((work, i) => {

        let figure = document.createElement("figure")
        gallery.appendChild(figure)
        let imgCategory = works[i].categoryId
        figure.classList.add(imgCategory)

        let imgGallery = document.createElement("img")
        imgGallery.src = `${works[i].imageUrl}`
        imgGallery.alt = `${works[i].title}`
        figure.appendChild(imgGallery)

        let figCaption = document.createElement("figcaption")
        figCaption.innerHTML = works[i].title
        figure.appendChild(figCaption)
    });
    figures = document.querySelectorAll(".gallery figure")
    console.log(figures)
    
    console.log(category)
    console.log(gallery)

    handleFigures()
}

function handleFigures() {
    console.log(figures)

    let sortingButtons = document.querySelectorAll(".sort_button")

    function removeSelected () {
	    sortingButtons.forEach(sortButton => {
		    sortButton.classList.remove("button_selected")
	    })
    }

    sortingButtons.forEach((sortButton) => {
        sortButton.addEventListener ("click", (event) => {
            if (event.button === 0) {
                removeSelected()
                sortButton.classList.add("button_selected")
                console.log(sortButton)

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
                })
            }
        });
    })
}

init()

