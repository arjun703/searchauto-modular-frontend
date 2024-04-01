  function setupForSearchPage(isCategoryPage = false){

        if(!isCategoryPage)
            insertWrappersForSearchPage(customYmm["searchPageWrapper"])
        else if(isCategoryPage){
            insertWrappersForSearchPage(customYmm["categoryPageWrapper"])
            fetchSubCategoriesAndRender()
        }
        
        setupYMMform('search-page-ymm-form-container', 'search-page-ymm-form-container', decideWhatHappensAfterFormChangeInSearchPage, saveOrGoForSearchPage )

        setInitialSelections()
        displayBreadCrumb()

    }


    function setupForCategoryPage(){
        setupForSearchPage(isCategoryPage = true)
    }
    
    function setupForBrandPage(){
       setupForSearchPage() 
    }


function fetchProductsAndRender(append = false){
    
    var hideProductsUntilVehicleSelected = true;
    
    // hideProductsUntilVehicleSelected =  customYmm['settings'].hideProductsUnlessVehicleSelected

    const ymmContainerId = 'search-page-ymm-form-container'
    
    let [selectedYear, selectedMake, selectedModel, selectedDriveType, selectedFuelType, selectedNumDoors] = returnSelections(ymmContainerId)

    showLoadingOverlay()

    fetch(`${customYmm["searchDataApi"]}?sortby=${customYmm['sortBy']}&drive_type=${selectedDriveType}&fuel_type=${selectedFuelType}&num_doors=${selectedNumDoors}&searchQuery=${customYmm["searchQuery"]}&year=${customYmm[`${ymmContainerId}`].selections.year}&make=${customYmm[`${ymmContainerId}`].selections.make}&model=${customYmm[`${ymmContainerId}`].selections.model}&category=${customYmm['selectedCategory']}&page=${customYmm.currentPage}&limit=${customYmm.productsPerPage}&brands=${customYmm["selectedBrands"].join(',')}&prices=${customYmm["selectedPrices"].join(',')}`)

    .then(response => response.json())

    .then(data => {
        console.log("helloosdfsdfhsf")
        hideLoadingOverlay()

        // console.log('data', data);
        customYmm['searchResultsCount'] = data.count;
        displayMakesAndModels(data, ymmContainerId)
        const dropdowns = data
        hideOrShowFormAfterLoadingDropdownValues(dropdowns, ymmContainerId)

        setSelectedVehicleWithCategoryTitle()

        if(customYmm['isInCategoryPage'] &&  !(selectedYear && selectedModel && selectedMake) && customYmm['hideProductsUntilSelected']){
            console.log("returning because in category page and something is not set")
            return; // as required by client to not shown products in category page until a vehicle is selected
        }
        
        document.querySelector('.ymm-filters-products').style.display = "flex"
        
        const products = data.products

        if(!append) customYmm["products"] = {}

        products.forEach(product => {

            customYmm["products"][`${product.id}`] = product

        })
        
        customYmm["allCounts"] = data.count
        
        renderProducts(data.products, append)

        document.querySelector('.loading-indicator').innerHTML = generatePagination(customYmm.currentPage, 12, customYmm['searchResultsCount']);

        if(data.products.length == customYmm.productsPerPage){

            customYmm.loadMore = true
            
        }else{
            
            customYmm.loadMore = false
        
        }

        customYmm["categories"] = data.categories;

        customYmm["brands"] = data.brands

        customYmm["priceRanngesVsFrequency"] = data.priceRanngesVsFrequency
        
        displayResponsiveFilters();

        // following block should be at the bottom, after displaying the filters

        document.querySelector('.ymm-change-or-clear__title').innerHTML = `
                ${returnSelectionsForBreadCrumb()}
            `
        displayBreadCrumb()
        scrollToTop()

    })

    .catch(error => {
        hideLoadingOverlay()
    })

}
