
// Function to show the loading overlay
function showLoadingOverlay() {

    // Generate a unique ID for the loading overlay

    // Create the loading overlay HTML markup with the unique ID
    const loadingOverlayHTML = `
    <div class="loadingOverlay loadingOverlay2" style = "display:block;background-color: rgba(0, 0, 0, 0.03)">
        <div class = "loadingIcon loadingText">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
            </svg>
        </div>
    </div>
    `;

    const overlayContainer = document.createElement('div');
    overlayContainer.innerHTML = loadingOverlayHTML;
    document.body.appendChild(overlayContainer.firstElementChild);
}


// Function to hide the loading overlay and remove it from the DOM
function hideLoadingOverlay() {
    const loadingOverlay = document.querySelector('.loadingOverlay2');
    if (loadingOverlay) {
        loadingOverlay.parentNode.removeChild(loadingOverlay);
    }
}

   function hideOverlay(){

        document.querySelector('.modal-wrapper').style.display = "none";
        
        document.querySelector('.ymm-modal').style.display = "none"
        
        document.body.classList.remove("my-grage-active")
        
        if(document.querySelector('#cb-garage-btn'))document.querySelector('#cb-garage-btn').checked = false

    }


    function displayOverlay(){

        document.querySelector('.modal-wrapper').style.display = "block";
        document.body.classList.add("my-grage-active")
        // document.body.addEventListener('click' , () => hideOverlay());
        
        document.querySelector('.ymm-modal').style.display = "block"

    }