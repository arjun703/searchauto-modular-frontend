    function hideYmmFormInSearchPage(){

        document.querySelector('.ymm-form-search-page').style.display = "none"

        document.querySelector('.ymm-change-or-clear').style.display = "flex"
    }

    function displayYmmFormInSearchPage(){

        document.querySelector('.ymm-form-search-page').style.display = "block"

        document.querySelector('.ymm-change-or-clear').style.display = "none"

    }

    function clearYMMformAndDisplay(){

        document.querySelector('.ymm-form-search-page').querySelector('.btn-clear').click()
        displayBreadCrumb();
        
    }


    function insertWrappersForSearchPage(wrapper){

        let pageWidthFromThemeSettings =''

        if(document.querySelector('#search_auto_data')){
        
            pageWidthFromThemeSettings=  document.querySelector('#search_auto_data').getAttribute('data-site_width')
        }
        
        var columnsPerRowFromThemeSettings = customYmm['settings'].productsPerRow
       

        document.querySelector(wrapper).innerHTML += `

            <div class="ymm-container ${pageWidthFromThemeSettings} container">

                <div class="ymm-form-search-page">
                    
                    <h3 class="ymm-title d-flex align-items-center">
                        Select Your Vehicle
                    </h3>

                    <div class="search-page-ymm-form-container">

                    </div>

                </div>
                
                
                <div class = "ymm-change-or-clear ymm-mt-2 ymm-mb-2 d-flex ymm-justify-content-between" style="display:none">

                    <div class = "ymm-change-or-clear__title">

                    </div>

                    <div class = "change-clear-btn-wrapper d-flex ymm-ju stify-content-around">
                    
                        <div class = "change-vehicle-wrapper">

                            <button onclick = "displayYmmFormInSearchPage()" class = "search-page-change-vehicle-btn button button-primary btn-change">
                                Change your Vehicle
                            </button>

                        </div>

                        <div class = "clear-selection-wrapper">

                            <button onclick = "clearYMMformAndDisplay()" class = "search-page-change-vehicle-btn button button-secondary btn-clear">
                                Clear Selection
                            </button>

                        </div>

                    </div>

                </div>
                
                <div id = "ymm-breadcrumb"></div>
                
                <div id="subcats-container" class="sub-category-item" style="display:none"></div>

                <div class="filters-button-wrapper">
                    <strong> Filter </strong>
                    <button onclick="hideOrShowMobileFilter()" class = "button button-primary filters-button">Filter <svg class="cm_icon cm_filter-icon" viewBox="0 0 247.46 247.46"><path d="m246.74 13.984c-1.238-2.626-3.881-4.301-6.784-4.301h-232.46c-2.903 0-5.545 1.675-6.784 4.301-1.238 2.626-0.85 5.73 0.997 7.97l89.361 108.38v99.94c0 2.595 1.341 5.005 3.545 6.373 1.208 0.749 2.579 1.127 3.955 1.127 1.137 0 2.278-0.259 3.33-0.78l50.208-24.885c2.551-1.264 4.165-3.863 4.169-6.71l0.098-75.062 89.366-108.39c1.848-2.239 2.237-5.344 0.999-7.969zm-103.65 108.89c-1.105 1.34-1.711 3.023-1.713 4.761l-0.096 73.103-35.213 17.453v-90.546c0-1.741-0.605-3.428-1.713-4.771l-80.958-98.191h200.65l-80.958 98.191z"></path></svg>
                </button>
                </div>



                <div class="ymm-filters-products ymm-mb-5 ymm-mt-5">
                    

                    <div class="filters-wrapper-desktop" id="filters-wrapper-desktop"></div>


                    <div class="ymm-products-wrapper">
                        
                        <div class="search-results-count-sort-by">
                            <span class="search-results-count"></span>
                            <div class="sort-by">
                                
                            </div>
                        </div>
                       
                        <div class = "ymm-filters-selections">

                        </div>
                        <div class="no-results-message-outer"></div> 
                        <div class="ymm-products grid-col-${columnsPerRowFromThemeSettings}">
                            
                        
                        </div>

                        <div class = "loading-indicator">
                        </div>
                    
                    </div>
                
                </div>
            
            </div>

        ` 
    }



    function saveOrGoForSearchPage(containerId){
        
        pushToGarage(containerId)
        hideYmmFormInSearchPage();
        fetchProductsAndRender()
        setupGarage(false);
    }


    
    const decideWhatHappensAfterFormChangeInSearchPage = async (containerId) => {
        customYmm.currentPage = 1

        let [selectedYear, selectedMake, selectedModel, selectedDriveType, selectedFuelType, selectedNumDoors] = returnSelections(containerId)
        
        clearContentsForCategoryPage()
        
        let dropdowns = await fetchYmmOnlyDataAndRender(containerId);
        manageHighlighted(containerId)
        dropdowns.drive_type_arr = dropdowns.drive_type_arr.filter(elem=> elem !== '')
        dropdowns.fuel_type_arr = dropdowns.fuel_type_arr.filter(elem=> elem !== '')
        dropdowns.num_doors_arr = dropdowns.num_doors_arr.filter(elem=> elem !== '')
        if(selectedYear && selectedMake && selectedModel  ){
            enableSelectTag(containerId, "btn-go")
        }
        if(
           (
                (dropdowns.makes.length && selectedMake == false ) ||
                (dropdowns.models.length && selectedModel == false ) ||
                (dropdowns.drive_type_arr.length && selectedDriveType == '' ) ||
                (dropdowns.fuel_type_arr.length && selectedFuelType == '' ) ||
                (dropdowns.num_doors_arr.length && selectedNumDoors == '' )
            )
        ){
            if(customYmm['hideProductsUntilSelected'] === true){
                // do nothing, hide products when vehicle selected
            }else{
                fetchProductsAndRender()
            }
        }else{
            removeHighlighted(containerId)
            saveOrGoForSearchPage(containerId);
        } 
    }