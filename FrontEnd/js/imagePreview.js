const inputImgContent = document.getElementById("input_img_content")
const inputImg = document.getElementById("input_img")

// fonction qui gère la prévisualisation des images
export function imagePreview(event) {
    
    deleteExistingImage()

    if (event.target.files[0] === undefined) {
        inputImgContent.style.display = "grid"
        return
    } 
    console.log("File selected:", event.target.files[0]);
    let imageDownloaded = URL.createObjectURL(event.target.files[0]); // prend l'url de l'image sélectionné par l'utilisateur
    let newImage = document.createElement("img");
    newImage.src = imageDownloaded;
    newImage.classList.add("image_preview")
    inputImg.appendChild(newImage);
    inputImgContent.style.display = "none"
}



// fonction qui efface l'image précédente si l'utilisateur veut en mettre une autre sans fermer la modale
export function deleteExistingImage() {
    const existingImage = inputImg.querySelector('.image_preview');
    if (existingImage) {
        existingImage.remove();
    }
}