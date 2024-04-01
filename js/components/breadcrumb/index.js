    function returnSelectionsForBreadCrumb(){

        const ymmContainerId = 'search-page-ymm-form-container'

        let [selectedYear, selectedMake, selectedModel, selectedDriveType, selectedFuelType, selectedNumDoors] = returnSelections(ymmContainerId)

        return`
            <h4>${selectedYear || ''} ${selectedMake || ''} ${selectedModel || '' } ${selectedDriveType} ${selectedFuelType} ${selectedNumDoors} </h4>
        `

    }

    function displayBreadCrumb(){
        
        
        if(customYmm['isInSearchPage']){
    
            // const ymmContainerId = 'search-page-ymm-form-container'
            // let [selectedYear, selectedMake, selectedModel, selectedDriveType, selectedFuelType, selectedNumDoors] = returnSelections(ymmContainerId)
            // let selectedVehicle = [selectedYear || '', selectedMake || '', selectedModel || '', selectedDriveType, selectedFuelType,selectedNumDoors]
            // selectedVehicle = selectedVehicle.filter(sv => sv.length > 0)
            const sels = [];
            
            const searchQuery = customYmm['searchQuery'];
            
            if(searchQuery.length) sels.push('"'+searchQuery+'"')
            
            // if(selectedVehicle.length) sels.push('"'+selectedVehicle.join(' ')+'"')
            
            if(sels.length){
                document.querySelector('#ymm-breadcrumb').innerHTML = `
                    <div class="category-title heading-custom"><h1>Search results for ${sels.join(' for ')}</h1></div> 
                `;
            }else{
                 document.querySelector('#ymm-breadcrumb').innerHTML = `<div class="category-title heading-custom"><h1>Search Results</h1></div>`;               
            }

        }else if(customYmm['isInCategoryPage'] || customYmm['isInBrandPage']){

            document.querySelector('#ymm-breadcrumb').innerHTML = `
                 <div class="category-title heading-custom"><h1>${document.querySelectorAll('.bd-title')[document.querySelectorAll('.bd-title').length - 1].innerText}</h1></div> 
            `;
            
        }
    }
