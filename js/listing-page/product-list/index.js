    function constructProductDiv(product){
        // aspectRatioSettingsFromTheme = "card_ratio_4_3"
        var aspectRatioSettingsFromTheme =  customYmm['settings'].productCardImageAspectRatio
         
        if(aspectRatioSettingsFromTheme.length ){
            
            if(aspectRatioSettingsFromTheme == '4:3'){
                aspectRatioSettingsFromTheme = "card_ratio_4_3"
            }
            else if(aspectRatioSettingsFromTheme == '1:1'){
                aspectRatioSettingsFromTheme = "card_ratio_1_1"
            }else{
                aspectRatioSettingsFromTheme = ""
            }
            
        }
        return `
            <div class = "product">
                
                <div class="ymm-product-wrapper ymm-product-item">
                    <div class="ymm-product-wrapper-holder">
                        <a href = "${customYmm["siteURL"]}/products/${product.url}/">
                            <div class  = "ymm-product-thumbnail-wrapper ${aspectRatioSettingsFromTheme}">
                               ${returnProductImage(product.thumbnail)}
                            </div>
                         </a>
                        <div class="ymm-product-wrapper-item">
                            <div class = "ymm-product-name-price">
                                
                                ${displayBrand(product.brand)}
                                
                                <div class= "ymm-product-name">
                                     <a href = "${customYmm["siteURL"]}/products/${product.url}/">
                                        ${product.name}
                                    </a>
                                </div>
                                

                                <div class="sale-and-default-price">
                                    
                                    ${displayPrices(product.compare_at_price,product.price)}
            
                                </div>
                            </div>
                    
                            <div class="product-action-buttons">
                                 ${displayAddToCartButton(product.variant_id)} 
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        
         `
    }



function renderProducts(products, append = false){
    
    document.querySelector('.ymm-products').innerHTML = ''
    document.querySelector('.no-results-message-outer').innerHTML = ''
    document.querySelector('.search-results-count').innerHTML = ''
    if(customYmm['searchResultsCount'] > 0){
        
        // alert(customYmm.currentPage)
        document.querySelector('.search-results-count').innerHTML = generateProductRangeText()
           
        document.querySelector('.ymm-products').innerHTML = products.map(product => constructProductDiv(product)).join('')
        
    }else{

        document.querySelector('.no-results-message-outer').innerHTML = `
            <div class="no-results-message">
                <p class="no-results-msg-inner">
                    No any products exist for this filter combination.
                    <br>
                    <a href = "${customYmm["siteURL"]}/search/">Please Click Here</a> to find all the parts that fit your selection or <a href="#"> ${returnClearAllText()} </a> filters.
                </p>
            </div>
        `
    }
}


    function renderCheckbox(category){

        return `
            
            <input 
            
                id = "shop-by-category-${category.url}"
                ${(customYmm["isInCategoryPage"] && category.parent_id == 0) ?'disabled' : '' } 
                type = "checkbox" 
                data-filter-type = "category"
                name = "shop-by-category"
                data-term = "${category.url}"
                data-category-name='${category.name.trim()}'
                class  = "cb-filter" 
                data-category-url = "${category.url}"
                ${customYmm["selectedCategories"].includes(category.url) ? 'checked' : '' } 
            
            />
            
        `

    }


    function displayEachCategory(category){

        return`
            <div class="ymm-categories-item">
                ${renderCheckbox(category)}

                <label for="shop-by-category-${category.url}" class="form-label--checkbox">
                    <span class="category-name">${category.name}</span>
                    <span class="category-hits">${category.hits}</span>
                </label>
            </div>    
        `

    }
