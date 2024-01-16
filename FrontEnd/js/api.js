
import { handleDeletWork, sendWork } from "./works.js"
import { imagePreview } from "./imagePreview.js"
import { modalesDisplay, modaleDeleteDisplay } from "./modales.js"


const portfolioTitleGroup = document.getElementById("portfolio_title_group")
const logs = document.getElementById("logs")
const modaleDelete = document.querySelector(".modale_delete")
const modaleAdd = document.querySelector(".modale_add")
const modaleDisplayButton = document.querySelectorAll(".modale_display_button")
const inputImg = document.getElementById("input_img")
const inputImgContent = document.getElementById("input_img_content")
const submitButton = document.getElementById("submit")







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
        buttonOpenModale.classList.add("toggle_modale")
        buttonOpenModale.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.5229 1.68576L13.8939 2.05679C14.1821 2.34503 14.1821 2.81113 13.8939 3.0963L13.0016 3.99169L11.5879 2.57808L12.4803 1.68576C12.7685 1.39751 13.2346 1.39751 13.5198 1.68576H13.5229ZM6.43332 7.73578L10.5484 3.61759L11.9621 5.03121L7.84387 9.14633C7.75494 9.23525 7.64455 9.29964 7.52496 9.33337L5.73111 9.84546L6.2432 8.05162C6.27693 7.93203 6.34133 7.82164 6.43025 7.73271L6.43332 7.73578ZM11.4408 0.646245L5.39074 6.6932C5.12397 6.95998 4.93078 7.28808 4.82959 7.64685L3.9526 10.7133C3.879 10.9708 3.94953 11.2468 4.13965 11.4369C4.32977 11.627 4.60574 11.6976 4.86332 11.624L7.92973 10.747C8.29156 10.6427 8.61967 10.4495 8.88338 10.1858L14.9334 4.13888C15.7951 3.27722 15.7951 1.87894 14.9334 1.01728L14.5624 0.646245C13.7007 -0.215415 12.3024 -0.215415 11.4408 0.646245ZM2.69844 1.84214C1.20816 1.84214 0 3.05031 0 4.54058V12.8812C0 14.3715 1.20816 15.5796 2.69844 15.5796H11.0391C12.5293 15.5796 13.7375 14.3715 13.7375 12.8812V9.44683C13.7375 9.039 13.4094 8.71089 13.0016 8.71089C12.5937 8.71089 12.2656 9.039 12.2656 9.44683V12.8812C12.2656 13.5589 11.7167 14.1078 11.0391 14.1078H2.69844C2.02076 14.1078 1.47188 13.5589 1.47188 12.8812V4.54058C1.47188 3.86291 2.02076 3.31402 2.69844 3.31402H6.13281C6.54065 3.31402 6.86875 2.98591 6.86875 2.57808C6.86875 2.17025 6.54065 1.84214 6.13281 1.84214H2.69844Z" fill="black"/>
            </svg>
            <p>modifier</p>
        `
        portfolioTitleGroup.appendChild(buttonOpenModale)
        portfolioTitleGroup.style.marginBottom = "92px"

        // gère la fermeture de la modale   
        const toggleButton = document.querySelectorAll(".toggle_modale")
        console.log(toggleButton)
        toggleButton.forEach((button) => {
            button.addEventListener("click", (event) => {
                if (event.button === 0) {
                    modaleDeleteDisplay()
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
                    modalesDisplay();
                }
            });
        });

        // fonction pour l'envoie de nouveaux projets
        const formContents = document.querySelectorAll(".form_content")
        const elementArray = [false, false, false]
        formContents.forEach((el, id) => {
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
        console.log(formContents)
        const form = document.getElementById("form")

        form.addEventListener("submit", (event) => {
            event.preventDefault()
            const formData = new FormData(form)
            

            sendWork(formData, storedToken, form)
        })

    // gère le cas ou on n'est pas loggin, enleve l'acces aux modales
    }else{
        modaleDelete.remove()
        overlay.remove()
    }
}










