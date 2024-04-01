


   async function setInitialSelections(){

        // customYmm settings related only to the product page
        if(customYmm['settings']!== undefined  && customYmm['settings']['hideProductsUntilSelected'] !== undefined ){
            customYmm['hideProductsUntilSelected'] = customYmm['settings']['hideProductsUntilSelected']
        }else{
            customYmm['hideProductsUntilSelected'] = false
        }

        customYmm["products"] = {}

        customYmm.loadMore = true

        customYmm.productsPerPage = 12

        customYmm.currentPage = 1
        
        customYmm["selectedCategories"] = []

        customYmm["selectedBrands"] = []

        customYmm["selectedPrices"] = []

        customYmm['selectedCategory'] = false
        
        setDefaultCategory()

        retrieveURLparams()

        
        function getUrlParamByKey(key) {
          const urlSearchParams = new URLSearchParams(window.location.search);
          return urlSearchParams.get(key);
        }

        const searchQuery = getUrlParamByKey("sq")

        if(searchQuery !== null){
            customYmm["searchQuery"] = searchQuery.trim()
        }
        
        if(customYmm['isInBrandPage']){
            let brandName = getUrlParamByKey("q")
            if(brandName!==null){
                customYmm['selectedBrands'].push(brandName.replaceAll('%20', ' '))
            }
        }
        
        const ymmContainerIdForSearchPage = 'search-page-ymm-form-container'
        
        let selectedVehicle = false;
        
        if ( (  customYmm["isInCategoryPage"] || customYmm["isInBrandPage"]  || customYmm["isInSearchPage"]) && customYmm["garage"].length > 0 ) {           
            
    
            if(customYmm["garage"].length){
                
                filteredVehicles = customYmm["garage"].filter(vehicle => vehicle.selected)
                if(filteredVehicles.length)
                    selectedVehicle = filteredVehicles[0]
                    
                else if(customYmm['hideProductsUntilSelected'] === true){
                    document.getElementById('garage-btn').click()
                    document.getElementById('add-vehicle-to-garage-button').click()
                }
            }
             
            
            if(selectedVehicle){
                ymm = selectedVehicle
                customYmm[`${ymmContainerIdForSearchPage}`]['selections'] = {
                    year: ymm.year,
                    make: ymm.make,
                    model: ymm.model,
                    drive_type: ymm.drive_type,
                    fuel_type: ymm.fuel_type,
                    num_doors: ymm.num_doors
                }
                manageHighlighted(ymmContainerIdForSearchPage)
                
            }
            
        }else if( (customYmm["isInCategoryPage"] || customYmm["isInSearchPage"] || customYmm["isInBrandPage"]) && customYmm['hideProductsUntilSelected'] === true ){
            document.getElementById('garage-btn').click()
        }
        
        if(customYmm["searchQuery"] != "" || customYmm['hideProductsUntilSelected'] === false || selectedVehicle !== false ){
           fetchProductsAndRender(); 
        }
        
    }


    function retrieveURLparams(){

        // Get the URL
        const url = location.href;

        // Find the part of the URL after the '?'
        const splittedURL = url.split('?')

        if(!(splittedURL.length > 1)) return


        const queryString = splittedURL[1]

        // Split the query string using '/' as the separator
        const queryParts = queryString.split('/');


        // Iterate through the query parts to extract values
        for (let i = 0; i < queryParts.length; i += 2) {
          const key = queryParts[i];
          const value = queryParts[i + 1];
        
          if (key === "category") {
            var category = value;
            category = '/' + value.replaceAll('%3E', '/') +'/';
            customYmm['selectedCategories'].push(category); 
          } else if (key === "brand" || key === "q" && customYmm['isInBrandPage']) {
            // brand = value;
            customYmm['selectedBrands'].push(value.replaceAll('%20', ' '))
          } else if (key === "prices") {
            // prices = value;
            customYmm['selectedPrices'].push(value) 
          }
        }

        if(customYmm['selectedCategories'].length > 0)
            customYmm['selectedCategory'] = customYmm['selectedCategories'][customYmm['selectedCategories'].length-1];

    }


    function setURLparams(){

        // Get the URL
        const url = location.href;

        // Find the part of the URL after the '?'
        let basePath = url.split('?')[0]

        let tail = ''

        if(customYmm['selectedCategory']){


            customYmm['selectedCategories'].forEach(selectedCategory => {
                var value = selectedCategory
                tail += `category/${value.replace(/^\/|\/$/g, '').replace(/\//g, '>')}/`;

            })

        }

        if(customYmm["selectedBrands"].length > 0)
            tail += `brand/${customYmm['selectedBrands'].join(',')}/`

        if(customYmm['selectedPrices'].length > 0)
            tail += `prices/${customYmm['selectedPrices'].join(',')}/`

        if(tail.trim().length > 0)
        basePath += '?' + tail


        history.replaceState({}, '', basePath)

    }


  function decideWhichPageIsIt(){

        if(window.location.href.includes("/products/")) customYmm['isInProductPage'] = true

        else if(window.location.href.includes("/search/") || window.location.href.includes("/search")) customYmm["isInSearchPage"] = true

        else{

            // Check if the current URL matches either version of the homepage URL
            if (document.querySelector(customYmm["isInHomePageChecker"])) {
                // console.log("This is the home page.");
                customYmm["isInHomePage"] = true;
            } else if(window.location.href.includes("/collections/vendors"))  {
                // console.log("This is not the home page.");
                customYmm["isInBrandPage"] = true
            }else if(window.location.href.includes("/collections")){
                customYmm["isInCategoryPage"] = true
            }
        }
    }


