

    
    function hideOrShowFormAfterLoadingDropdownValues(dropdowns, containerId){
        
        let [selectedYear, selectedMake, selectedModel, selectedDriveType, selectedFuelType, selectedNumDoors] = returnSelections(containerId)

        dropdowns.drive_type_arr = dropdowns.drive_type_arr.filter(elem=> elem !== '')
        dropdowns.fuel_type_arr = dropdowns.fuel_type_arr.filter(elem=> elem !== '')
        dropdowns.num_doors_arr = dropdowns.num_doors_arr.filter(elem=> elem !== '')
        
        if(selectedYear && selectedMake && selectedModel){
            enableSelectTag(containerId, "btn-go")
            enableSelectTag(containerId, "btn-clear")
        }
        
        if(
            (
                (dropdowns.makes.length && selectedMake == false ) ||
                (dropdowns.models.length && selectedModel == false ) ||
                (dropdowns.drive_type_arr.length && selectedDriveType == '' ) ||
                (dropdowns.fuel_type_arr.length && selectedFuelType == '' ) ||
                (dropdowns.num_doors_arr.length && selectedNumDoors == '' )
            )
                ||
            (
                selectedMake == false || 
                selectedYear == false || 
                selectedModel == false 
            )        
        ){
            displayYmmFormInSearchPage()
        }else{
            hideYmmFormInSearchPage();
        } 
        
    }


    function resetDropdownData(containerId){
        customYmm[`${containerId}`]['makes'] = []
        customYmm[`${containerId}`]['models']= []
        customYmm[`${containerId}`]['drive_type_arr'] = []
        customYmm[`${containerId}`]['fuel_type_arr'] = []
        customYmm[`${containerId}`]['num_doors_arr'] = []        
    }
    
    function returnSelections(containerId){
        const selectedYear = customYmm[`${containerId}`].selections.year
        const selectedMake = customYmm[`${containerId}`].selections.make
        const selectedModel = customYmm[`${containerId}`].selections.model
        const selectedDriveType = customYmm[`${containerId}`].selections.drive_type
        const selectedFuelType = customYmm[`${containerId}`].selections.fuel_type
        const selectedNumDoors = customYmm[`${containerId}`].selections.num_doors 
        return[selectedYear, selectedMake, selectedModel, selectedDriveType, selectedFuelType, selectedNumDoors]
        
    }
    
    function returnDropdowns(containerId){
        const years = customYmm[`${containerId}`]['years']
        const makes = customYmm[`${containerId}`]['makes']
        const models = customYmm[`${containerId}`]['models']
        const drive_type_arr = customYmm[`${containerId}`]['drive_type_arr']
        const fuel_type_arr = customYmm[`${containerId}`]['fuel_type_arr']
        const num_doors_arr = customYmm[`${containerId}`]['num_doors_arr']
        return [years, makes, models, drive_type_arr, fuel_type_arr, num_doors_arr]
        
    }

    function addHighlighted(containerId, selectTagClass){
        
        try{
        
            removeHighlighted(containerId)
            document.querySelector(`#${containerId}`).querySelector(`.${selectTagClass}`).classList.add('ymm-select-selected')
        }catch(error){
            console.log(error)
        }
    }
    
    
    function removeHighlighted(containerId){
        
        if(document.querySelector(`#${containerId}`).querySelector('.ymm-select-selected')){
            document.querySelector(`#${containerId}`).querySelector('.ymm-select-selected').classList.remove('ymm-select-selected')
        }
    }
    
    function manageHighlighted(containerId){
        let [selectedYear, selectedMake, selectedModel, selectedDriveType, selectedFuelType, selectedNumDoors] = returnSelections(containerId)
        addHighlighted(containerId, "select-year")
        if(selectedYear) addHighlighted(containerId, "select-make")
        enableSelectTag(containerId, "btn-clear")
        if(selectedMake) addHighlighted(containerId, "select-model")
        if(selectedModel) addHighlighted(containerId, "select-drive-type")
        if(selectedDriveType != '') addHighlighted(containerId, "select-fuel-type")
        if(selectedFuelType != '') addHighlighted(containerId, "select-num-doors")
    }
    
    
    function assignYmmFormChangeListeners(containerId, callbackToChange,callbackToGoOrSave, callbackToClear ){

        document.querySelector(`#${containerId}`).querySelectorAll('.ymm-select').forEach(selectTag => {

            selectTag.addEventListener('change', event => {

                const selectTagId = selectTag.getAttribute("data-type")
                
                enableSelectTag(containerId, "btn-clear");
                
                switch(selectTagId){

                    case "select-year":
                        if(!(customYmm[`${containerId}`].years.includes(parseInt(selectTag.value)))) 
                            selectedYear = false
                        
                        customYmm[`${containerId}`].selections.year = selectTag.value
                        customYmm[`${containerId}`].selections.make = false
                        customYmm[`${containerId}`].selections.model = false
                        customYmm[`${containerId}`].selections.drive_type = ''
                        customYmm[`${containerId}`].selections.fuel_type = ''
                        customYmm[`${containerId}`].selections.num_doors = ''
                        disableSelectTag(containerId, "select-make")
                        disableSelectTag(containerId, "select-model")
                        disableSelectTag(containerId, "btn-go")
                        
                    break;

                    case "select-make":
                        customYmm[`${containerId}`].selections.model = false
                        customYmm[`${containerId}`].selections.make = selectTag.value
                        customYmm[`${containerId}`].selections.drive_type = ''
                        customYmm[`${containerId}`].selections.fuel_type = ''
                        customYmm[`${containerId}`].selections.num_doors = ''
                        disableSelectTag(containerId, "select-model")
                        disableSelectTag(containerId, "btn-go")
                    break;

                    case "select-model":
                        customYmm[`${containerId}`].selections.model = selectTag.value
                        customYmm[`${containerId}`].selections.drive_type = ''
                        customYmm[`${containerId}`].selections.fuel_type = ''
                        customYmm[`${containerId}`].selections.num_doors = ''
                    break;    
                    
                    case "select-drive-type":
                        customYmm[`${containerId}`].selections.drive_type = selectTag.value
                        break;
                    
                    case "select-fuel-type":
                        customYmm[`${containerId}`].selections.fuel_type = selectTag.value
                        break;                        
                       
                    case "select-num-doors":
                        customYmm[`${containerId}`].selections.num_doors = selectTag.value
                        break;                        
                }
                disableSelectTag(containerId, "select-drive-type")
                disableSelectTag(containerId, "select-fuel-type")
                disableSelectTag(containerId, "select-num-doors")
                callbackToChange(containerId);
                
            })
        })

        document.querySelector(`#${containerId}`).querySelector('.btn-clear').addEventListener('click', () => {
            clearYmmForm(containerId, callbackToClear)
        })


        document.querySelector(`#${containerId}`).querySelector('.btn-go').addEventListener('click', () => {
            callbackToGoOrSave(containerId)
        })

        
    }

    function resetSelectTag(containerId, selectTagClass){
        document.querySelector(`#${containerId}`).querySelector(`.${selectTagClass}`).selectedIndex = 0
 
    }

    function clearYmmForm(containerId, callback = false){
        customYmm[`${containerId}`].selections.year = false
        customYmm[`${containerId}`].selections.make = false
        customYmm[`${containerId}`].selections.model = false
        customYmm[`${containerId}`].selections.drive_type = ''
        customYmm[`${containerId}`].selections.num_doors = ''
        customYmm[`${containerId}`].selections.fuel_type = ''
        
        enableSelectTag(containerId, "select-year")
        resetSelectTag(containerId, "select-year")
        disableSelectTag(containerId, "select-make")
        resetSelectTag(containerId, "select-make")
        disableSelectTag(containerId, "select-model")
        resetSelectTag(containerId, "select-model")
                
        disableSelectTag(containerId, "select-drive-type")
        resetSelectTag(containerId, "select-drive-type")
        disableSelectTag(containerId, "select-num-doors")
        resetSelectTag(containerId, "select-num-doors")
        disableSelectTag(containerId, "select-fuel-type")
        resetSelectTag(containerId, "select-fuel-type")
        
        disableSelectTag(containerId, "btn-go")
        disableSelectTag(containerId, "btn-clear")
        
        manageHighlighted(containerId)
        
        customYmm["garage"].forEach((vehicle,index) => {
            if(vehicle.selected)
                customYmm["garage"][index].selected = false
        })

        setCookie("garage", JSON.stringify(customYmm["garage"]))
        setupGarage(false);
        
        if(customYmm['isInSearchPage'] || customYmm['isInCategoryPage'] || customYmm['isInBrandPage']){
            setSelectedVehicleWithCategoryTitle();
            clearContentsForCategoryPage()
            displayYmmFormInSearchPage();
            customYmm["searchQuery"] = ""
        }        
        
        if(callback) callback()
        displayBreadCrumb();
        if(customYmm['hideProductsUntilSelected'] === false){
            fetchProductsAndRender()
        }
        
    }


    function createYmmForm(containerId){

        customYmm[`${containerId}`] = {}

        customYmm[`${containerId}`]["years"] = customYmm['years'];

        
        customYmm[`${containerId}`]["makes"] = []
        
        customYmm[`${containerId}`]["models"] = []
        customYmm[`${containerId}`]["drive_type_arr"] = []
        customYmm[`${containerId}`]["fuel_type_arr"] = []
        customYmm[`${containerId}`]["num_doors_arr"] = []
        
        customYmm[`${containerId}`]["selections"] = {year: false, make: false, model: false, drive_type: '', fuel_type: '', num_doors: ''}
        
        return`

            <div class="ymm-form-container" id= "${containerId}">
            
                <div class="ymm-form-select-items">
                
                    <div class="year ymm-form-select">
                        <select data-type = "select-year" class="select-year ymm-select ymm-select-selected">
                            <option>Year</option>
                        </select>
                    </div>
        
                    <div class="make ymm-form-select">
                        <select data-type="select-make" class="select-make ymm-select" disabled>
                            <option>Make</option>
                        </select>
                    </div>
        
                    <div class="model ymm-form-select">
                        <select data-type = "select-model" class="select-model ymm-select" disabled>
                            <option>Model</option>
                        </select>
                    </div>
                    
                    ${containerId == "ymm-add-to-garage-form-modal" ? '<div class="optional-field-label-wrapper">Optional Fields </div>' : '' }
                        
                    <div class="drive_type ymm-form-select">
                        <select data-type = "select-drive-type" class="select-drive-type ymm-select" disabled>
                            <option>Drive Type</option>
                        </select>
                    </div>
                    
                        
                    <div class="fuel_type ymm-form-select">
                        <select data-type = "select-fuel-type" class="select-fuel-type ymm-select" disabled>
                            <option>Fuel Type</option>
                        </select>
                    </div>
                    
                        
                    <div class="num_doors ymm-form-select">
                        <select data-type = "select-num-doors" class="select-num-doors ymm-select" disabled>
                            <option>Num Doors</option>
                        </select>
                    </div>
                
                </div>
                
                <div class="ymm-button-holder-wrapper">
                
                    <div class="ymm-button-holder">
                    
                        <div class = "ymm-go-btn">
                            <button class ="button button-primary btn-go" disabled>Shop Now</button>
                        </div>
                        
                        <div class = "ymm-clear-btn">
                            <button class ="button button-secondary btn-clear" disabled>Clear</button>
                        </div>
                        
                    </div>
                    
                </div>

            </div>
        `

    }


    function setupYMMform(withContainerId, insideContainerWithClass, callbackToChange, callbackToSaveOrGo = false, callbackToClear = false ){

        // Find the element with the class ".product-options"
        const productViewDetailsElement = document.querySelector(`.${insideContainerWithClass}`);
        
        // Create a new div element
        const newDiv = document.createElement('div');

        // Insert the new div element before the ".product-options" element
        productViewDetailsElement.appendChild(newDiv);

        newDiv.innerHTML = createYmmForm(withContainerId)

        // assign listeners to the change in the ymm form

        assignYmmFormChangeListeners(withContainerId, callbackToChange, callbackToSaveOrGo,callbackToClear)

        // fill up the year slect tag

        document.querySelector(`#${withContainerId}`).querySelector('.select-year').innerHTML = createOptionTag('Year') + customYmm[`${withContainerId}`]["years"].map(year => createOptionTag(year)).join('')

    }

    async function fetchYmmOnlyDataAndRender(containerId){
        
        try{
            
            const response = await fetch(`${customYmm["ymmOnlyApi"]}?category=${customYmm["selectedCategory"]}&drive_type=${customYmm[containerId].selections.drive_type}&fuel_type=${customYmm[containerId].selections.fuel_type}&num_doors=${customYmm[containerId].selections.num_doors}&year=${customYmm[containerId].selections.year}&make=${customYmm[containerId].selections.make}&model=${customYmm[containerId].selections.model}`)
        
            const responseJson = await response.json()
            
            displayMakesAndModels(responseJson, containerId)
            
            return responseJson;
            
        }catch(error){
            console.error(error)
            // alert('Error Occured. Please Report to us: ', JSON.stringify(error))
        
        }

    }


    function disableSelectTag(containerId, selectTagClass){
    
        document.querySelector(`#${containerId}`).querySelector(`.${selectTagClass}`).disabled = true
        resetSelectTag(containerId, selectTagClass)
    }


    function enableSelectTag(containerId, selectTagClass){
    
        document.querySelector(`#${containerId}`).querySelector(`.${selectTagClass}`).disabled = false
  
    
    }
    

    function hideSelectTag(containerId, selectTagClass){
    
        document.querySelector(`#${containerId}`).querySelector(`.${selectTagClass}`).closest('.ymm-form-select').style.display = "none"

    }


    function displaySelectTag(containerId, selectTagClass){
    
        document.querySelector(`#${containerId}`).querySelector(`.${selectTagClass}`).closest('.ymm-form-select').style.display = "block"
  
    
    }
    

    function createOptionTag(value, containerId = false){

        let selected =false

        if(containerId != false ){

            if(Object.values(customYmm[`${containerId}`]["selections"]).includes(value)) selected = true

        }

        return `
            <option value = "${value}" ${selected ? 'selected' : ''} >${value}</option>
        `
    }    
    
    function isInVehiclePage(){
        return window.location.href.includes("/vehicles/");
    }

    function returnYMMvaluesFromVehiclePage(){
        var vehicleString = document.querySelector('.page-description').innerText;

        // Split the string by ":"
        var parts = vehicleString.split(":");
        
        // Take the part after the colon (index 1) and remove leading/trailing spaces
        var result = parts[1].trim();   
        
        return result.split('|').map(ymm=>ymm.trim());
    }
    
    function displayMakesAndModels(data, containerId){

        customYmm[`${containerId}`]["makes"] =  [...new Set(data.makes)].sort()
        customYmm[`${containerId}`]["models"] =  [...new Set(data.models)].sort()
        customYmm[`${containerId}`]["drive_type_arr"] =  [...new Set(data.drive_type_arr)].sort().filter(drive_type=>  drive_type != null && drive_type.trim().length > 0)
        customYmm[`${containerId}`]["fuel_type_arr"] =  [...new Set(data.fuel_type_arr)].sort().filter(fuel_type =>  fuel_type != null && fuel_type.trim().length > 0)
        customYmm[`${containerId}`]["num_doors_arr"] =  [...new Set(data.num_doors_arr)].sort().filter(num_doors => num_doors != null && num_doors.trim().length > 0)
        
        
        
        if(customYmm[`${containerId}`]['selections']['year']){
            var year = customYmm[`${containerId}`]['selections']['year']
            var selectElement = document.querySelector(`#${containerId} .select-year`);
    
            // Loop through the options
            for (var i = 0; i < selectElement.options.length; i++) {
                var option = selectElement.options[i];
        
                // Check if the option value matches the desired make
                if (option.value === year) {
                    // Set the selected attribute and trigger a change event
                    option.selected = true;
                    break; // Exit the loop once the option is found
                }
            }
        }

        if(customYmm[`${containerId}`]["makes"].length > 0 && customYmm[`${containerId}`].selections.year != false){

            customYmm[`${containerId}`]["makes"] =  [...new Set(data.makes)].sort()

            enableSelectTag(containerId, "select-make")

            document.querySelector(`#${containerId}`).querySelector('.select-make').innerHTML = createOptionTag('Make') + customYmm[`${containerId}`]["makes"].map(make => createOptionTag(make, containerId)).join('')

            if(isInVehiclePage()){
               var YMMvalues = returnYMMvaluesFromVehiclePage()
               let hereIsMake = false
               hereIsMake = YMMvalues[0]
               if(YMMvalues.length == 3){
                  hereIsMake = YMMvalues[1]
               }
                
                if(hereIsMake && customYmm[`${containerId}`].selections.make ==false ){
                    
                    var selectElement = document.querySelector(`#${containerId} .select-make`);

                    // Loop through the options
                    for (var i = 0; i < selectElement.options.length; i++) {
                        var option = selectElement.options[i];
                
                        // Check if the option value matches the desired make
                        if (option.value === hereIsMake) {
                            // Set the selected attribute and trigger a change event
                            option.selected = true;
                            var event = new Event('change');
                            selectElement.dispatchEvent(event);
                            break; // Exit the loop once the option is found
                        }
                    }
                    
                }
            }

        }
        
        if(customYmm[`${containerId}`]["models"].length > 0 && customYmm[`${containerId}`].selections.make != false){

            enableSelectTag(containerId, "select-model")

            document.querySelector(`#${containerId}`).querySelector('.select-model').innerHTML = createOptionTag('Model') + customYmm[`${containerId}`]["models"].map(model => createOptionTag(model, containerId)).join('')

            // if(isInVehiclePage() && customYmm[`${containerId}`].selections.model == false ){
            //   var YMMvalues = returnYMMvaluesFromVehiclePage()
            //   let hereIsModel = false
            //   if(YMMvalues.length == 3){
            //       hereIsModel = YMMvalues[2]
            //   }else if(YMMvalues.length == 2){
            //       hereIsModel = YMMvalues[1]
            //   }
            
            //     if(hereIsModel){
                    
            //         var selectElement = document.querySelector(`#${containerId} .select-model`);

            //         // Loop through the options
            //         for (var i = 0; i < selectElement.options.length; i++) {
            //             var option = selectElement.options[i];
                
            //             // Check if the option value matches the desired make
            //             if (option.value === hereIsModel) {
            //                 // Set the selected attribute and trigger a change event
            //                 option.selected = true;
            //                 var event = new Event('change');
            //                 selectElement.dispatchEvent(event);
            //                 break; // Exit the loop once the option is found
            //             }
            //         }
                    
            //     }
            // }            
            
        }

        if(customYmm[`${containerId}`].selections.model == false  ) return
        // need to return even when we are in the home page because we won't be displaying other qualifiers in the home page
    
        if(customYmm[`${containerId}`]["drive_type_arr"].length > 0){
            
            displaySelectTag(containerId, "select-drive-type")
            enableSelectTag(containerId, "select-drive-type")
            
            document.querySelector(`#${containerId}`).querySelector('.select-drive-type').innerHTML = createOptionTag('Drive Type') + customYmm[`${containerId}`]["drive_type_arr"].map(model => createOptionTag(model, containerId)).join('')

        }else {
            hideSelectTag(containerId, "select-drive-type")
        }
        
        if( customYmm[`${containerId}`]["fuel_type_arr"].length > 0){
            displaySelectTag(containerId, "select-fuel-type")
            enableSelectTag(containerId, "select-fuel-type")
            document.querySelector(`#${containerId}`).querySelector('.select-fuel-type').innerHTML = createOptionTag('Fuel Type') + customYmm[`${containerId}`]["fuel_type_arr"].map(model => createOptionTag(model, containerId)).join('')
        } else {
            hideSelectTag(containerId, "select-fuel-type")
        }
        
        if(customYmm[`${containerId}`]["num_doors_arr"].length > 0){
            displaySelectTag(containerId, "select-num-doors")
            enableSelectTag(containerId, "select-num-doors")
            document.querySelector(`#${containerId}`).querySelector('.select-num-doors').innerHTML = createOptionTag('Num Doors') + customYmm[`${containerId}`]["num_doors_arr"].map(model => createOptionTag(model, containerId)).join('')
        } else {
            hideSelectTag(containerId, "select-num-doors")
        }
    }
