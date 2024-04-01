 

    function hideGarage(){

        document.querySelector('#garage-wrapper-wrapper').style.display = "none"

    }

    function displayGarage(){
        document.querySelector('#garage-wrapper-wrapper').style.display = "block"       
    }


  function pushToGarage(containerId){

        const selectedYear = customYmm[`${containerId}`].selections.year
        const selectedMake = customYmm[`${containerId}`].selections.make
        const selectedModel = customYmm[`${containerId}`].selections.model
        const selectedDriveType = customYmm[`${containerId}`].selections.drive_type
        const selectedFuelType = customYmm[`${containerId}`].selections.fuel_type
        const selectedNumDoors = customYmm[`${containerId}`].selections.num_doors

        if(customYmm["garage"].length){

            for(var i = 0; i<customYmm["garage"].length; i++){
                
                vehicle = customYmm["garage"][i]
                                
                if(vehicle.selected)
                    customYmm["garage"][i].selected = false
            }

            for(var i = 0; i<customYmm["garage"].length; i++){
                
                vehicle = customYmm["garage"][i]
                                
                if(vehicle.selected)
                    customYmm["garage"][i].selected = false
                    
                if(
                    vehicle.year === selectedYear &&
                    vehicle.make === selectedMake &&
                    vehicle.model === selectedModel
                ){
                    vehicle.drive_type = selectedDriveType 
                    vehicle.fuel_type = selectedFuelType 
                    vehicle.num_doors = selectedNumDoors
                    vehicle.selected = true
                    setCookie("garage", JSON.stringify(customYmm["garage"]))
                    return
                }

            }            

        }
        
        customYmm["garage"].push(
            {
                selected:true,
                id: customYmm["garage"].length ? customYmm["garage"][customYmm["garage"].length-1].id + 1:1,
                year: selectedYear,
                make: selectedMake,
                model: selectedModel,
                drive_type: selectedDriveType,
                fuel_type: selectedFuelType,
                num_doors: selectedNumDoors
            }
        )

        setCookie("garage", JSON.stringify(customYmm["garage"]))


    }

    function decideWhereToGoWhenGarageItemClicked(ymmId){

        const ymmContainerIdForSearchPage = 'search-page-ymm-form-container'

            customYmm["garage"].forEach((vehicle,index) => {
                if(vehicle.selected)
                    customYmm["garage"][index].selected = false
            })

            customYmm["garage"].forEach((vehicle,index) => {
                if(vehicle.id == ymmId)
                    customYmm["garage"][index].selected = true
            })

            setCookie("garage", JSON.stringify(customYmm["garage"]))

        if(customYmm["isInSearchPage"] || customYmm["isInCategoryPage"]){
            setupGarage(false);

            var ymm = customYmm["garage"].filter(ymm => ymm.id == ymmId)[0]

            customYmm[`${ymmContainerIdForSearchPage}`]['selections']['year'] = ymm.year
            customYmm[`${ymmContainerIdForSearchPage}`]['selections']['make'] = ymm.make
            customYmm[`${ymmContainerIdForSearchPage}`]['selections']['model'] = ymm.model

            fetchProductsAndRender()

        }else{

            window.location.href = customYmm["siteURL"] + '/search/';

        }
        

    }

function fillGarageWithVehicles(){

    if(customYmm["garage"].length > 0 ) 
        return customYmm["garage"].map(({selected =false, id, year, make, model, drive_type, fuel_type, num_doors}) => {

            return`
                <div class  =  "each-vehicle-in-garage ${selected ? 'selected-vehicle-in-garage': ''} d-flex align-items-center ymm-justify-content-between ymm-mt-2 cursor-pointer  ">
                    
                    <div class = "each-vehicle-in-garage__name" data-ymm-id="${id}">
                        
                        <span class="selected-ymm-each selected-ymm-vq-each"> 
                            <span class="selected-ymm-ymm-each">
                                ${year} ${make} ${model} 
                            </span>
                            <span class="selected-vq-each">
                                ${drive_type} ${fuel_type} ${num_doors}
                            </span>
                        </span>
                        
                    </div>
                    
                    <div data-vehicle = "${id}" class = "remove-this-vehicle-from-garage ymm-icon-danger">
                        ${customYmm["svgCross"]}
                    </div>
                
                </div>
            `

        }).join(' ')

    else
        return 'The garage is empty.'

    }

    function displayGarageWrapper(){
        document.querySelector("#wrapperToGarageWrapperWrapper").style.display = "block"
        document.querySelector("#garage-wrapper-wrapper").style.display = "block"
    }

    function hideGarageWrapper(){
        document.querySelector("#wrapperToGarageWrapperWrapper").style.display = "none"
        document.querySelector("#garage-wrapper-wrapper").style.display = "none"
        if(document.querySelector('#cb-garage-btn'))document.querySelector('#cb-garage-btn').checked = false
    }

    function setPositionForGarageWrapper(){

        const garageWrapper = document.getElementById('garage-wrapper-wrapper')

        // Get references to the label and div elements
        const label = document.getElementById("garage-btn");
        // Get the bounding rectangle of the label
        const labelRect = label.getBoundingClientRect();

        // Calculate the available space on the left and right
        const spaceLeft = labelRect.left;

        // Calculate the position for the div
        let divLeft, divRight;

        const garageWrapperWidth = 300;

        if (spaceLeft <= garageWrapperWidth) {
          // If there is enough space on the left, align the div to the left of the label
          divLeft = labelRect.left + 20;
          divRight = "auto";
        } else if (spaceLeft >= garageWrapperWidth) {
          // If there is enough space on the right, align the div to the right of the label
          divLeft = "auto";
          divRight = window.innerWidth - labelRect.right;
        } else {
          // If there is not enough space on either side, align the div to the left of the label
          divLeft = labelRect.left;
          divRight = "auto";
        }

        // Set the position of the div
        garageWrapper.style.top = labelRect.bottom + 10 + "px";
        garageWrapper.style.left = divLeft +  "px";
        garageWrapper.style.right = divRight + "px";

    }

    function constructGarageAndDisplayIt(){

        let html = `

            <div id = "garage-wrapper">

                <div class = "clear-garage d-flex align-items-center ymm-justify-content-between cursor-pointer">
                    <div><strong>Your Garage</strong></div>
                    <div class ="ymm-text-right">
                        <span class = "clear-garage-span" id="clear-garage-span">
                            Clear Garage
                        </span>
                    </div>
                </div>

                <hr>

                <div class = "garage-content">

                    ${fillGarageWithVehicles()}
                    
                </div>
                
                <hr>
                <div class = "add-vehicle-to-garage-button-wrapper ymm-text-center">
                    <button class = "button button-primary" id = "add-vehicle-to-garage-button">
                        Add Vehicle
                    </button>
                </div>

            </div>
        `
        let garageWrapper = document.querySelector('#garage-wrapper-wrapper')
        
        if(!garageWrapper){
            
            garageWrapper = document.createElement('div')
            garageWrapper.id = "garage-wrapper-wrapper"
            garageWrapper.className = "garage-wrapper-wrapper"

            document.querySelector('#newly-added-garage-btn').appendChild(garageWrapper)

            const wrapperToGarageWrapperWrapper = document.createElement('div')
            wrapperToGarageWrapperWrapper.className = "modal-wrapper"
            wrapperToGarageWrapperWrapper.id = "wrapperToGarageWrapperWrapper"
            wrapperToGarageWrapperWrapper.style.backgroundColor = "rgba(255, 255, 255, 0)"
            wrapperToGarageWrapperWrapper.addEventListener('click', () => {
                hideGarageWrapper();
            })

            document.body.appendChild(wrapperToGarageWrapperWrapper)

        }

        // setPositionForGarageWrapper()

        document.querySelector('#garage-wrapper-wrapper').innerHTML = html

        // assign listeners to the clear and cross

        Array.from(document.querySelector('#garage-wrapper').querySelectorAll('.remove-this-vehicle-from-garage')).forEach(remover => {

            remover.addEventListener('click', event => {
                customYmm["garage"] = customYmm["garage"].filter(vehicle => vehicle.id != remover.getAttribute("data-vehicle"))

                setupGarage(displayGarageFlag = true)

                setCookie("garage", JSON.stringify(customYmm["garage"]))

            })

        })

        document.querySelector('#add-vehicle-to-garage-button').addEventListener('click', event => {
        
            displayOverlay()
            hideGarageWrapper();
        
        })

        document.querySelector('#clear-garage-span').addEventListener('click', () => {

            customYmm["garage"] = []
            setCookie("garage", JSON.stringify(customYmm["garage"]))
            setupGarage(true)

        })


        Array.from(document.querySelectorAll('.each-vehicle-in-garage__name')).forEach(ymm => {

            ymm.addEventListener('click', event => {

                decideWhereToGoWhenGarageItemClicked(ymm.getAttribute("data-ymm-id"))
            

            })

        })

    }

    function returnGarageText(){

        let selectedVehicle = false;

        if(customYmm["garage"].length){
            
            filteredVehicles = customYmm["garage"].filter(vehicle => vehicle.selected)
            if(filteredVehicles.length)
                selectedVehicle = filteredVehicles[0]
        }

        return selectedVehicle 
                ? `
                    <span class="selected-ymm selected-ymm-vq"> 
                        <span class="selected-ymm-ymm">
                            ${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}
                        </span>
                        <span class="selected-vq">
                            ${selectedVehicle.drive_type} ${selectedVehicle.fuel_type} ${selectedVehicle.num_doors}
                        </span>
                    </span>
                    <span class = "filter-pipe"> | </span>
                    <span class = "change-vehicle"> Change </span> 
                `
                : `
                    <span classs="select-your-vehicle"> Select Your Vehicle </span>
                
                    <span class="icon-down-arrow" >
                        <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_119_394)">
                            <path d="M5.5 6.40002L0 2.43187e-05L11 2.43187e-05L5.5 6.40002Z" fill="white"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_119_394">
                            <rect width="11" height="6.4" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </span>
                
                `

    }
    
    function returnGarageIcon(){
        
        
        return `
            <span class="icon-grage">
                ${
                    customYmm['settings']['headerVehicleIcon'] === undefined
                        ?   returnJeep()
                        :   customYmm['settings']['headerVehicleIcon'] == "garage"
                            ?   returnGarage()
                            :   customYmm['settings']['headerVehicleIcon'] == "truck"
                                ?   returnTruck()
                                :   customYmm['settings']['headerVehicleIcon'] == "car"
                                        ?   returnCar()
                                        :   returnJeep()
                }
            </span>
        ` 
        
    }
    
    function returnGarageIconOrNothing(){
        return`
            ${
                !(customYmm["garage"].filter(vehicle => vehicle.selected).length == 1)
                    ? returnGarageIcon()
                    : ''
            }
        `
    }

    function setupGarage(displayGarageFlag = false){

        const noOfVehiclesInGarage = customYmm["garage"].length


        if(document.querySelector('#newly-added-garage-btn'))
            document.querySelector('#newly-added-garage-btn').remove()
              
        if(window.innerWidth > 1024){
                                        
            document.querySelector(customYmm["garageButtonWrapper"]).innerHTML += `
                                            
                <!-- need-to-change for every site -->
                                            
                <div id = "newly-added-garage-btn" class="navPages-item navPages-item-page">
                    <input type="checkbox" id="cb-garage-btn" class="hidden">
                    <label for="cb-garage-btn" class ='navPages-action' id="garage-btn">
                        ${returnGarageIconOrNothing()}
                        ${returnGarageText()}
                    </label>
                </div>
    
            `
        }else{
                       
                       
    
        // Select the element with class "section-header-advanced"
        var sectionHeaderAdvanced = document.querySelector('.section-header-navigation');
        
        // Create a new div element
        var customDiv = document.createElement('sticky-ymm-mobile');
        
        // Add content to the new div
        customDiv.innerHTML = `
            <div id = "newly-added-garage-btn" class="navPages-item navPages-item-page">
                <input type="checkbox" id="cb-garage-btn" class="hidden">
                <label for="cb-garage-btn" class ='navPages-action' id="garage-btn">
                    ${returnGarageIconOrNothing()}
                    ${returnGarageText()}
                </label>
            </div>
        `;
        
        // Insert the new div after the section header advanced div
        sectionHeaderAdvanced.parentNode.insertBefore(customDiv, sectionHeaderAdvanced.nextSibling);

    
                       
                                               
            // document.querySelector(customYmm["garageButtonWrapperMobile"]).innerHTML += `
                                            
            //     <!-- need-to-change for every site -->
                                            
            //     <div id = "newly-added-garage-btn" class="navPages-item navPages-item-page">
            //         <input type="checkbox" id="cb-garage-btn" class="hidden">
            //         <label for="cb-garage-btn" class ='navPages-action' id="garage-btn">
            //             ${returnGarageIconOrNothing()}
            //             ${returnGarageText()}
            //         </label>
            //     </div>
    
            // `
            
        }
        document.querySelector('#cb-garage-btn').addEventListener('change', event => {

            if(event.target.checked){


                if(noOfVehiclesInGarage > 0){
                    // display garage
                    
                    constructGarageAndDisplayIt()
                    displayGarageWrapper();

                }else{

                    // display YMMM form for adding to the garage
                    document.body.classList.toggle("my-grage-active")
                    displayOverlay()


                }

            }else{

                // hide garage
                hideGarageWrapper();


            }

        })


        if(displayGarageFlag) constructGarageAndDisplayIt()

    }