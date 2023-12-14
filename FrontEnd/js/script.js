import {test} from './test.js'


let works = null

async function getWorks() {
    const reponse = await fetch("http://localhost:5678/api/works")
    const films = await reponse.json()
    return films
}  

let gallery = document.querySelector(".gallery")

async function init() {
    works = await getWorks()
    test()
    
    console.log(works)

    works.forEach((work, i) => {

        let figure = document.createElement("figure")
        gallery.appendChild(figure)

        let imgGallery = document.createElement("img")
        imgGallery.src = `${works[i].imageUrl}`
        imgGallery.alt = `${works[i].title}`
        figure.appendChild(imgGallery)

        let figCaption = document.createElement("figcaption")
        figCaption.innerHTML = works[i].title
        figure.appendChild(figCaption)
        
    });

    console.log(gallery)
}

init()



console.log(gallery)
