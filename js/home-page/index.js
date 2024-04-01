
  
    function createWrappersForHomePage(){

        // Create a new div element
        var newDiv = document.createElement('div');
        
        newDiv.className = `container`
        
        
        let pageWidthFromThemeSettings =''
        
        if(document.querySelector('#search_auto_data')){
            pageWidthFromThemeSettings=  document.querySelector('#search_auto_data').getAttribute('data-site_width')
        }
        
        newDiv.innerHTML = `
            <div class="${pageWidthFromThemeSettings} container--medium">
            <div class = "custom-ymm-wrapper-for-home-page ">

                <div class = "home-page-select-your-vehicle">

                    <h3> Select Your Vehicle </h3>

                </div>

                <div class = "custom-ymm-form-for-home-page ymm-form-search-page">

                </div>

            </div>
        </div>


        `

        // Get the reference to the "main-content" element
        var mainContent = document.querySelector(customYmm["homePageWrapper"])


        // Insert the new div as the first child of "main-content"
        if (mainContent) {
            // Check if "main-content" element exists
            mainContent.insertBefore(newDiv, mainContent.firstChild);
        }

    }

    function saveOrGoForHomePage(containerId){
        pushToGarage(containerId)
        window.location.href =  `${customYmm["siteURL"]}/search/`
    }

    const decideWhatHappensAfterFormChangeInHomePage = async (containerId) => {
    
        let [selectedYear, selectedMake, selectedModel, selectedDriveType, selectedFuelType, selectedNumDoors] = returnSelections(containerId)
        if(selectedYear && selectedMake && selectedModel){
            removeHighlighted(containerId)
            saveOrGoForHomePage(containerId);
            return;
        }
        
        const dropDownResults = await fetchYmmOnlyDataAndRender(containerId)
        manageHighlighted(containerId)

        
    }


    async function setupForHomePage(){
        
        createWrappersForHomePage()
        
        setupYMMform('custom-ymm-form-for-home-page', 'custom-ymm-form-for-home-page', decideWhatHappensAfterFormChangeInHomePage, saveOrGoForHomePage)
        
        var containerId = 'custom-ymm-form-for-home-page'
        
        // following blocks because we dont need them for the home page
        hideSelectTag(containerId, "select-drive-type")
        
        hideSelectTag(containerId, "select-fuel-type")
        
        hideSelectTag(containerId, "select-num-doors")

        var filteredVehicles = customYmm["garage"].filter(vehicle => vehicle.selected)
        
        if(filteredVehicles.length){
            
            selectedVehicle = filteredVehicles[0]
            customYmm[containerId].selections.year = selectedVehicle.year
            customYmm[containerId].selections.make = selectedVehicle.make
            customYmm[containerId].selections.model = selectedVehicle.model
            await fetchYmmOnlyDataAndRender(containerId)
            enableSelectTag(containerId, "btn-go")
            enableSelectTag(containerId, "btn-clear")
        }
        
        hideSelectTag(containerId, "select-drive-type")
        
        hideSelectTag(containerId, "select-fuel-type")
        
        hideSelectTag(containerId, "select-num-doors")
        
    }
