


/**********************************************************************************/



    function returnFitsMessage(message){

        return`

            <div class="verify-fitment verify-fitment_fitment_fit">
                <div class="verify-fitment_icon">
                    <svg class="cm_icon cm_icon-check" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                      <path id="circle-check-solid_fits" d="M20,40A20,20,0,1,0,0,20,20,20,0,0,0,20,40Zm8.828-23.672-10,10a1.867,1.867,0,0,1-2.648,0l-5-5a1.873,1.873,0,0,1,2.648-2.648L17.5,22.352l8.672-8.68A1.873,1.873,0,0,1,28.82,16.32Z" fill="#038c73"/>
                    </svg>
                </div>
                <div class="verify-fitment_fitment">
                    <div class="verify-fitment_title">FITS YOUR VEHICLE
                    </div>
                    <div class="fitment-message">
                        ${message}
                    </div>
                </div>
                <div class="verify-fitment_body">
                    <a class = "ymm-link" onclick = "displayYMMformFromBody()">Change Vehicle</a> 
                </div>
            </div>

        `

    }

    function returnDoesNotFitMessage(message){
        return`

            <div class="verify-fitment error-result">
                <div class="verify-fitment_icon">
                    <svg class="cm_icon cm_icon-times" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                      <path id="circle-xmark-solid_does_not_fit" d="M20,40A20,20,0,1,0,0,20,20,20,0,0,0,20,40ZM13.672,13.672a1.867,1.867,0,0,1,2.648,0l3.672,3.672,3.672-3.672a1.873,1.873,0,0,1,2.648,2.648l-3.672,3.672,3.672,3.672a1.873,1.873,0,0,1-2.648,2.648l-3.672-3.672L16.32,26.313a1.873,1.873,0,0,1-2.648-2.648l3.672-3.672L13.672,16.32A1.867,1.867,0,0,1,13.672,13.672Z" fill="#d24d55"/>
                    </svg>
                </div>
                <div class="verify-fitment_fitment">
                    <div class="fitment-content-wrapper">
                        <div class="verify-fitment_title">
                            DOES NOT FIT YOUR VEHICLE
                        </div>
                        <div class="fitment-message">${message}</div>
                    </div>
                    <div class="verify-fitment_body">
                        
                        <span class = "ymm-link" onclick = "displayYMMformFromBody()">Change Vehicle</span> 
                        <div class="verify-fitment_compatibl">
                            <a href = "${customYmm["siteURL"]}/search/?ymm=last">See Products That Fit Your Vehicle.</a>
                        </div>
                    </div>
                </div>
            </div>
                              
        `
    }

    function displayFitmentResult(containerId){

        const fitmentResultClass = "fitment-result"

        let [selectedYear, selectedMake, selectedModel, selectedDriveType, selectedFuelType, selectedNumDoors] = returnSelections(containerId)

        carrySelectedVehicle();

        let fits = false; // Flag to track if a fit is found
        
        const targetElement = document.querySelector(`.${fitmentResultClass}`);

        customYmm["fitmentData"].forEach((fitmentData, index) => {
            if (
                (selectedYear >= parseInt(fitmentData.from_year) && selectedYear <= parseInt(fitmentData.to_year)) &&
                selectedMake == fitmentData.make.trim() &&
                selectedModel == fitmentData.model.trim() &&
                (selectedDriveType == '' || fitmentData.drive_type.trim() == '' || selectedDriveType == fitmentData.drive_type.trim()) &&
                (selectedFuelType == '' || fitmentData.fuel_type.trim() == '' || selectedFuelType == fitmentData.fuel_type.trim()) &&
                (selectedNumDoors == '' || fitmentData.num_doors.trim() == '' || selectedNumDoors == fitmentData.num_doors.trim())
            ) {
                fits = true;
                return; // Exit the loop early since we found a fit
            }
        });

        if (fits) {
            
            if(document.querySelector('#form-action-addToCart')){
                document.querySelector('#form-action-addToCart').disabled= false
                document.querySelector('#form-action-addToCart').style.cursor= "pointer"
                document.querySelector('#form-action-addToCart').style.opacity = "1"

            }
            
            targetElement.innerHTML = returnFitsMessage(
                `
                    <span class="selected-ymm selected-ymm-vq"> 
                        <span class="selected-ymm-ymm">
                            ${selectedYear} ${selectedMake} ${selectedModel}
                        </span>
                        <span class="selected-vq">
                            ${selectedDriveType} ${selectedFuelType} ${selectedNumDoors}
                        </span>
                    </span>
                `
            );
        } else {
              if(document.querySelector('#form-action-addToCart')){
                document.querySelector('#form-action-addToCart').disabled= true
                document.querySelector('#form-action-addToCart').style.cursor = "no-drop"
                document.querySelector('#form-action-addToCart').style.opacity = "0.3"
            }
            targetElement.innerHTML = returnDoesNotFitMessage(`
                <span class="selected-ymm selected-ymm-vq"> 
                    <span class="selected-ymm-ymm">
                        ${selectedYear} ${selectedMake} ${selectedModel}
                    </span>
                    <span class="selected-vq">
                        ${selectedDriveType} ${selectedFuelType} ${selectedNumDoors}
                    </span>
                </span>
            `);
        }

    }
    
    function saveOrGoforProductPage(containerId){
        pushToGarage(containerId)
        setupGarage(false);
        // hide ymm form
        // enableSelectTag(containerId, "btn-go")
        hideYMMFformFromBody()
        // loop through the fitment data and check whether it fits
        displayFitmentResult(containerId)
    }

    const decideWhatHappensAfterFormChangeInProductPage = async (containerId) => {

        let [selectedYear, selectedMake, selectedModel, selectedDriveType, selectedFuelType, selectedNumDoors] = returnSelections(containerId)
        
        let dropdowns = await fetchYmmOnlyDataAndRender(containerId);
        dropdowns.drive_type_arr = dropdowns.drive_type_arr.filter(elem=> elem !== '')
        dropdowns.fuel_type_arr = dropdowns.fuel_type_arr.filter(elem=> elem !== '')
        dropdowns.num_doors_arr = dropdowns.num_doors_arr.filter(elem=> elem !== '')
        manageHighlighted(containerId)

        if(
            (
                (dropdowns.makes.length && selectedMake == false ) ||
                (dropdowns.models.length && selectedModel == false ) ||
                (isDriveTypeExists() && dropdowns.drive_type_arr.length && selectedDriveType == '' ) ||
                (isFuelTypeExists() && dropdowns.fuel_type_arr.length && selectedFuelType == '' ) ||
                (isNumDoorsExists() && dropdowns.num_doors_arr.length && selectedNumDoors == '' )
            ) ||
            (
                selectedMake == false || 
                selectedYear == false || 
                selectedModel == false 
            )
        ){
            if(document.querySelector('#form-action-addToCart')){
                document.querySelector('#form-action-addToCart').disabled= true
                document.querySelector('#form-action-addToCart').style.cursor = "no-drop"
                document.querySelector('#form-action-addToCart').style.opacity = "0.3"

            }
            displayYMMformFromBody()
        }else{
            enableSelectTag(containerId, "btn-go")
            saveOrGoforProductPage(containerId);
            removeHighlighted(containerId)
        } 
        
    }



    function createRequiredWrappersForProductPage(){

        
        // Get reference to the existing div
        var existingDiv = document.querySelector(customYmm["productPageWrapper"]);
        

        const newDiv =document.createElement('div')
        newDiv.className="form-fitment-wrapper";
        
        // Insert the new div after the existing div
        // existingDiv.insertAdjacentElement('afterend', newDiv);
        existingDiv.appendChild(newDiv);
        
        newDiv.innerHTML = `

            <div class = "our-own-wrapper">

                <div class = "custom-ymm-form-body">

                    <h4>
                        Verify Fitment With Your Vehicle
                    </h4>

                    <div class = "ymm-form-container-container">

                        <!-- YMM form will be displayed here -->

                    </div>

                </div>

                <div class = "fitment-result">

                    <!-- fitment result will be shown here -->

                </div>

            </div>

        `

    }



    function hideYMMFformFromBody(){
        document.querySelector('.custom-ymm-form-body').style.display = "none";
        document.querySelector('.fitment-result').style.display = "block";
    }

    function displayYMMformFromBody(){
        document.querySelector('.custom-ymm-form-body').style.display = "block"
        document.querySelector('.fitment-result').style.display = "none";
    }


   function isDriveTypeExists(){
        for(var i=0; i < customYmm["fitmentData"].length; i++){
            var data = customYmm["fitmentData"][i];
            if(data.drive_type.trim().length > 0){
                return true;
            }
        }
        return false;
    }

    function isFuelTypeExists(){
        for(var i=0; i < customYmm["fitmentData"].length; i++){
            var data = customYmm["fitmentData"][i];
            if(data.fuel_type.trim().length > 0){
                return true;
            }
        }
        return false;
    }

    function isNumDoorsExists(){
        for(var i=0; i < customYmm["fitmentData"].length; i++){
            var data = customYmm["fitmentData"][i];
            if(data.num_doors.trim().length > 0){
                return true;
            }
        }
        return false;
    }

    function returnDriveTypeTH(){
        if(isDriveTypeExists()) return '<th>Drive Type</th>'
        return ''
    }



    function returnFuelTypeTH(){
        if(isFuelTypeExists()) return '<th>Fuel Type</th>'
        return ''
    }



    function returnNumDoorsTH(){
        if(isNumDoorsExists()) return '<th>Num Doors</th>'
        return ''
    }


    function returnDriveTypeTD(d){
        
        if(isDriveTypeExists()) return `<td>${d}</td>`
        return ''
    }



    function returnFuelTypeTD(d){
        if(isFuelTypeExists())  return `<td>${d}</td>`
        return ''
    }



    function returnNumDoorsTD(d){
        if(isNumDoorsExists()){ return `<td>${d}</td>`}
         return ''
    }

    function toggleViewMoreOrLess(){
        customYmm['view_more'] = !customYmm['view_more']
        if(customYmm['view_more'] == false){
            var ul = document.querySelector('.tabs-horizontal');
            // Check if the ul element exists
            if (ul) {
                // Get all the li elements inside the ul
                var liElements = ul.querySelectorAll('li');
            
                // Check if there are at least three li elements
                if (liElements.length >= 3) {
                    // Retrieve the third li element (indexing starts from 0)
                    var thirdLi = liElements[2];
                    thirdLi.click()
                    // Now you can use the thirdLi variable to access the third li element
                    console.log(thirdLi);
                } else {
                    console.log("There are less than three li elements in the ul.");
                }
            } else {
                console.log("No ul element with the class 'tabs-horizontal' found.");
            }
        }
        displayFitmentTable()
        if(window.innerWidth < 500){
            document.querySelector('#tab-fitment').querySelector('.toggleLink').click()
        }
    }
    
    function returnViewMoreOrLessBtn(){
        if(customYmm["fitmentData"].length > 10){
            return`
                <span class="btn btn-secondary" onclick="toggleViewMoreOrLess()">${customYmm['view_more'] ? 'View Less' :'View More' }</span>
            `
        }else{
            return ``
        }
    }
    
    function displayFitmentTable(){
        if(customYmm['view_more'] === undefined){
            customYmm['view_more'] = false;       
        }
        
        let tempFitmentRows  = customYmm["fitmentData"]
        if(!customYmm['view_more']){
            tempFitmentRows =customYmm["fitmentData"].slice(0, 10)
        }
        
        if(customYmm["fitmentData"].length == 0){
            return ''
        } 
        
        let html = `

                    <div class = "fitment-data-table-wrapper ${customYmm['view_more'] ? 'viewing-more' : 'viewing-less'}">
                        <h3>Fitment Table</h3>
                        <div class="fitment-data-table">
                            
    
                            <table>
    
                                <tr>
                                    <th>Year</th>
                                    <th>Make</th>
                                    <th>Model</th>
                                    ${returnDriveTypeTH()}
                                    ${returnFuelTypeTH()}
                                    ${returnNumDoorsTH()}
                                </tr>
    
                                ${tempFitmentRows.map(data => {
    
                                    return`
                                        <tr>
                                            <td>${data.from_year} - ${data.to_year}</td>
                                            <td>${data.make}</td>
                                            <td>${data.model}</td>
                                            ${returnDriveTypeTD(data.drive_type)}
                                            ${returnFuelTypeTD(data.fuel_type)}
                                            ${returnNumDoorsTD(data.num_doors)}
                                        </tr>
                                    `   
    
                                }).join(' ')}
    
                            </table>
                            
                            ${
                                returnViewMoreOrLessBtn()
                            }
                            
                        </div>
    
                    </div>
                

        `
        
        // Get a reference to the parent element (div with class 'productView-details')
        const parentDiv = document.querySelector(customYmm["fitmentTableWrapper"]);

        if (parentDiv) {
            parentDiv.innerHTML = html

        }else{
            console.error("fitmenttable wrapper does not exist");
        }
    }

    function carrySelectedVehicle(){

        if(document.querySelector('#selected_vehicle')){

                        
            if( customYmm["garage"].length > 0 ){
                
                var lastSelectedVehicle = customYmm["garage"].filter(({selected=false})=>selected)
                
                if(!lastSelectedVehicle.length) return
                
                lastSelectedVehicle = lastSelectedVehicle[0]
                
                const selectedYear = lastSelectedVehicle.year
                const selectedMake = lastSelectedVehicle.make
                const selectedModel = lastSelectedVehicle.model
                
                document.querySelector('#selected_vehicle').value = selectedYear + ' ' + selectedMake + ' ' + selectedModel
                
            }

        }

    }



    
    

 function setupForProductPage(){

        if(document.querySelector('.selected_vehicle')){
            carrySelectedVehicle();
        }
        
        var productID=document.querySelector('.product-details').getAttribute('data-productId')
        
        fetch(`${customYmm["fitmentDataApi"]}?productID=${productID}`)
        .then(response => response.json())
        .then(data => {

            customYmm["fitmentData"] = data.fitmentData;

            displayFitmentTable();

            createRequiredWrappersForProductPage()

            if(customYmm["fitmentData"].length == 0){

                // no fitment data for this product

                // hide ymm form
                hideYMMFformFromBody()

                document.querySelector('.fitment-result').innerHTML = `

                    <div class = "ymm-fitment-result-table">
                        <div class="ymm-fitment-verify-inner">
                            <div class = "ymm-fitment-icon-holder">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#FFFFFF" d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/></svg>
                            </div>
                            <div class = "ymm-fitment-message">
                                <div class="lacks-data-header">VERIFY YOUR FITMENT</div>
                                <div class="lacks-data-msg">This product may only fit specific applications, but we do not have the fitment in our database. Please review the description and verify fitment manually, or call us at <a href="tel:+18008234444">(800) 823-4444</a> with any questions!</div>
                            </div>
                        </div>
                    </div>

                `

            }else{

                
                // document.querySelector('.halo-recommendations-block .halo-block-content ').remove()
                
                document.querySelector('.product-recommendations').innerHTML = `
                    <div class="page-width container-wrapper container">
                        <div class="product-related-wrapper">
                            <div class="halo-block-header text-center block-title--style1">
                                <h3 class="title">
                                    <span class="text">RELATED PRODUCTS</span>
                                </h3>
                            </div>                            
                            <div class="products-related">
                                
                              <div class="carousel-products-related ymm-products-wrapper">
                                ${data.relatedProducts.map(rp => constructProductDiv(rp)).join(' ')}
                              </div>
                             
                            </div>        
                        </div>
                    </div>
                `
                
                  $('.carousel-products-related').slick({
                  slidesToShow: 4,
                  slidesToScroll: 4,
                  responsive: [
                    {
                      breakpoint: 1025,
                      settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        infinite: true,
                        dots: true,
                        arrows:false
                        
                      }
                    },
                    {
                      breakpoint: 769,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        dots: true,
                        arrows:false
                      }
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        dots: true,
                        arrows:false
                      }
                    }
                  ]
                  });

                setupYMMform('product-page-ymm-form', 'ymm-form-container-container', decideWhatHappensAfterFormChangeInProductPage, saveOrGoforProductPage )
                
                let selectedVehicle = false;
    
                if(customYmm["garage"].length){
                    
                    filteredVehicles = customYmm["garage"].filter(vehicle => vehicle.selected)
                    if(filteredVehicles.length)
                        selectedVehicle = filteredVehicles[0]
                }
             
                if(selectedVehicle){
                    ymm = selectedVehicle
                    customYmm['product-page-ymm-form']['selections'] = {
                        year: ymm.year,
                        make: ymm.make,
                        model: ymm.model,
                        drive_type: ymm.drive_type,
                        fuel_type: ymm.fuel_type,
                        num_doors: ymm.num_doors
                    }
                }
                
                decideWhatHappensAfterFormChangeInProductPage('product-page-ymm-form')

            }
        })

    }
