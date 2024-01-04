import {createWork, createButtonCategory, createGalleryWork, handleFilter, log} from './functions.js'

let works = null
let categories = null
const gallery = document.querySelector(".gallery")

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





async function init() {
    works = await getWorks()
    categories = await getCategories()
    console.log(categories)

    
    console.log(works)
    createWork(works)
    createButtonCategory(categories)
    
    console.log(gallery)

    handleFilter(works)
    createGalleryWork(works)
    log()
}



init()



