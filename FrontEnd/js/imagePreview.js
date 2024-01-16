const imageInput = document.getElementById("image");
const inputImgContent = document.getElementById("input_img_content")
const inputImg = document.getElementById("input_img")
// fonction qui gère la prévisualisation des images

export function imagePreview(event) {
    const existingImage = inputImg.querySelector('.image_preview');

    if (existingImage) {
        existingImage.remove();
    }
    
    console.log("File selected:", event.target.files[0]);

    let imageDownloaded = URL.createObjectURL(event.target.files[0]);
    let newImage = document.createElement("img");
    newImage.src = imageDownloaded;
    newImage.classList.add("image_preview")
    inputImg.appendChild(newImage);
    inputImgContent.style.display = "none"
}

imageInput.addEventListener("change", imagePreview)