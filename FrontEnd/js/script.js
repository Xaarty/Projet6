// script.js
import {log} from './api.js'
import {createWork, handleFilter, createGalleryWork, createButtonCategory} from './works.js'
import { imagePreview } from './imagePreview.js'

let works = null
let categories = null
const gallery = document.querySelector(".gallery")
const imageInput = document.getElementById("image")

// fonction pour récupérer les travaux existant depuis l'api

export async function getWorks() {
    const reponse = await fetch("http://localhost:5678/api/works")
    const work = await reponse.json()
    return work
}  

// fonction pour récupérer les catégories existantes depuis l'api

async function getCategories() {
    const reponse = await fetch("http://localhost:5678/api/categories")
    const category = await reponse.json()
    return category
}

// fonction qui lance le fonctionnement des scripts

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

imageInput.addEventListener("change", imagePreview)

