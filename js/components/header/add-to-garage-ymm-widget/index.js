

    function goForAddToGarage(containerId){
        
        let [selectedYear, selectedMake, selectedModel, selectedDriveType, selectedFuelType, selectedNumDoors] = returnSelections(containerId)
        pushToGarage(containerId)
        setupGarage(false);
        hideOverlay()
        if (customYmm["isInSearchPage"] || customYmm["isInCategoryPage"] || customYmm["isInBrandPage"]) {
            
            const ymmContainerId = 'search-page-ymm-form-container'
            
            customYmm[`${ymmContainerId}`].selections = {
                year: selectedYear,
                make: selectedMake,
                model: selectedModel,
                drive_type: selectedDriveType,
                fuel_type: selectedFuelType,
                num_doors: selectedNumDoors
            }

            fetchProductsAndRender()
            
        }else{
            window.location.href =  `${customYmm["siteURL"]}/search/`
        }
        
    }

    const decideWhatHappensAfterFormChangeInAddToGarage = async (containerId) => {
        
        try{
            
            let [selectedYear, selectedMake, selectedModel, selectedDriveType, selectedFuelType, selectedNumDoors] = returnSelections(containerId)
            
            let dropdownsInAddToGarage = await fetchYmmOnlyDataAndRender(containerId);
            
            dropdownsInAddToGarage.drive_type_arr = dropdownsInAddToGarage.drive_type_arr.filter(elem=> elem !== '')
            dropdownsInAddToGarage.fuel_type_arr = dropdownsInAddToGarage.fuel_type_arr.filter(elem=> elem !== '')
            dropdownsInAddToGarage.num_doors_arr = dropdownsInAddToGarage.num_doors_arr.filter(elem=> elem !== '')
            manageHighlighted(containerId)

            if(selectedYear && selectedMake && selectedModel){
                // enable the go button after seelcteing these three
                enableSelectTag(containerId, "btn-go")
                
                if(!dropdownsInAddToGarage.drive_type_arr.length && !dropdownsInAddToGarage.fuel_type_arr.length && !dropdownsInAddToGarage.num_doors_arr.length ){
                    
                    // hide optional fields
                    document.querySelector('.optional-field-label-wrapper').style.display = "none"
                    
                }else{
                    document.querySelector('.optional-field-label-wrapper').style.display = "block"
                }
                
            }
            
            if(
                (dropdownsInAddToGarage.makes.length && selectedMake == false ) ||
                (dropdownsInAddToGarage.models.length && selectedModel == false ) ||
                (dropdownsInAddToGarage.drive_type_arr.length && selectedDriveType == '' ) ||
                (dropdownsInAddToGarage.fuel_type_arr.length && selectedFuelType == '' ) ||
                (dropdownsInAddToGarage.num_doors_arr.length && selectedNumDoors == '' )
            ){
            }else{
                removeHighlighted(containerId)
                goForAddToGarage(containerId);
                
            }
            
        } catch(error) {
            console.log(error)
            alert('An error has occurred. Please report it to us.\n' + JSON.stringify(error))
        }
        
    }
    
    

    function setupAddToGarageYMMform(){

        // wrapper for modal

        const wrapperForModal = document.createElement('div')

        wrapperForModal.className = "modal-wrapper"

        wrapperForModal.addEventListener('click', () => {
            hideOverlay()
        })

        // wrapperForModal.style.backgroundColor ="rgba(0, 0, 0, 0.5)"; /* Grey background with some transparency */

        const ymmAddToGarageFormModal = document.createElement('div')

        ymmAddToGarageFormModal.className = "ymm-add-to-garage-form-modal"
        
        ymmAddToGarageFormModal.classList.add('ymm-modal')
        
        ymmAddToGarageFormModal.innerHTML = `

            <div class = "add-to-garage-form-wrapper">
                
                <div class = "add-to-garage-heading">
                    <h3 class = "add-to-garage-heading__heading">SELECT YOUR TRUCK</h3>
                    <div class = "close-icon" onclick = "hideOverlay()">${customYmm["svgCross"]}</div>
                </div>
                    
                <div class = "ymm-add-to-garage-form-wrapper">
                </div>
                
            </div>

        `

        document.body.appendChild(wrapperForModal)

        document.body.appendChild(ymmAddToGarageFormModal)

        hideOverlay()

        setupYMMform('ymm-add-to-garage-form-modal', 'ymm-add-to-garage-form-wrapper', decideWhatHappensAfterFormChangeInAddToGarage, goForAddToGarage)

    }

