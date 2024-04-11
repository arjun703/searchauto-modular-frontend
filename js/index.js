    function displayStars(reviewsRatingSum){
    
        if(Math.ceil(reviewsRatingSum) === 0){
            
            var starsConcatenated = ''
            
            for(i =0; i< 5; i++){
                starsConcatenated += returnGreyedOutStar()
            }
            
        }else{
            var  starsConcatenated = ''          
            for(i =0; i< Math.ceil(reviewsRatingSum); i++){
                starsConcatenated += returnColorfulStar()
            } 
            
        }
        
        return starsConcatenated
    }
    
    function formatPrice(price) {
        price = parseFloat(price)
        // If the price has decimals
        if (price % 1 !== 0) {
            // Format with two decimal places
            return price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        } else {
            // Remove any trailing zeros
            return price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
        }
    }
    
    
    function displayPrices(compare_at_price, defaultPrice){
        
        if(compare_at_price !== null && compare_at_price > 0 && parseInt(compare_at_price) !== parseInt(defaultPrice) )
            return`
                <span class="sale-price">$${formatPrice(defaultPrice)}</span>
                <span class="compare-at-price ymm-product-price default-price">$${formatPrice(compare_at_price)}</span>
            `
        else
            return`
                <span class ="sale-price">$${formatPrice(defaultPrice)}</span>
            `           
        
    }


async function addToCart(variantID){
    
let items = {
      id: variantID,
      quantity: 1
    };
    try {
      const response = await fetch("/cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(items),
      });
      console.log(response);
        document.querySelector('.header__icon--cart').click()
    } catch (error) {
      console.error(error);
    }

    
}

function displayAddToCartButton(productID) {
    
    var showCardButtons =  customYmm['settings'].showButtonsInProductCards
    
    if (showCardButtons) {
        return `
            <div class="add-to-cart-btn">
                <a href="#" onclick="addToCart(${productID})"  data-event-type="product-click" data-button-type="add-cart" class="button button--secondary card-figcaption-button halo-add-to-cart" data-product-id="${productID}" data-wait-message="Adding to Cart…">Add to Cart</a>
            </div>`;
    }

    return '';
    
}

    
    function displayOrHideStars(product){
        
        var showReviewsInProductCards = customYmm['settings'].showReviewsInProductCards !== undefined ? true : false
        

        if(showReviewsInProductCards){
            return`
                <div class="stars-and-review-count">
                    <span class="stars">${displayStars(product.reviewsRatingSum)}</span>
                    <span class="review-count">(${product.reviewCount})</span>    
                </div>
            `
        }
        
        return ''
    }
    function returnProductImage(url){
        if(url != null){
            return`
                <img class ="ymm-product-thumbnail" src = "${url}"  />
            `
        }
        return`
            <svg class="placeholder-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 525.5 525.5"><path d="M375.5 345.2c0-.1 0-.1 0 0 0-.1 0-.1 0 0-1.1-2.9-2.3-5.5-3.4-7.8-1.4-4.7-2.4-13.8-.5-19.8 3.4-10.6 3.6-40.6 1.2-54.5-2.3-14-12.3-29.8-18.5-36.9-5.3-6.2-12.8-14.9-15.4-17.9 8.6-5.6 13.3-13.3 14-23 0-.3 0-.6.1-.8.4-4.1-.6-9.9-3.9-13.5-2.1-2.3-4.8-3.5-8-3.5h-54.9c-.8-7.1-3-13-5.2-17.5-6.8-13.9-12.5-16.5-21.2-16.5h-.7c-8.7 0-14.4 2.5-21.2 16.5-2.2 4.5-4.4 10.4-5.2 17.5h-48.5c-3.2 0-5.9 1.2-8 3.5-3.2 3.6-4.3 9.3-3.9 13.5 0 .2 0 .5.1.8.7 9.8 5.4 17.4 14 23-2.6 3.1-10.1 11.7-15.4 17.9-6.1 7.2-16.1 22.9-18.5 36.9-2.2 13.3-1.2 47.4 1 54.9 1.1 3.8 1.4 14.5-.2 19.4-1.2 2.4-2.3 5-3.4 7.9-4.4 11.6-6.2 26.3-5 32.6 1.8 9.9 16.5 14.4 29.4 14.4h176.8c12.9 0 27.6-4.5 29.4-14.4 1.2-6.5-.5-21.1-5-32.7zm-97.7-178c.3-3.2.8-10.6-.2-18 2.4 4.3 5 10.5 5.9 18h-5.7zm-36.3-17.9c-1 7.4-.5 14.8-.2 18h-5.7c.9-7.5 3.5-13.7 5.9-18zm4.5-6.9c0-.1.1-.2.1-.4 4.4-5.3 8.4-5.8 13.1-5.8h.7c4.7 0 8.7.6 13.1 5.8 0 .1 0 .2.1.4 3.2 8.9 2.2 21.2 1.8 25h-30.7c-.4-3.8-1.3-16.1 1.8-25zm-70.7 42.5c0-.3 0-.6-.1-.9-.3-3.4.5-8.4 3.1-11.3 1-1.1 2.1-1.7 3.4-2.1l-.6.6c-2.8 3.1-3.7 8.1-3.3 11.6 0 .2 0 .5.1.8.3 3.5.9 11.7 10.6 18.8.3.2.8.2 1-.2.2-.3.2-.8-.2-1-9.2-6.7-9.8-14.4-10-17.7 0-.3 0-.6-.1-.8-.3-3.2.5-7.7 3-10.5.8-.8 1.7-1.5 2.6-1.9h155.7c1 .4 1.9 1.1 2.6 1.9 2.5 2.8 3.3 7.3 3 10.5 0 .2 0 .5-.1.8-.3 3.6-1 13.1-13.8 20.1-.3.2-.5.6-.3 1 .1.2.4.4.6.4.1 0 .2 0 .3-.1 13.5-7.5 14.3-17.5 14.6-21.3 0-.3 0-.5.1-.8.4-3.5-.5-8.5-3.3-11.6l-.6-.6c1.3.4 2.5 1.1 3.4 2.1 2.6 2.9 3.5 7.9 3.1 11.3 0 .3 0 .6-.1.9-1.5 20.9-23.6 31.4-65.5 31.4h-43.8c-41.8 0-63.9-10.5-65.4-31.4zm91 89.1h-7c0-1.5 0-3-.1-4.2-.2-12.5-2.2-31.1-2.7-35.1h3.6c.8 0 1.4-.6 1.4-1.4v-14.1h2.4v14.1c0 .8.6 1.4 1.4 1.4h3.7c-.4 3.9-2.4 22.6-2.7 35.1v4.2zm65.3 11.9h-16.8c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h16.8v2.8h-62.2c0-.9-.1-1.9-.1-2.8h33.9c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-33.9c-.1-3.2-.1-6.3-.1-9h62.5v9zm-12.5 24.4h-6.3l.2-1.6h5.9l.2 1.6zm-5.8-4.5l1.6-12.3h2l1.6 12.3h-5.2zm-57-19.9h-62.4v-9h62.5c0 2.7 0 5.8-.1 9zm-62.4 1.4h62.4c0 .9-.1 1.8-.1 2.8H194v-2.8zm65.2 0h7.3c0 .9.1 1.8.1 2.8H259c.1-.9.1-1.8.1-2.8zm7.2-1.4h-7.2c.1-3.2.1-6.3.1-9h7c0 2.7 0 5.8.1 9zm-7.7-66.7v6.8h-9v-6.8h9zm-8.9 8.3h9v.7h-9v-.7zm0 2.1h9v2.3h-9v-2.3zm26-1.4h-9v-.7h9v.7zm-9 3.7v-2.3h9v2.3h-9zm9-5.9h-9v-6.8h9v6.8zm-119.3 91.1c-2.1-7.1-3-40.9-.9-53.6 2.2-13.5 11.9-28.6 17.8-35.6 5.6-6.5 13.5-15.7 15.7-18.3 11.4 6.4 28.7 9.6 51.8 9.6h6v14.1c0 .8.6 1.4 1.4 1.4h5.4c.3 3.1 2.4 22.4 2.7 35.1 0 1.2.1 2.6.1 4.2h-63.9c-.8 0-1.4.6-1.4 1.4v16.1c0 .8.6 1.4 1.4 1.4H256c-.8 11.8-2.8 24.7-8 33.3-2.6 4.4-4.9 8.5-6.9 12.2-.4.7-.1 1.6.6 1.9.2.1.4.2.6.2.5 0 1-.3 1.3-.8 1.9-3.7 4.2-7.7 6.8-12.1 5.4-9.1 7.6-22.5 8.4-34.7h7.8c.7 11.2 2.6 23.5 7.1 32.4.2.5.8.8 1.3.8.2 0 .4 0 .6-.2.7-.4 1-1.2.6-1.9-4.3-8.5-6.1-20.3-6.8-31.1H312l-2.4 18.6c-.1.4.1.8.3 1.1.3.3.7.5 1.1.5h9.6c.4 0 .8-.2 1.1-.5.3-.3.4-.7.3-1.1l-2.4-18.6H333c.8 0 1.4-.6 1.4-1.4v-16.1c0-.8-.6-1.4-1.4-1.4h-63.9c0-1.5 0-2.9.1-4.2.2-12.7 2.3-32 2.7-35.1h5.2c.8 0 1.4-.6 1.4-1.4v-14.1h6.2c23.1 0 40.4-3.2 51.8-9.6 2.3 2.6 10.1 11.8 15.7 18.3 5.9 6.9 15.6 22.1 17.8 35.6 2.2 13.4 2 43.2-1.1 53.1-1.2 3.9-1.4 8.7-1 13-1.7-2.8-2.9-4.4-3-4.6-.2-.3-.6-.5-.9-.6h-.5c-.2 0-.4.1-.5.2-.6.5-.8 1.4-.3 2 0 0 .2.3.5.8 1.4 2.1 5.6 8.4 8.9 16.7h-42.9v-43.8c0-.8-.6-1.4-1.4-1.4s-1.4.6-1.4 1.4v44.9c0 .1-.1.2-.1.3 0 .1 0 .2.1.3v9c-1.1 2-3.9 3.7-10.5 3.7h-7.5c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h7.5c5 0 8.5-.9 10.5-2.8-.1 3.1-1.5 6.5-10.5 6.5H210.4c-9 0-10.5-3.4-10.5-6.5 2 1.9 5.5 2.8 10.5 2.8h67.4c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-67.4c-6.7 0-9.4-1.7-10.5-3.7v-54.5c0-.8-.6-1.4-1.4-1.4s-1.4.6-1.4 1.4v43.8h-43.6c4.2-10.2 9.4-17.4 9.5-17.5.5-.6.3-1.5-.3-2s-1.5-.3-2 .3c-.1.2-1.4 2-3.2 5 .1-4.9-.4-10.2-1.1-12.8zm221.4 60.2c-1.5 8.3-14.9 12-26.6 12H174.4c-11.8 0-25.1-3.8-26.6-12-1-5.7.6-19.3 4.6-30.2H197v9.8c0 6.4 4.5 9.7 13.4 9.7h105.4c8.9 0 13.4-3.3 13.4-9.7v-9.8h44c4 10.9 5.6 24.5 4.6 30.2z"></path><path d="M286.1 359.3c0 .4.3.7.7.7h14.7c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-14.7c-.3 0-.7.3-.7.7zm5.3-145.6c13.5-.5 24.7-2.3 33.5-5.3.4-.1.6-.5.4-.9-.1-.4-.5-.6-.9-.4-8.6 3-19.7 4.7-33 5.2-.4 0-.7.3-.7.7 0 .4.3.7.7.7zm-11.3.1c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7H242c-19.9 0-35.3-2.5-45.9-7.4-.4-.2-.8 0-.9.3-.2.4 0 .8.3.9 10.8 5 26.4 7.5 46.5 7.5h38.1zm-7.2 116.9c.4.1.9.1 1.4.1 1.7 0 3.4-.7 4.7-1.9 1.4-1.4 1.9-3.2 1.5-5-.2-.8-.9-1.2-1.7-1.1-.8.2-1.2.9-1.1 1.7.3 1.2-.4 2-.7 2.4-.9.9-2.2 1.3-3.4 1-.8-.2-1.5.3-1.7 1.1s.2 1.5 1 1.7z"></path><path d="M275.5 331.6c-.8 0-1.4.6-1.5 1.4 0 .8.6 1.4 1.4 1.5h.3c3.6 0 7-2.8 7.7-6.3.2-.8-.4-1.5-1.1-1.7-.8-.2-1.5.4-1.7 1.1-.4 2.3-2.8 4.2-5.1 4zm5.4 1.6c-.6.5-.6 1.4-.1 2 1.1 1.3 2.5 2.2 4.2 2.8.2.1.3.1.5.1.6 0 1.1-.3 1.3-.9.3-.7-.1-1.6-.8-1.8-1.2-.5-2.2-1.2-3-2.1-.6-.6-1.5-.6-2.1-.1zm-38.2 12.7c.5 0 .9 0 1.4-.1.8-.2 1.3-.9 1.1-1.7-.2-.8-.9-1.3-1.7-1.1-1.2.3-2.5-.1-3.4-1-.4-.4-1-1.2-.8-2.4.2-.8-.3-1.5-1.1-1.7-.8-.2-1.5.3-1.7 1.1-.4 1.8.1 3.7 1.5 5 1.2 1.2 2.9 1.9 4.7 1.9z"></path><path d="M241.2 349.6h.3c.8 0 1.4-.7 1.4-1.5s-.7-1.4-1.5-1.4c-2.3.1-4.6-1.7-5.1-4-.2-.8-.9-1.3-1.7-1.1-.8.2-1.3.9-1.1 1.7.7 3.5 4.1 6.3 7.7 6.3zm-9.7 3.6c.2 0 .3 0 .5-.1 1.6-.6 3-1.6 4.2-2.8.5-.6.5-1.5-.1-2s-1.5-.5-2 .1c-.8.9-1.8 1.6-3 2.1-.7.3-1.1 1.1-.8 1.8 0 .6.6.9 1.2.9z"></path></svg>
        `

    }

    function displayBrand(brandName){
        if(customYmm['settings'].showBrandInProductCards){
            return`
                <div class="brand-name">
                    ${brandName}
                </div>        
            `
        }
        else{
            return ''
        }
        
    }

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
                                    <div class="price-on-product-item">
                                        ${displayPrices(product.compare_at_price,product.price)}
                                    </div>
                                    <div class="cart-icon">
                                        <a href = "${customYmm["siteURL"]}/products/${product.url}/">
                                            <i class="flaticon-online-shopping-cart"></i>
                                        </a>
                                    </div>
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
        document.querySelector('.no-results-message-outer').innerHTML = ''
        document.querySelector('.search-results-count').innerHTML = ''
        if(customYmm['searchResultsCount'] > 0){

            // alert(customYmm.currentPage)
            document.querySelector('.search-results-count').innerHTML = generateProductRangeText()
            

            if(isPagination){
                document.querySelector('.ymm-products').innerHTML = ''
                document.querySelector('.ymm-products').innerHTML = products.map(product => constructProductDiv(product)).join('')
            }else{
                document.querySelector('.ymm-products').innerHTML += products.map(product => constructProductDiv(product)).join('')
            }
        }else{

            if( customYmm.currentPage == 1){
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
    }

    function createBrandItem(brand){

        return`
            <div class="input-and-label">
                <input ${customYmm['isInBrandPage'] ? 'disabled': ''} ${customYmm["selectedBrands"].includes(brand.name) ? 'checked' : '' } name = "cb-filter" data-filter-type = "brand" class = "cb-filter" type = "checkbox" data-brand-id = "${brand.id}" id = "cb-${brand.id}" data-term = "${brand.name}" >
                <label for  = "cb-${brand.id}" class="form-label--checkbox">
                    <span class="brand-name">${brand.name}</span>
                    <span class="brand-hits">${brand.hits}</span>
                </label>
            </div>
        `

    }

    

    function returnSelectionsForBreadCrumb(){

        const ymmContainerId = 'search-page-ymm-form-container'

        let [selectedYear, selectedMake, selectedModel, selectedSubModel] = returnSelections(ymmContainerId)

        return`
            <h4>${selectedYear || ''} ${selectedMake || ''} ${selectedModel || '' } ${selectedSubModel} </h4>
        `

    }

    function displayBreadCrumb(){
        
        
        if(customYmm['isInSearchPage']){
    
            const sels = [];
            
            const searchQuery = customYmm['searchQuery'];
            
            if(searchQuery.length) sels.push('"'+searchQuery+'"')
            
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


// Function to show the loading overlay
function showLoadingOverlay() {

    // Generate a unique ID for the loading overlay

    // Create the loading overlay HTML markup with the unique ID
    const loadingOverlayHTML = `
    <div class="loadingOverlay loadingOverlay2" style = "display:block;background-color: rgba(0, 0, 0, 0.03)">
        <div class = "loadingIcon loadingText">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
            </svg>
        </div>
    </div>
    `;

    const overlayContainer = document.createElement('div');
    overlayContainer.innerHTML = loadingOverlayHTML;
    document.body.appendChild(overlayContainer.firstElementChild);
}

// Function to hide the loading overlay and remove it from the DOM
function hideLoadingOverlay() {
    const loadingOverlay = document.querySelector('.loadingOverlay2');
    if (loadingOverlay) {
        loadingOverlay.parentNode.removeChild(loadingOverlay);
    }
}



function removeAllFilters(){
    
    customYmm['selectedCategories'].length && removeSelectedCategory(customYmm['selectedCategories'][0]);
    removeSelectedBrand();
    removeSelectedPrice(); 
    customYmm['searchQuery'] = '';
    fetchProductsAndRender();

}

function returnClearAllText(){
    
    if(
        customYmm['selectedPrices'].length || 
        customYmm['selectedBrands'].length ||
        customYmm['searchQuery'].length ||
        (
            !customYmm['isInCategoryPage'] && customYmm['selectedCategories'].length
        )    
    ){
        return'<span class="remove-all" onclick="removeAllFilters()">Start Over</span>'
    }else{
        return ''
    }
    
}

function returnFiltersWrappers(){
    
    return`

        <div class="ymm-filters">
            

            <div class="ymm-brands-wrapper ymm-filters-wrapper-inner">
                
                <div class="filters-heading">
                    <h2 class="h2">FILTER BY</h2>
                </div>
                <div class="ymm-all-filters">
                
                </div>
                
            </div>
            
            <div>
                ${  
                    returnClearAllText()
                }
            </div>

        </div>

        <a href="#" class="close-mobile-filter" onclick="hideOrShowMobileFilter()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M 38.982422 6.9707031 A 2.0002 2.0002 0 0 0 37.585938 7.5859375 L 24 21.171875 L 10.414062 7.5859375 A 2.0002 2.0002 0 0 0 8.9785156 6.9804688 A 2.0002 2.0002 0 0 0 7.5859375 10.414062 L 21.171875 24 L 7.5859375 37.585938 A 2.0002 2.0002 0 1 0 10.414062 40.414062 L 24 26.828125 L 37.585938 40.414062 A 2.0002 2.0002 0 1 0 40.414062 37.585938 L 26.828125 24 L 40.414062 10.414062 A 2.0002 2.0002 0 0 0 38.982422 6.9707031 z"></path></svg>
        </a>
    `
}



function hideOrShowCollapsibleContent(event){
    
    var targetTitleAndIconElem = event.target
    
    var parentCollapsibleWrapper = targetTitleAndIconElem.closest('.collapsible-wrapper')
    
    var correspondingCollapsibleContent = parentCollapsibleWrapper.querySelector('.collapsible-content')
    
    var computedStyle = window.getComputedStyle(correspondingCollapsibleContent);
    
    var targetIconElem = parentCollapsibleWrapper.querySelector('.collapsible-toggle-icon')

    if (computedStyle.display === 'none') {
        correspondingCollapsibleContent.style.display = 'block';
        targetIconElem.innerHTML = returnArrowLeft()
    } else {
        correspondingCollapsibleContent.style.display = 'none';
        targetIconElem.innerHTML = returnArrowDown()
    }
    
}

function removeSelectedCategory(cat){
    // alert(cat)
    if(!customYmm['isInCategoryPage']){
        let index = customYmm['selectedCategories'].indexOf(cat)
        console.log(customYmm['selectedCategories'], "1")
        customYmm['selectedCategories'].splice(index)
        console.log(customYmm['selectedCategories'], "2")
        if(customYmm['selectedCategories'].length){
            customYmm['selectedCategory'] = customYmm['selectedCategories'][customYmm['selectedCategories'].length-1]
        }else{
            customYmm['selectedCategory'] = ''
        }
    }
}

function removeSelectedBrand(){
    if(!customYmm['isInBrandPage']){
        customYmm['selectedBrands'] = [];
    }
        
}

function removeSelectedPrice(){
    customYmm['selectedPrices'] = [];
}

function removeSelectedQuery(){
    customYmm['searchQuery'] = ''
    fetchProductsAndRender()
}

const handleSortByChange = (e) => {
    customYmm['sortBy'] = e.target.value
    fetchProductsAndRender(clearAfterLoad = true)
}


function clearProductDiv(){
    document.querySelector('.ymm-products').innerHTML = ''
}

function fillupFiltersWrappers(){
    
    if(document.querySelector('.ymm-filters-selections')){

        document.querySelector('.ymm-filters-selections').innerHTML = ''

        document.querySelector('.ymm-all-filters').innerHTML = ''


        if(returnClearAllText() !== ''){
            document.querySelector('.ymm-filters-selections').innerHTML = `
                <div class="ymm-filters-selections-inner">
                    <div  class="all-filter-items-wrapper">
                        ${
                            customYmm['searchQuery'].trim().length
                                ? `
                                    <div class="filter-item-wrapper" onclick="removeSelectedQuery()">
                                        <span>
                                            <strong>Query:</strong> 
                                            <span class="query-name filter-name">${customYmm['searchQuery']}</span>
                                        </span>
                                        <span class='close-icon'>
                                            ${returnCloseIcon()}
                                        </span>
                                    </div>

                                `
                                : ''
                        }

                        ${
                            customYmm['selectedCategories'].length 
                            ? `
                                ${
                                    customYmm['selectedCategories']
                                    .map(cat => {
                                        return`
                                            <div class="filter-item-wrapper category-name-wrapper ${customYmm['isInCategoryPage'] ? 'greyed-out': ''}" 
                                                onclick="removeSelectedCategory('${cat}');fetchProductsAndRender()">
                                                <span>
                                                    <strong>Category:</strong> 
                                                    <span class="category-name filter-name"> ${customYmm['selectedCategoryURLVsName'][cat] || cat.replaceAll('/', ' ').trim()}</span>
                                                </span>
                                                <span class="close-icon">${ !customYmm['isInCategoryPage'] ?  returnCloseIcon() : '' }</span>
                                            </div>
                                        `   
                                    })
                                    .join('')     
                                }
                            `
                            : ''
                        }

                        ${
                            customYmm['selectedBrands'].length
                                ?   `
                                    ${
                                        customYmm['selectedBrands']
                                        .map(brand => {
                                            return`
                                                <div class="brand-name-wrapper ${customYmm['isInBrandPage'] ? 'greyed-out': ''} filter-item-wrapper" onclick="removeSelectedBrand();fetchProductsAndRender()">
                                                    <span>
                                                        <strong>Brand:</strong> 
                                                        <span class="brand-name filter-name"> ${brand}</span>
                                                    </span>
                                                    <span class="close-icon">
                                                        ${!customYmm['isInBrandPage'] ?  returnCloseIcon() : ''}
                                                    </span>
                                                </div>
                                            `   
                                        })
                                        .join('')
                                    }

                                `
                                : ''
                        }

                        ${
                            customYmm['selectedPrices'].length 
                                ? `
                                    ${
                                        customYmm['selectedPrices']
                                        .map(price => {
                                            return`
                                                <div class="price-name-wrapper filter-item-wrapper" onclick="removeSelectedPrice();fetchProductsAndRender()">
                                                    <span>
                                                        <strong>Price:</strong> 
                                                        <span class="price-name filter-name"> ${customYmm["priceIdsAndLabels"][price] || price }</span>
                                                    </span>
                                                    <span class="close-icon"">
                                                        ${returnCloseIcon()}
                                                    </span>
                                                </div>
                                            `   
                                        })
                                        .join('')
                                    }
                                `
                            : ''
                        }
                    </div>
                    <div class="start-over-wrapper">
                        ${returnClearAllText()}
                    </div>
                </div>
            `
        } 
    }
        

    if(customYmm["brands"]){
        brandData = customYmm["brands"];
        
        if(!brandData.length) return

        document.querySelector('.ymm-all-filters').innerHTML    += `
            <div class="ymm-brands ymm-filter-item">
                <div class="collapsible-wrapper">
                    <div class="collapsible-title-icon" onclick="hideOrShowCollapsibleContent(event)">
                        <h3>Brand</h3>
                        <div class="collapsible-toggle-icon" >${returnArrowLeft()}</div>
                    </div>
                    <div class="collapsible-content">
                        ${brandData.map(brand => createBrandItem(brand)).join(' ')}
                    </div>
                </div>
            </div>
        `

    }

    const categories = customYmm["categories"] ;

    if(categories.length){
        displayCategories(categories)
    }
    if(customYmm['brands'].length){
        displayPriceRanges()
        assignListenerToTheCheckBoxes()
    }

    const sortOptions = [
        {
            value: "default",
            label: "Default"
        },
        {
            value: "price-low-to-high",
            label: "Price Low to High"
        },
        {
            value: "price-high-to-low",
            label: "Price High to Low"
        },
        {
            value: "title-a-to-z",
            label: "Title A to Z"
        },
        {
            value: "title-z-to-a",
            label: "Title Z to A"
        }
    ];
    

    document.querySelector('.sort-by').innerHTML = `
        <div class="sort-by-wrapper-inner">
            <span class="sort-by-text">Sort By</div>
            <select class="sort-by-select select" onChange="handleSortByChange(event)">
                ${
                    sortOptions.map(({value, label}) => {
                        return`
                            <option value="${value}" ${ value === customYmm['sortBy'] ? 'selected' : '' }>${label}</option>
                        `
                    }).join(' ')
                }
            </select>
        </div>
    `;
    
}

window.onresize = function(){
    console.log("reeized")
    displayResponsiveFilters()
}

function displayResponsiveFilters(){
    
    if(!(customYmm['isInCategoryPage'] || customYmm['isInSearchPage'] || customYmm['isInBrandPage'] )) return

    if(window.innerWidth > 1024){
    
        // desktop
        console.log("display only in desktop ")
        document.querySelector(customYmm['filtersWrapperDesktop']).innerHTML = returnFiltersWrappers()
        document.querySelector(customYmm['filtersWrapperMobile']).innerHTML = ''


    }else{
    
        // mobile
        console.log("display only in mobile")
        document.querySelector(customYmm['filtersWrapperDesktop']).innerHTML = ''
        document.querySelector(customYmm['filtersWrapperMobile']).innerHTML = returnFiltersWrappers()

    }

    fillupFiltersWrappers();


}

function  clearContentsForCategoryPage(){
    
    // document.querySelector('.ymm-categories').innerHTML = ''
    // document.querySelector('.ymm-brands').innerHTML = ''
    // document.querySelector('.ymm-price').innerHTML = ''
    // document.querySelector('.ymm-products').innerHTML = ''
    // document.querySelector('.loading-indicator').innerHTML = ''
    // document.querySelector('.ymm-filters-products').style.display = "none"
    
}

    function fetchPreviousPage(){
        customYmm.currentPage -= 1
        fetchProductsAndRender(); 
    }

    function fetchNextPage(){
        customYmm.currentPage += 1
        fetchProductsAndRender(); 
    }
    
    // Function to fetch new data (replace this with your fetchNewData() logic)
    function fetchNewData(pageNumber) {
        // document.querySelector('.loading-indicator').innerHTML = "<h4>Loading</h4>"
        customYmm.currentPage = pageNumber;
        fetchProductsAndRender(); 
    }


    function returnPreviousIcon(){
        return`
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.99979 14C7.26498 13.9999 7.51929 13.8945 7.70679 13.707C7.89426 13.5195 7.99957 13.2652 7.99957 13C7.99957 12.7348 7.89426 12.4805 7.70679 12.293L2.41179 7L7.70679 1.707C7.89426 1.51947 7.99957 1.26516 7.99957 0.999996C7.99957 0.734832 7.89426 0.480524 7.70679 0.292996C7.51926 0.105525 7.26495 0.000209808 6.99979 0.000209808C6.73462 0.000209808 6.48031 0.105525 6.29279 0.292996L0.292787 6.293C0.105316 6.48052 0 6.73483 0 7C0 7.26516 0.105316 7.51947 0.292787 7.707L6.29279 13.707C6.38539 13.8002 6.49557 13.874 6.61693 13.9243C6.73829 13.9746 6.86842 14.0004 6.99979 14Z" fill="white"/>
            </svg>
        `
    }

    function returnNextIcon(){
        return`
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.999847 13.9998C0.734653 13.9997 0.48034 13.8943 0.292847 13.7068C0.105376 13.5193 6.10352e-05 13.265 6.10352e-05 12.9998C6.10352e-05 12.7346 0.105376 12.4803 0.292847 12.2928L5.58785 6.99979L0.292847 1.70679C0.105376 1.51926 6.10352e-05 1.26495 6.10352e-05 0.999786C6.10352e-05 0.734622 0.105376 0.480314 0.292847 0.292787C0.480375 0.105316 0.734683 0 0.999847 0C1.26501 0 1.51932 0.105316 1.70685 0.292787L7.70685 6.29279C7.89432 6.48031 7.99963 6.73462 7.99963 6.99979C7.99963 7.26495 7.89432 7.51926 7.70685 7.70679L1.70685 13.7068C1.61424 13.8 1.50407 13.8738 1.38271 13.9241C1.26135 13.9744 1.13122 14.0001 0.999847 13.9998Z" fill="white"/>
            </svg>
        `
        
    }
    
function generatePagination(currentPage, resultsPerPage, totalResults) {

    console.log(currentPage, resultsPerPage, totalResults)
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const numLinksBeforeAfter = window.innerWidth < 768 ? 0 : 2;
    const paginationLinks = [];

    // Add "Previous" button
    if (currentPage > 1) {
        paginationLinks.push({ label: 'Previous', page: currentPage - 1 });
    }

    totalPagesThreshold = window.innerWidth < 768 ? 3 : 6;

    // Add page links
    if (totalPages <= totalPagesThreshold) {
        for (let page = 1; page <= totalPages; page++) {
            paginationLinks.push({ label: String(page), page });
        }
    } else {
        // Show links around the current page
        for (let page = Math.max(1, currentPage - numLinksBeforeAfter); page <= Math.min(totalPages, currentPage + numLinksBeforeAfter); page++) {
            paginationLinks.push({ label: String(page), page });
        }

        // Add ellipsis if there are more pages
        if (currentPage + numLinksBeforeAfter < totalPages) {
            paginationLinks.push({ label: '...', disabled: true });
             // Add the last page
            paginationLinks.push({ label: String(totalPages), page: totalPages });
        }
       
    }

    // Add "Next" button
    if (currentPage < totalPages) {
        paginationLinks.push({ label: 'Next', page: currentPage + 1 });
    }

    console.log(paginationLinks)

    // return paginationLinks;
    
    const links = paginationLinks.map(link => {
        return`
            <li 
                class="pagination-link ${customYmm.currentPage == link.page ? 'active' : '' } ${link.label == 'Previous' || link.label == 'Next' ? 'pagination-btn' : '' } ${link.label == '...' ? 'disabled' : '' }"
                onclick="${ !(link.label == '...' || customYmm.currentPage == link.page)  ? 'fetchNewData('+link.page+')' : ''} "
            >
                ${
                    link.label == 'Previous'
                        ? returnPreviousIcon()
                        : link.label == 'Next'
                            ? returnNextIcon()
                            : link.label
                }
            </li>
        `
    }).join('')
    
    return `
        <ul class="pagination">
            ${links}
        </ul>
        <div class="search-results-count">
            ${generateProductRangeText()}
        </div>
    `
    
}


    function setSelectedVehicleWithCategoryTitle(){
        
        const ymmContainerId = 'search-page-ymm-form-container'
        
        let [selectedYear, selectedMake, selectedModel, selectedSubModel] = returnSelections(ymmContainerId)

        if(customYmm['isInCategoryPage'] && document.querySelector('.page-listing-header--content')){
                
            var pageListingHeaderContent = document.querySelector('.page-listing-header--content')
            
            if(pageListingHeaderContent.querySelector('h1.page-heading') ){
                
                var pageHeadingContainer = pageListingHeaderContent.querySelector('h1.page-heading')
                var pageHeading= pageHeadingContainer.innerText
                
                if(customYmm['originalCateogry'] == undefined){
                    customYmm['originalCateogry'] = pageHeading
                }

                if(selectedYear && selectedModel && selectedMake)

                    pageHeadingContainer.innerText =  `${returnSelections(ymmContainerId).join(' ')}` + " " + customYmm['originalCateogry']
                else
                    pageHeadingContainer.innerText = customYmm['originalCateogry']
                
            }
            
        }
        
    }

function generateProductRangeText() {
    
    if(customYmm['searchResultsCount'] == 0){
        return ''
    }else{
        return customYmm['searchResultsCount'] + ' results'
    }    
    
    currentPage = customYmm['currentPage'], totalResults = customYmm['searchResultsCount'] , productsPerPage = 12
    
    // Calculate the start and end indices of products on the current page
    const startIndex = (currentPage - 1) * productsPerPage + 1;
    let endIndex = currentPage * productsPerPage;
    endIndex = endIndex > totalResults ? totalResults : endIndex;

    // Generate the text
    const rangeText = `<span class="results-range">${startIndex}-${endIndex}</span>`;

    // Generate the final text
    const resultText = `${rangeText} of <span class="total-results"> ${totalResults} </span> products`;
    return resultText;
}

            const isPagination =false

        function displayLoadMore(){
            if(customYmm['searchResultsCount'] >= 12){
                return `
                    <div>
                        <button  onclick="document.querySelector('.button-load-more').innerText='Loading';document.querySelector('.button-load-more').disabled=true ;fetchNextPage(); " class = "button button-load-more button-primary" >
                            Load More
                        </button>
                    </div>
                `
            }else{
                return`
                    <div class="end-of-results">
                        End of Results
                    </div>
                `
            }
        }

    function fetchProductsAndRender(  clearAfterLoad  = false){
        
        // clear after load meaning whether or not to clear the product previously fetched

        var hideProductsUntilVehicleSelected = true;
        
        // hideProductsUntilVehicleSelected =  customYmm['settings'].hideProductsUnlessVehicleSelected

        const ymmContainerId = 'search-page-ymm-form-container'
        
        let [selectedYear, selectedMake, selectedModel, selectedSubModel] = returnSelections(ymmContainerId)

        showLoadingOverlay()

        fetch(`${customYmm["searchDataApi"]}?sortby=${customYmm['sortBy']}&sub_model=${selectedSubModel}&searchQuery=${customYmm["searchQuery"]}&year=${customYmm[`${ymmContainerId}`].selections.year}&make=${customYmm[`${ymmContainerId}`].selections.make}&model=${customYmm[`${ymmContainerId}`].selections.model}&category=${customYmm['selectedCategory']}&page=${customYmm.currentPage}&limit=${customYmm.productsPerPage}&brands=${customYmm["selectedBrands"].join(',')}&prices=${customYmm["selectedPrices"].join(',')}`)
    
        .then(response => response.json())

        .then(data => {

            if(clearAfterLoad){
                clearProductDiv()
            }

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

           customYmm["products"] = {}

            products.forEach(product => {

                customYmm["products"][`${product.id}`] = product

            })
            
            customYmm["allCounts"] = data.count
            
            renderProducts(data.products)


            if(isPagination){
                document.querySelector('.loading-indicator').innerHTML = generatePagination(customYmm.currentPage, 12, customYmm['searchResultsCount']);
            }else{
                document.querySelector('.loading-indicator').innerHTML = displayLoadMore()
            }


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

function scrollToTop() {
    if(!isPagination) return 
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Add smooth scrolling behavior if supported
    });
}
      


   function displayPriceRanges(){

        const priceIdsAndLabels = customYmm["priceIdsAndLabels"]
    
        // console.log(uniquePriceIdsPresent);

        function createPriceItem(id, name){

            return`
                <div class="input-and-label">
                    <input ${customYmm["selectedPrices"].includes(id) ? 'checked' : ''} data-term = "${id}" name = "cb-filter" data-filter-type = "price" class = "cb-filter" type = "checkbox" data-price-id = "${id}" id = "cb-${id}">
                    <label for  = "cb-${id}" class="form-label--checkbox">
                        
                        <span class="brand-name">${name}</span>
                        <span class="brand-hits">${customYmm["priceRanngesVsFrequency"][id]}</span>                        
                            
                    </label>
                </div>
            `

        }


          
        document.querySelector('.ymm-all-filters').innerHTML += `
            <div class="ymm-price ymm-filter-item">
                <div class="collapsible-wrapper">
                    <div  class="collapsible-title-icon" onclick="hideOrShowCollapsibleContent(event)">
                        <h3>Price</h3>
                        <div class="collapsible-toggle-icon" >${returnArrowLeft()}</div>
                    </div>
                    <div class="collapsible-content">
                        ${Object.keys(priceIdsAndLabels).filter(id=>customYmm["priceRanngesVsFrequency"][id] > 0 ).map(key => createPriceItem(key, priceIdsAndLabels[key]) ).join(' ')}
                    </div>
                </div>
            </div>
        `

    }



    function convertArrayOrObjectToArray(arrayOrObject){
      
      if(Array.isArray(arrayOrObject)) return arrayOrObject
      
      else{

        let arrayForm = []

        for(var k in arrayOrObject){
          arrayForm.push(arrayOrObject[k])
        }

        return arrayForm;
      }

    }


    // Function to filter products based on brand IDs
    function filterProductsByBrandIds(products, brandIds) {
      return Object.keys(products)
        .filter((productId) => products[productId].brand != undefined ? brandIds.includes(products[productId].brand.pid.toString()) : false )
        .reduce((filteredProducts, productId) => {
          filteredProducts[productId] = products[productId];
          return filteredProducts;
        }, {});
    }

    function returnUniqueObjects(duplicates){

        // Create a Set to keep track of unique objects based on "id"
        const uniqueObjectsSet = new Set();

        return duplicates.filter(obj => {
            const id = obj.id;
            if (!uniqueObjectsSet.has(id)) {
                uniqueObjectsSet.add(id);
                return true;
            }
            return false;
        });

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



    function retrieveURLparams(){

        // Get the URL
        var url = window.location.href;

        // Find the part of the URL after the '?'
        const splittedURL = url.split('?')

        


        let queryString = splittedURL[0]


        // Get the URL from the browser's address bar
        
        // Create a new URL object
        var parsedUrl = new URL(url);
        
        // Retrieve the protocol (http or https)
        var protocol = parsedUrl.protocol;
        
        // Retrieve the hostname (website name)
        var hostname = parsedUrl.hostname;
        // Find the part of the URL after the '?'
        let basePath = protocol+'//'+hostname+'/'
        queryString = queryString.replaceAll(basePath, '')
        // Split the query string using '/' as the separator
        const queryParts = queryString.split('/');
                
console.log(queryParts)
        // Iterate through the query parts to extract values
        for (let i = 0; i < queryParts.length; i += 2) {
          let key = queryParts[i];
          let value = queryParts[i + 1]
            console.log("keybalur")
            console.log(key, value)
          if (key === "category") {
            var category = value;
            category =  value.replaceAll('%3E', '/') 
            customYmm['selectedCategory'] = category 
            customYmm['selectedCategories'].push(category); 
          } else if (key === "brand" || key === "q" && customYmm['isInBrandPage']) {
            // brand = value;
            customYmm['selectedBrands'].push(value.replaceAll('_', ' '))
          } else if (key === "prices") {
            // prices = value;
            customYmm['selectedPrices'].push(value) 
          } else if(key === "v"){
              value = value.replaceAll('%3E', '>');
               let [selectedYear=false, selectedMake=false, selectedModel=false, selectedSubModel=''] 
                    = value.split('>').map(e=>e.replaceAll('_', ' '))
            customYmm['search-page-ymm-form-container']['selections'] = {
                year: selectedYear,
                make: selectedMake,
                model: selectedModel,
                sub_model: selectedSubModel
            }
            manageHighlighted('search-page-ymm-form-container')
          }
        }

        if(customYmm['selectedCategories'].length > 0)
            customYmm['selectedCategory'] = customYmm['selectedCategories'][customYmm['selectedCategories'].length-1];

    }


    function setURLparams(){

        // Get the URL from the browser's address bar
        var url = window.location.href;
        
        // Create a new URL object
        var parsedUrl = new URL(url);
        
        // Retrieve the protocol (http or https)
        var protocol = parsedUrl.protocol;
        
        // Retrieve the hostname (website name)
        var hostname = parsedUrl.hostname;
        // Find the part of the URL after the '?'
        let basePath = protocol+'//'+hostname+'/a/search/'

        let tail = ''

        if(customYmm['selectedCategory']){

            customYmm['selectedCategories'].forEach(selectedCategory => {
                var value = selectedCategory
                tail += `category/${value.replace(/^\/|\/$/g, '').replace(/\//g, '>')}/`;

            })

        }

        if(customYmm["selectedBrands"].length > 0)
            tail += `brand/${customYmm['selectedBrands'].map(b=>b.replaceAll(' ', '_')).join(',')}/`

        if(customYmm['selectedPrices'].length > 0)
            tail += `prices/${customYmm['selectedPrices'].join(',')}/`

        if(customYmm['isInCategoryPage'] || customYmm['isInSearchPage']){
            let [selectedYear, selectedMake, selectedModel, selectedSubModel] = returnSelections('search-page-ymm-form-container')
            let ymmdfn = [selectedYear, selectedMake, selectedModel, selectedSubModel]
            ymmdfn = ymmdfn.filter(e=> (e !== false && e!== '')).map(ee=>ee.replaceAll(' ', '_'))
            if(ymmdfn.length){
                tail += `v/${ymmdfn.join('>')}/`
            }
        }

        if(tail.trim().length > 0)
        basePath +=  tail

        // history.replaceState({}, '', basePath)

    }



    function assignListenerToTheCheckBoxes(){

        // Get all checkboxes with the class "cb-filter"
        const checkboxes = document.querySelectorAll('.cb-filter');

        // Function to handle the change event
        function handleCheckboxChange(event) {

            customYmm.currentPage = 1

            customYmm.loadMore = true
            if(event.target.getAttribute("data-filter-type") == "category"){
                
                uncheckSiblingsAndHideChildren(event.target)

            }

            const checkedCheckboxes = Array.from(checkboxes).filter((checkbox) => checkbox.checked);

            const selectedBrands = [];

            let selectedCategories = [];

            let selectedPrices = [];

            checkedCheckboxes.forEach(checkedCheckbox => {

            switch(checkedCheckbox.getAttribute("data-filter-type")){

                case "category":
                    
                    const selectedCategoryId = checkedCheckbox.getAttribute('data-category-url')
                    
                    const categoryName = checkedCheckbox.getAttribute('data-category-name')
                    
                    selectedCategories.push(selectedCategoryId);
                    
                    customYmm['selectedCategoryURLVsName'][selectedCategoryId] = categoryName
                    
                break;

                case "brand":
                   selectedBrands.push(checkedCheckbox.getAttribute('data-term'))
                break;

                case "price":
                    selectedPrices.push(checkedCheckbox.getAttribute('data-term'))
                break;

            }

            })

            customYmm["selectedCategories"] = selectedCategories;

            customYmm["selectedBrands"] = selectedBrands

            customYmm["selectedPrices"] = selectedPrices

            if(selectedCategories.length > 0){
            
                // console.log(selectedCategories)
                customYmm["selectedCategory"] = selectedCategories[selectedCategories.length-1]
                
            
            }else{

                customYmm["selectedCategory"] = false
            
                setDefaultCategory()
            
            }


            setURLparams()


            fetchProductsAndRender(clearAfterLoad = true)


        }


        // Add a "change" event listener to each checkbox
        checkboxes.forEach((checkbox) => {

          checkbox.addEventListener('change', handleCheckboxChange);
        
        });

    }


    function convertCategoriesToHierarchialForm(categories) {

      const categoryMap = {};
      const rootCategories = [];

      // Create a map of categories by their id
      categories.forEach(category => {
        category.children = [];
        categoryMap[category.id] = category;
      });

      // Build the hierarchy by iterating through the categories
      categories.forEach(category => {
        if (parseInt(category.parent_id) === 0) {
          // If it's a root category, add it to the rootCategories array
          rootCategories.push(category);
        } else {
          // If it's not a root category, add it as a child of its parent (if the parent exists)
          const parent = categoryMap[category.parent_id];
          if (parent) {
            parent.children.push(category);
          }
        }
      });

      // console.log(rootCategories)

      return rootCategories;
    }

    function displayCategories(categories){

        if(categories.length > 0){

            const hierarchicalData = categories;

            document.querySelector('.ymm-all-filters').innerHTML += `
                <div class="ymm-categories ymm-filter-item">
                    <div class="collapsible-wrapper">
                        <div class="collapsible-title-icon" onclick="hideOrShowCollapsibleContent(event)" >
                            <h3>Category</h3>
                            <div class="collapsible-toggle-icon">${returnArrowLeft()}</div>
                        </div>
                        <div class="collapsible-content">
                            <ul id="tree" class="tree"></ul>
                        </div>
                    </div>
                </div>
            `

            const treeContainer = document.getElementById('tree');

            renderTree(hierarchicalData, treeContainer)

        }   
    }       

    // arrayFormunction to render the tree
            
    function renderTree(categoryTree, container) {
            
        categoryTree.forEach(category => {

            const categoryHolder = document.createElement('li')

            categoryHolder.innerHTML = displayEachCategory(category)

            container.appendChild(categoryHolder)

            if (category.children.length > 0) {

                const childrenContainer = document.createElement('ul');

                childrenContainer.className = `tree  ${customYmm["selectedCategories"].includes(category.url) ? '' : 'hidden' } `;

                categoryHolder.appendChild(childrenContainer);

                renderTree(category.children, childrenContainer); // Recursively display children
            
            }

        });

    }

    // Function to uncheck siblings and hide their children
    function uncheckSiblingsAndHideChildren(checkbox) {
        
        function uncheckChildren(childrenContainer){


            const siblingChildrenContainer = childrenContainer.querySelector('ul');

            if(siblingChildrenContainer){

                siblingChildrenContainer.classList.add('hidden');
                
                // Uncheck children checkboxes of siblings
                const siblingChildrenCheckboxes = siblingChildrenContainer.querySelectorAll('input[type="checkbox"]');
                
                siblingChildrenCheckboxes.forEach(childCheckbox => {
                
                    childCheckbox.checked = false;
                
                });

            }


        }

        const parentListItem = checkbox.closest('li');
        
        if (parentListItem) {
            
            const siblings = Array.from(parentListItem.parentElement.children);
            
            siblings.forEach(sibling => {
                
                if (sibling !== parentListItem) {
                    
                    const siblingCheckbox = sibling.querySelector('input[type="checkbox"]');
                    
                    if(siblingCheckbox) siblingCheckbox.checked = false;
                    
                    uncheckChildren(sibling)
                }

            });

        }

        if(!(checkbox.checked)){

            if(checkbox.closest('li').querySelector('ul')){
                checkbox.closest('li').querySelector('ul').classList.add("hidden")
                uncheckChildren(checkbox.closest('li'))

            }

        }

    }
    
    function createFiltersMobileWrapperAndAppend(){


        const filtersWrapperMobile  = document.createElement('div')


        filtersWrapperMobile.id = "filters-wrapper-mobile";

        filtersWrapperMobile.className = customYmm['filtersWrapperMobileSidebarClass'];

        document.body.appendChild(filtersWrapperMobile);           


    }
        
/****************** whole global object *******************************/

    const customYmm = {}
    
    customYmm['sortBy'] = 'default';

    customYmm["priceIdsAndLabels"] = {
        '*-50': '$50 and less',
        '50-100': '$50 to $100',
        '100-250': '$100 to $250',
        '250-500': '$250 to $500',
        '500-1000': '$500 to $1000',
        '1000-*': '$1000 and more'
    }


/********************** setup local or production enviouronment **********/

//  customYmm["development"] = "local"
    customYmm["development"] = "production"


/******************** API URLs ******************************************/

    // bigcommerce store URL

    // customYmm["siteURL"] = 'https://zoon.mybigcommerce.com'

    function returnSiteURL(){
        var url = window.location.href
        var parsedUrl = new URL(url);
        var baseUrl = parsedUrl.protocol + "//" + parsedUrl.hostname;
        return baseUrl;
    }

    customYmm["siteURL"] = returnSiteURL();
        
    // customYmm["siteURL"] = 'https://zoon.mybigcommerce.com';
        
    /********************** for local development ***************************/  
                    
    if(customYmm["development"] == "local"){

        customYmm["ymmOnlyApi"] = "provide-ymm-data-only.php"

        customYmm["fitmentDataApi"] = "provide-fitment-data.php"

        customYmm["searchDataApi"] = "search.php"

        customYmm["linkToCssFile"] = "index.css"

    }else{

        /***************** for production **********************************/
    
        customYmm['selectedCategoryURLVsName']= {};        

        customYmm['ymmDomain'] = 'https://auto.searchalytics.com/flextread/integration'

        customYmm["ymmOnlyApi"] =  customYmm['ymmDomain'] + "/provide-ymm-data-only.php"

        customYmm["fitmentDataApi"] = customYmm['ymmDomain'] + "/provide-fitment-data.php"

        customYmm["searchDataApi"] = customYmm['ymmDomain'] + "/search.php"
        
        customYmm["linkToCssFile"] = "https://apps.cartmade.com/arjun/flextread/index.css"

        customYmm["subCategoryAPI"] = customYmm['ymmDomain'] + "/provideSubCategories.php"
        
    }


/********************* find which page the user is at *******************/

    customYmm["isInHomePage"] = false
    customYmm["isInProductPage"] = false
    customYmm["isInCategoryPage"] = false
    customYmm["isInBrandPage"] = false
    customYmm["isInSearchPage"] = false
    
/******************** already present wrapper classes *******************/

    // need-to-change for evey site

    customYmm["productPageWrapper"] = ".product_meta"
    customYmm["homePageWrapper"] = "#home-page-wrapper"
    customYmm["searchPageWrapper"] = "#searchpagewrapper"
    customYmm["subCatContainerForCategoryPage"] = "#subcats-container"
    
    customYmm["categoryPageWrapper"] = "#searchpagewrapper"
    customYmm["brandPageWrapper"] = "#searchpagewrapper"
    // customYmm["garageButtonWrapper"] = ".header-single-line__item"
    customYmm["garageButtonWrapper"] = ".header-nav-inner"
    customYmm["garageButtonWrapperMobile"] = ".section-header-mobile";
    
    customYmm["quickSearchWrapper"] = ".search-modal__content"
    customYmm["searchQuery"] = ""
    
    customYmm["fitmentTableWrapper"] = ".fitment-content"
    customYmm["fitmentTabLinkWrapper"] = ".productView-bottom .tabs"

    customYmm['isInHomePageChecker'] = '#suspensionbroshomewrapper'

    customYmm['filtersWrapperMobile'] = '#filters-wrapper-mobile';
    customYmm['filtersWrapperDesktop'] = '.filters-only-wrapper';

    customYmm['filtersWrapperMobileSidebarClass'] = "halo-sidebar halo-sidebar-left";


    createFiltersMobileWrapperAndAppend();


/********************* svgs  ***************************************************/

    customYmm["svgCross"] = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_5_22)">
<path d="M19.408 3.41599C19.5938 3.23017 19.7412 3.00957 19.8418 2.76678C19.9423 2.524 19.9941 2.26378 19.9941 2.00099C19.9941 1.7382 19.9423 1.47799 19.8418 1.2352C19.7412 0.992413 19.5938 0.771811 19.408 0.585991C19.2222 0.40017 19.0016 0.252772 18.7588 0.152206C18.516 0.0516411 18.2558 -0.00012207 17.993 -0.00012207C17.7302 -0.00012207 17.47 0.0516411 17.2272 0.152206C16.9844 0.252772 16.7638 0.40017 16.578 0.585991L9.99999 7.17499L3.41599 0.591988C3.04071 0.216706 2.53172 0.00587462 2.00099 0.00587463C1.47026 0.00587464 0.961271 0.216706 0.58599 0.591988C0.210709 0.967269 -0.000122059 1.47626 -0.00012207 2.00699C-0.000122081 2.53772 0.210709 3.04671 0.58599 3.42199L7.17499 9.99999L0.59199 16.584C0.216709 16.9593 0.00587792 17.4683 0.00587793 17.999C0.00587795 18.5297 0.216709 19.0387 0.59199 19.414C0.967272 19.7893 1.47626 20.0001 2.00699 20.0001C2.53772 20.0001 3.04671 19.7893 3.42199 19.414L9.99999 12.83L16.584 19.408C16.7698 19.5938 16.9904 19.7412 17.2332 19.8418C17.476 19.9423 17.7362 19.9941 17.999 19.9941C18.2618 19.9941 18.522 19.9423 18.7648 19.8418C19.0076 19.7412 19.2282 19.5938 19.414 19.408C19.5998 19.2222 19.7472 19.0016 19.8478 18.7588C19.9483 18.516 20.0001 18.2558 20.0001 17.993C20.0001 17.7302 19.9483 17.47 19.8478 17.2272C19.7472 16.9844 19.5998 16.7638 19.414 16.578L12.83 9.99999L19.408 3.41599Z" fill="#C2C2C2"/>
</g>
<defs>
<clipPath id="clip0_5_22">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>
`

/*************************** garage **********************************************/


    if(getCookie("garage")) customYmm["garage"] = JSON.parse(getCookie("garage"))
    else customYmm["garage"] = []


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

        let [selectedYear, selectedMake, selectedModel, selectedSubModel] = returnSelections(containerId)

        carrySelectedVehicle();

        let fits = false; // Flag to track if a fit is found
        
        const targetElement = document.querySelector(`.${fitmentResultClass}`);

        customYmm["fitmentData"].forEach((fitmentData, index) => {
            if (
                (selectedYear >= parseInt(fitmentData.from_year) && selectedYear <= parseInt(fitmentData.to_year)) &&
                selectedMake == fitmentData.make.trim() &&
                selectedModel == fitmentData.model.trim() &&
                (selectedSubModel == '' || fitmentData.sub_model.trim() == '' || selectedSubModel == fitmentData.sub_model.trim())
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
                            ${selectedSubModel}
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
                        ${selectedSubModel} 
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

        let [selectedYear, selectedMake, selectedModel, selectedSubModel] = returnSelections(containerId)
        
        let dropdowns = await fetchYmmOnlyDataAndRender(containerId);
        dropdowns.sub_model_arr = dropdowns.sub_model_arr.filter(elem=> elem !== '')

        manageHighlighted(containerId)

        if(
            (
                (dropdowns.makes.length && selectedMake == false ) ||
                (dropdowns.models.length && selectedModel == false ) ||
                (isSubModelExists() && dropdowns.sub_model_arr.length && selectedSubModel == '' )
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
        let [selectedYear, selectedMake, selectedModel, selectedSubModel] = returnSelections(containerId)
        addHighlighted(containerId, "select-year")
        if(selectedYear) addHighlighted(containerId, "select-make")
        enableSelectTag(containerId, "btn-clear")
        if(selectedMake) addHighlighted(containerId, "select-model")
        if(selectedModel) addHighlighted(containerId, "select-sub-model")

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
                        customYmm[`${containerId}`].selections.sub_model = ''

                        disableSelectTag(containerId, "select-make")
                        disableSelectTag(containerId, "select-model")
                        disableSelectTag(containerId, "btn-go")
                        
                    break;

                    case "select-make":
                        customYmm[`${containerId}`].selections.model = false
                        customYmm[`${containerId}`].selections.make = selectTag.value
                        customYmm[`${containerId}`].selections.sub_model = ''

                        disableSelectTag(containerId, "select-model")
                        disableSelectTag(containerId, "btn-go")
                    break;

                    case "select-model":
                        customYmm[`${containerId}`].selections.model = selectTag.value
                        customYmm[`${containerId}`].selections.sub_model = ''

                    break;    
                    
                    case "select-sub-model":
                        customYmm[`${containerId}`].selections.sub_model = selectTag.value
                        break;
                    
                }
                disableSelectTag(containerId, "select-sub-model")

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
        customYmm[`${containerId}`].selections.sub_model = ''
        
        enableSelectTag(containerId, "select-year")
        resetSelectTag(containerId, "select-year")
        disableSelectTag(containerId, "select-make")
        resetSelectTag(containerId, "select-make")
        disableSelectTag(containerId, "select-model")
        resetSelectTag(containerId, "select-model")
                
        disableSelectTag(containerId, "select-sub-model")
        resetSelectTag(containerId, "select-sub-model")

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
        
        setURLparams()
        
        if(customYmm['hideProductsUntilSelected'] === false){
            fetchProductsAndRender()
        }
        
    }


    function createYmmForm(containerId){

        customYmm[`${containerId}`] = {}

        customYmm[`${containerId}`]["years"] = customYmm['years'];

        
        customYmm[`${containerId}`]["makes"] = []
        
        customYmm[`${containerId}`]["models"] = []
        customYmm[`${containerId}`]["sub_model_arr"] = []
        
        customYmm[`${containerId}`]["selections"] = {year: false, make: false, model: false, sub_model: ''}
        
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
                        
                    <div class="sub_model ymm-form-select">
                        <select data-type = "select-sub-model" class="select-sub-model ymm-select" disabled>
                            <option>Sub Model</option>
                        </select>
                    </div>
                    
                
                </div>
                
                <div class="ymm-button-holder-wrapper">
                
                    <div class="ymm-button-holder">
                    
                        <div class = "ymm-go-btn">
                            <button class ="button button-primary btn-go" disabled>Go</button>
                        </div>
                        
                        <div class = "ymm-clear-btn">
                            <button class ="button button-secondary btn-clear" disabled>${returnRefreshIcon()}</button>
                        </div>
                        
                    </div>
                    
                </div>

            </div>
        `

    }





    function setupYMMform(withContainerId, insideContainerWithClass, callbackToChange, callbackToSaveOrGo = false, callbackToClear = false ){

        //sdfsf
        // Find the element with the class ".product-options"
        const productViewDetailsElement = document.querySelector(`.${insideContainerWithClass}`);
        
        console.log("productViewDetailsElement", productViewDetailsElement);

        console.log("hello")

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
            
            const response = await fetch(`${customYmm["ymmOnlyApi"]}?category=${customYmm["selectedCategory"]}&sub_model=${customYmm[containerId].selections.sub_model}&year=${customYmm[containerId].selections.year}&make=${customYmm[containerId].selections.make}&model=${customYmm[containerId].selections.model}`)
        
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
        customYmm[`${containerId}`]["sub_model_arr"] =  [...new Set(data.sub_model_arr)].sort().filter(sub_model=>  sub_model != null && sub_model.trim().length > 0)

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

            
        }

        if(customYmm[`${containerId}`].selections.model == false  ) return
        // need to return even when we are in the home page because we won't be displaying other qualifiers in the home page
    
        if(customYmm[`${containerId}`]["sub_model_arr"].length > 0){
            
            displaySelectTag(containerId, "select-sub-model")
            enableSelectTag(containerId, "select-sub-model")
            
            document.querySelector(`#${containerId}`).querySelector('.select-sub-model').innerHTML = createOptionTag('Sub Model') + customYmm[`${containerId}`]["sub_model_arr"].map(model => createOptionTag(model, containerId)).join('')

        }else {
            hideSelectTag(containerId, "select-sub-model")
        }
        

    }

    function createRequiredWrappersForProductPage(){

        
        // Get reference to the existing div
        var existingDiv = document.querySelector(customYmm["productPageWrapper"]);
        

        const newDiv =document.createElement('div')
        newDiv.className="form-fitment-wrapper";
        
        // Insert the new div after the existing div
        existingDiv.insertAdjacentElement('afterend', newDiv);
        // existingDiv.appendChild(newDiv);
        
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


   function isSubModelExists(){
        for(var i=0; i < customYmm["fitmentData"].length; i++){
            var data = customYmm["fitmentData"][i];
            if(data.sub_model.trim().length > 0){
                return true;
            }
        }
        return false;
    }



    function returnSubModelTH(){
        if(isSubModelExists()) return '<th>Sub Model</th>'
        return ''
    }


    function returnSubModelTD(d){
        
        if(isSubModelExists()) return `<td>${d}</td>`
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
                                    ${returnSubModelTH()}
                                </tr>
    
                                ${tempFitmentRows.map(data => {
    
                                    return`
                                        <tr>
                                            <td>${data.from_year} - ${data.to_year}</td>
                                            <td>${data.make}</td>
                                            <td>${data.model}</td>
                                            ${returnSubModelTD(data.sub_model)}
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
                if(document.querySelector('.product-recommendations')){
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
                }
                
                
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
                        sub_model: ymm.sub_model
                    }
                }
                
                decideWhatHappensAfterFormChangeInProductPage('product-page-ymm-form')

            }
        })

    }


    // Set a cookie with a name, value, optional expiration date, and path
    function setCookie(name, value) {

        let cookie = `${name}=${encodeURIComponent(value)}`;
        let daysToExpire = 30
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + daysToExpire);
        cookie += `; expires=${expirationDate.toUTCString()}`;
        cookie += `; path=/`; // Default path to '/'
        document.cookie = cookie;

    }

    // Read a cookie by its key (name)
    function getCookie(key) {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [cookieKey, cookieValue] = cookie.trim().split('=');
            if (cookieKey === key) {
                return decodeURIComponent(cookieValue);
            }
        }
        return null; // Return null if the cookie is not found
    }

    function decideWhichPageIsIt(){
        
        const bodyClasses= document.body.className
        
        if(bodyClasses.includes('template-search') || bodyClasses.includes('page-type-seo-friendly')){
            customYmm["isInSearchPage"] = true
        }else if(bodyClasses.includes('template-product')){
            customYmm['isInProductPage'] = true
        }else if(bodyClasses.includes('template-index')){
            customYmm["isInHomePage"] = true
        }else if(bodyClasses.includes('template-collection')){
            if(window.location.href.includes('vendors')){
                customYmm["isInBrandPage"] = true
            } else if(window.location.href.includes('collections/all')){
                customYmm['isInSearchPage'] = true
            }
            else{
                customYmm["isInCategoryPage"] = true
            }
        }

    }


    function hideGarage(){

        document.querySelector('#garage-wrapper-wrapper').style.display = "none"

    }

    function displayGarage(){
        document.querySelector('#garage-wrapper-wrapper').style.display = "block"       
    }

    function returnCloseIcon(){
        
        return`
            <svg xmlns="http://www.w3.org/2000/svg" class="icon-tabler icon-tabler-x" width="28" height="28" viewBox="0 0 24 24" stroke-width="1" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M18 6l-12 12"></path>
              <path d="M6 6l12 12"></path>
            </svg>    
        `
        
    }

    function fillGarageWithVehicles(){

    if(customYmm["garage"].length > 0 ) 
        return customYmm["garage"].map(({selected =false, id, year, make, model, sub_model }) => {

            return`
                <div class  =  "each-vehicle-in-garage ${selected ? 'selected-vehicle-in-garage': ''} d-flex align-items-center ymm-justify-content-between ymm-mt-2 cursor-pointer  ">
                    
                    <div class = "each-vehicle-in-garage__name" data-ymm-id="${id}">
                        
                        <span class="selected-ymm-each selected-ymm-vq-each"> 
                            <span class="selected-ymm-ymm-each">
                                ${year} ${make} ${model} 
                            </span>
                            <span class="selected-vq-each">
                                ${sub_model}
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

    function clearGarage(){
        customYmm["garage"] = []
        setCookie("garage", JSON.stringify(customYmm["garage"]))
        setupGarage(true)
    }

    function constructGarageAndDisplayIt(){

        let html = `

            <div id = "garage-wrapper">


                <div class='add-to-garagge-form-wrapper-outer'></div>
                <hr>

                ${
                    customYmm["garage"].length > 0 
                        ? `
                        <div class="non-empty-garage">
                            <div class = "clear-garage d-flex align-items-center ymm-justify-content-between cursor-pointer">
                                <div><strong>Your Garage</strong></div>
                            </div>

                            <hr>

                            <div class = "garage-content">

                                ${fillGarageWithVehicles()}
                                
                            </div>
                            
                            <hr>
                            <div class = "clear-garage-btn-wrapper add-vehicle-to-garage-button-wrapper ymm-text-center">
                                <button onclick="clearGarage()" class = "button button-primary" >
                                    Clear Garage
                                </button>
                            </div>
                        </div>
                    `
                    : `
                        <div>
                            The garage is empty
                        </div>
                    `
                }

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

            const wrapperForModal = document.createElement('div')

            wrapperForModal.className = "modal-wrapper"

            wrapperForModal.addEventListener('click', () => {
                hideOverlay()
            })

        }



        document.querySelector('#garage-wrapper-wrapper').innerHTML = html
        
        setupAddToGarageYMMform();

        // assign listeners to the clear and cross

        Array.from(document.querySelector('#garage-wrapper').querySelectorAll('.remove-this-vehicle-from-garage')).forEach(remover => {

            remover.addEventListener('click', event => {
                customYmm["garage"] = customYmm["garage"].filter(vehicle => vehicle.id != remover.getAttribute("data-vehicle"))

                setupGarage(displayGarageFlag = true)

                setCookie("garage", JSON.stringify(customYmm["garage"]))

            })

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
            
            var  filteredVehicles = customYmm["garage"].filter(vehicle => vehicle.selected)
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
                            ${selectedVehicle.sub_model} 
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
            
        }
        document.querySelector('#cb-garage-btn').addEventListener('change', event => {

            if(event.target.checked){


                // if(noOfVehiclesInGarage > 0){
                    // display garage
                    
                    constructGarageAndDisplayIt()
                    displayGarageWrapper();

                // }else{

                //     // display YMMM form for adding to the garage
                //     document.body.classList.toggle("my-grage-active")
                //     displayOverlay()


                // }

            }else{

                // hide garage
                hideGarageWrapper();


            }

        })


        if(displayGarageFlag) constructGarageAndDisplayIt()

    }

    function handleSubmit(){

        // if the user is in the search page, then refetch the query

        // esle redirect to the search page

        const searchQuery = customYmm["searchQuery"]

        if(customYmm["isInSearchPage"]){

            if(searchQuery.trim().length > 0){

                customYmm.loadMore = true
                customYmm.currentPage = 1
                fetchProductsAndRender()
            }

        }else if(searchQuery.trim().length > 0){

            // redirect to the another page

            window.location.href = customYmm["siteURL"] + '/search/' + '?sq='+searchQuery

        }

    }

    function setupQuickSearch(){
        
        if(!document.querySelector(customYmm['quickSearchWrapper'])) return 
        
        document.querySelector(customYmm['quickSearchWrapper']).innerHTML = `
            <div class="search-modal__form">
            
                <form class="form" id = "ymm-search-query-form" onsubmit="return false">
                    <fieldset class="form-fieldset">
                        <div class="form-field">
                            <input class="form-input" data-search-quick="" name="nav-quick-search" id="nav-quick-search"  placeholder="Search..." autocomplete="off">
                             <button type="submit" class="button button--{{#if theme_settings.halo_homepage_layout_4}}tertiary{{else}}primary{{/if}}" aria-label="{{lang 'search.quick_search.input_label'}}">
                               
                                
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_2_20)">
                                    <path d="M17.587 15.597L13.379 11.389C14.3839 9.89596 14.8027 8.08463 14.555 6.30201C14.3282 4.7195 13.5918 3.25404 12.4573 2.12767C11.3228 1.00131 9.8521 0.275422 8.26801 0.0600078C7.15564 -0.0858156 6.02464 0.0260672 4.9624 0.38701C3.90016 0.747953 2.93513 1.34829 2.14189 2.14163C1.34864 2.93497 0.748422 3.90008 0.387609 4.96236C0.0267949 6.02464 -0.0849502 7.15566 0.0610087 8.26801C0.275707 9.85209 1.00092 11.323 2.12676 12.4579C3.2526 13.5927 4.71769 14.3297 6.30001 14.557C8.08374 14.8052 9.89633 14.3861 11.39 13.38L15.6 17.588C15.8665 17.8393 16.2204 17.9768 16.5866 17.9712C16.9529 17.9657 17.3025 17.8175 17.5612 17.5583C17.8199 17.299 17.9674 16.9491 17.9722 16.5829C17.977 16.2166 17.8388 15.863 17.587 15.597ZM2.78101 7.31201C2.78101 6.11853 3.25511 4.97394 4.09903 4.13003C4.94294 3.28611 6.08753 2.81201 7.28101 2.81201C8.47448 2.81201 9.61908 3.28611 10.463 4.13003C11.3069 4.97394 11.781 6.11853 11.781 7.31201C11.781 8.50548 11.3069 9.65007 10.463 10.494C9.61908 11.3379 8.47448 11.812 7.28101 11.812C6.08753 11.812 4.94294 11.3379 4.09903 10.494C3.25511 9.65007 2.78101 8.50548 2.78101 7.31201Z" fill="#A8A8A8"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_2_20">
                                    <rect width="17.998" height="18" fill="white"/>
                                    </clipPath>
                                    </defs>
                                </svg>
    
                            </button>
                        </div>
                    </fieldset>
                </form>
            
            </div>

        `


        document.getElementById('ymm-search-query-form').addEventListener('submit', handleSubmit)
        // document.getElementById('ymm-search-query-form-mobile').addEventListener('submit', handleSubmit)

        document.getElementById('nav-quick-search').addEventListener('input', event => {
            customYmm["searchQuery"] = event.target.value.trim()
        })

    }

    function setupHeader(){

        setupGarage()

        setupQuickSearch()
    }


    function hideOverlay(){

        document.querySelector('.modal-wrapper').style.display = "none";
        
        // document.querySelector('.ymm-modal').style.display = "none"
        
        document.body.classList.remove("my-grage-active")
        
        if(document.querySelector('#cb-garage-btn'))document.querySelector('#cb-garage-btn').checked = false

    }


    function displayOverlay(){

        document.querySelector('.modal-wrapper').style.display = "block";
        document.body.classList.add("my-grage-active")
        // document.body.addEventListener('click' , () => hideOverlay());
        // document.querySelector('.ymm-modal').style.display = "block"

    }

    function resetDropdownData(containerId){
        customYmm[`${containerId}`]['makes'] = []
        customYmm[`${containerId}`]['models']= []
        customYmm[`${containerId}`]['sub_model_arr'] = []
    }
    
    function returnSelections(containerId){
        const selectedYear = customYmm[`${containerId}`].selections.year
        const selectedMake = customYmm[`${containerId}`].selections.make
        const selectedModel = customYmm[`${containerId}`].selections.model
        const selectedSubModel = customYmm[`${containerId}`].selections.sub_model
        return[selectedYear, selectedMake, selectedModel, selectedSubModel]
        
    }
    
    function returnDropdowns(containerId){
        const years = customYmm[`${containerId}`]['years']
        const makes = customYmm[`${containerId}`]['makes']
        const models = customYmm[`${containerId}`]['models']
        const sub_model_arr = customYmm[`${containerId}`]['sub_model_arr']
        return [years, makes, models, sub_model_arr]
        
    }

    function goForAddToGarage(containerId){
        
        let [selectedYear, selectedMake, selectedModel, selectedSubModel] = returnSelections(containerId)
        pushToGarage(containerId)
        setupGarage(false);
        hideOverlay()
        if (customYmm["isInSearchPage"] || customYmm["isInCategoryPage"] || customYmm["isInBrandPage"]) {
            
            const ymmContainerId = 'search-page-ymm-form-container'
            
            customYmm[`${ymmContainerId}`].selections = {
                year: selectedYear,
                make: selectedMake,
                model: selectedModel,
                sub_model: selectedSubModel
            }

            fetchProductsAndRender()
            
        }else{
            
            // Get the URL from the browser's address bar
            var url = window.location.href;
            
            // Create a new URL object
            var parsedUrl = new URL(url);
            
            // Retrieve the protocol (http or https)
            var protocol = parsedUrl.protocol;
            
            // Retrieve the hostname (website name)
            var hostname = parsedUrl.hostname;
            // Find the part of the URL after the '?'
            let basePath = protocol+'//'+hostname+'/a/search/'
            window.location.href =   protocol+'//'+hostname+'/search/'
            return
            let ymmdfn = [selectedYear, selectedMake, selectedModel, selectedSubModel]
            ymmdfn = ymmdfn.filter(e=> (e !== false && e!== '')).map(ee=>ee.replaceAll(' ', '_'))
            if(ymmdfn.length){
                basePath += `v/${ymmdfn.join('>')}/`
            }
                
            // window.location.href =  basePath

        }
        
    }

    const decideWhatHappensAfterFormChangeInAddToGarage = async (containerId) => {
        
        try{
            
            let [selectedYear, selectedMake, selectedModel, selectedSubModel ] = returnSelections(containerId)
            
            let dropdownsInAddToGarage = await fetchYmmOnlyDataAndRender(containerId);
            
            dropdownsInAddToGarage.sub_model_arr = dropdownsInAddToGarage.sub_model_arr.filter(elem=> elem !== '')
            
            manageHighlighted(containerId)

            if(selectedYear && selectedMake && selectedModel){
                // enable the go button after seelcteing these three
                enableSelectTag(containerId, "btn-go")
                
                if(!dropdownsInAddToGarage.sub_model_arr.length ){
                    
                    // hide optional fields
                    document.querySelector('.optional-field-label-wrapper').style.display = "none"
                    
                }else{
                    document.querySelector('.optional-field-label-wrapper').style.display = "block"
                }
                
            }
            
            if(
                (dropdownsInAddToGarage.makes.length && selectedMake == false ) ||
                (dropdownsInAddToGarage.models.length && selectedModel == false ) ||
                (dropdownsInAddToGarage.sub_model_arr.length && selectedSubModel == '' )
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
        var ymmAddToGarageForm = document.querySelector('.add-to-garagge-form-wrapper-outer')
        
        ymmAddToGarageForm.innerHTML = `

            <div class = "add-to-garage-form-wrapper">
                <div class = "add-to-garage-heading">
                    <h3 class = "add-to-garage-heading__heading">Select your Vehicle</h3>
                </div>
                <div class = "ymm-add-to-garage-form-wrapper">
                </div>
            </div>

        `
        setupYMMform('ymm-add-to-garage-form-modal', 'ymm-add-to-garage-form-wrapper', decideWhatHappensAfterFormChangeInAddToGarage, goForAddToGarage)

    }


    function loadCssFile(){

        return;

        // Create a new link element for the CSS file
        const linkElement = document.createElement("link");

        // Set the attributes for the link element
        linkElement.rel = "stylesheet";
        linkElement.type = "text/css";
        linkElement.href = customYmm["linkToCssFile"]; // Replace with the actual path to your CSS file


        // Append the link element to the <head> section of the document
        document.head.appendChild(linkElement);

    }


    function hideYmmFormInSearchPage(){

        document.querySelector('.ymm-form-search-page').style.display = "none"

        document.querySelector('.ymm-change-or-clear').style.display = "flex"
                console.log("ymm change or clear is shown")

    }

    function displayYmmFormInSearchPage(){

        document.querySelector('.ymm-form-search-page').style.display = "block"

        document.querySelector('.ymm-change-or-clear').style.display = "none"
        
        console.log("ymm change or clear is hidden")

    }

    function clearYMMformAndDisplay(){

        document.querySelector('.ymm-form-search-page').querySelector('.btn-clear').click()
        displayBreadCrumb();
        
    }


    function hideOrShowMobileFilter(){

        document.querySelector('.background-overlay').addEventListener('click', ()=> hideOrShowMobileFilter())
        if(document.querySelector(customYmm['filtersWrapperMobile'])){
            document.querySelector(customYmm['filtersWrapperMobile']).classList.toggle('mobile-filters-open')
            document.body.classList.toggle('mobile-filter-overlay')

        }

    }

    function insertWrappersForSearchPage(wrapper){

        let pageWidthFromThemeSettings =''

        if(document.querySelector('#search_auto_data')){
        
            pageWidthFromThemeSettings=  document.querySelector('#search_auto_data').getAttribute('data-site_width')
        }
        
        var columnsPerRowFromThemeSettings = customYmm['settings'].productsPerRow
       

        document.querySelector(wrapper).innerHTML = `

            <div class="ymm-container ${pageWidthFromThemeSettings}">


                
                <div id = "ymm-breadcrumb"></div>
                
                <div id="subcats-container" class="sub-category-item" style="display:none"></div>

                <div class="ymm-filters-products ymm-mb-5 ymm-mt-5">
                    
                    <div class="filters-wrapper-desktop" id="filters-wrapper-desktop">
                        <div class="ymm-filters-selections-wrapper"><div class = "ymm-filters-selections"></div></div>
                        <div class='filters-only-wrapper'></div>
                    </div>

                    <div class="ymm-products-wrapper ymm-forms-and-products">

                        <div class="ymm-form-search-page">
                            <h3 class="ymm-title d-flex align-items-center"> Select Your Vehicle</h3>
                            <div class="search-page-ymm-form-container"></div>
                        </div>
                        
                        <div class = "ymm-change-or-clear ymm-mt-2 ymm-mb-2  ymm-justify-content-between" style="display:none">

                            <div class = "ymm-change-or-clear__title"></div>
                            <div class = "change-clear-btn-wrapper d-flex ymm-justify-content-around">
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

                        
                        <div class="search-results-count-sort-by">
                            <span class="search-results-count"></span>
                            <div class="sort-by"></div>
                        </div>
                       
                        

                        <div class="no-results-message-outer"></div> 
                        <div class="ymm-products-grid-wrapper">
                            <div class="ymm-products grid-col-${columnsPerRowFromThemeSettings}"></div>
                            <div class = "loading-indicator"></div>
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
    
    function hideOrShowFormAfterLoadingDropdownValues(dropdowns, containerId){
        
        let [selectedYear, selectedMake, selectedModel, selectedSubModel] = returnSelections(containerId)

        dropdowns.sub_model_arr = dropdowns.sub_model_arr.filter(elem=> elem !== '')

        if(selectedYear && selectedMake && selectedModel){
            enableSelectTag(containerId, "btn-go")
            enableSelectTag(containerId, "btn-clear")
        }
        
        if(
            (
                (dropdowns.makes.length && selectedMake == false ) ||
                (dropdowns.models.length && selectedModel == false ) ||
                (dropdowns.sub_model_arr.length && selectedSubModel == '' )
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

    const decideWhatHappensAfterFormChangeInSearchPage = async (containerId) => {
        customYmm.currentPage = 1
        clearProductDiv()

        let [selectedYear, selectedMake, selectedModel, selectedSubModel] = returnSelections(containerId)
        setURLparams()
        clearContentsForCategoryPage()
        
        let dropdowns = await fetchYmmOnlyDataAndRender(containerId);
        manageHighlighted(containerId)
        dropdowns.sub_model_arr = dropdowns.sub_model_arr.filter(elem=> elem !== '')

        if(selectedYear && selectedMake && selectedModel  ){
            enableSelectTag(containerId, "btn-go")
        }
        if(
           (
                (dropdowns.makes.length && selectedMake == false ) ||
                (dropdowns.models.length && selectedModel == false ) ||
                (dropdowns.sub_model_arr.length && selectedSubModel == '' )
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

        var ymm = customYmm["garage"].filter(ymm => ymm.id == ymmId)[0]

        if(customYmm["isInSearchPage"] || customYmm["isInCategoryPage"]){
            setupGarage(false);
            customYmm[`${ymmContainerIdForSearchPage}`]['selections']['year'] = ymm.year
            customYmm[`${ymmContainerIdForSearchPage}`]['selections']['make'] = ymm.make
            customYmm[`${ymmContainerIdForSearchPage}`]['selections']['model'] = ymm.model
            setURLparams()
            fetchProductsAndRender()
        }else{
            
            var url = window.location.href;
            
            // Create a new URL object
            var parsedUrl = new URL(url);
            
            // Retrieve the protocol (http or https)
            var protocol = parsedUrl.protocol;
            
            // Retrieve the hostname (website name)
            var hostname = parsedUrl.hostname;
            // Find the part of the URL after the '?'
            let basePath = protocol+'//'+hostname+'/a/search/'
            window.location.href =  protocol+'//'+hostname+'/search/'
            let ymmdfn = [ymm.year, ymm.make, ymm.model, ymm.sub_model] 
            ymmdfn = ymmdfn.filter(e=> (e !== false && e!== '')).map(ee=>ee.replaceAll(' ', '_'))
            if(ymmdfn.length){
                basePath += `v/${ymmdfn.join('>')}/`
            }

            // window.location.href =  basePath


        }
        

    }

    function setDefaultCategory(){

        customYmm["selectedCategory"] = false;

        if(customYmm["isInCategoryPage"]){

            // retrieve category

            if(customYmm["development"] == "local"){

                categoryURL = "/axles-and-gears/"

                customYmm["selectedCategory"] = categoryURL

            }else{


                // The URL you provided
                const url = window.location.href;

                // Create a URL object
                const urlObj = new URL(url);

                // Get the pathname component which contains the product handle
                const pathname = urlObj.pathname;

                customYmm["selectedCategory"] =  pathname.split('?')[0].split('/').reverse()[0]      
                console.log("selectedCategory", customYmm["selectedCategory"])
                customYmm["selectedCategories"].push(customYmm["selectedCategory"])

            }

        }
    }


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
                
                var filteredVehicles = customYmm["garage"].filter(vehicle => vehicle.selected)
                if(filteredVehicles.length)
                    selectedVehicle = filteredVehicles[0]
                    
                else if(customYmm['hideProductsUntilSelected'] === true){
                    document.getElementById('garage-btn').click()
                    document.getElementById('add-vehicle-to-garage-button').click()
                }
            }
             
            
            if(selectedVehicle && (!window.location.href.includes('/v/'))){
                ymm = selectedVehicle
                customYmm[`${ymmContainerIdForSearchPage}`]['selections'] = {
                    year: ymm.year,
                    make: ymm.make,
                    model: ymm.model,
                    sub_model: ymm.sub_model
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

    function returnCategoryImage(image){
        
        if(image === null || image == '') {
          return`
            <div class="cm_vehicle-categories_category-image-container cm_vehicle-categories_link">
                <svg class="placeholder-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 525.5 525.5"><path d="M375.5 345.2c0-.1 0-.1 0 0 0-.1 0-.1 0 0-1.1-2.9-2.3-5.5-3.4-7.8-1.4-4.7-2.4-13.8-.5-19.8 3.4-10.6 3.6-40.6 1.2-54.5-2.3-14-12.3-29.8-18.5-36.9-5.3-6.2-12.8-14.9-15.4-17.9 8.6-5.6 13.3-13.3 14-23 0-.3 0-.6.1-.8.4-4.1-.6-9.9-3.9-13.5-2.1-2.3-4.8-3.5-8-3.5h-54.9c-.8-7.1-3-13-5.2-17.5-6.8-13.9-12.5-16.5-21.2-16.5h-.7c-8.7 0-14.4 2.5-21.2 16.5-2.2 4.5-4.4 10.4-5.2 17.5h-48.5c-3.2 0-5.9 1.2-8 3.5-3.2 3.6-4.3 9.3-3.9 13.5 0 .2 0 .5.1.8.7 9.8 5.4 17.4 14 23-2.6 3.1-10.1 11.7-15.4 17.9-6.1 7.2-16.1 22.9-18.5 36.9-2.2 13.3-1.2 47.4 1 54.9 1.1 3.8 1.4 14.5-.2 19.4-1.2 2.4-2.3 5-3.4 7.9-4.4 11.6-6.2 26.3-5 32.6 1.8 9.9 16.5 14.4 29.4 14.4h176.8c12.9 0 27.6-4.5 29.4-14.4 1.2-6.5-.5-21.1-5-32.7zm-97.7-178c.3-3.2.8-10.6-.2-18 2.4 4.3 5 10.5 5.9 18h-5.7zm-36.3-17.9c-1 7.4-.5 14.8-.2 18h-5.7c.9-7.5 3.5-13.7 5.9-18zm4.5-6.9c0-.1.1-.2.1-.4 4.4-5.3 8.4-5.8 13.1-5.8h.7c4.7 0 8.7.6 13.1 5.8 0 .1 0 .2.1.4 3.2 8.9 2.2 21.2 1.8 25h-30.7c-.4-3.8-1.3-16.1 1.8-25zm-70.7 42.5c0-.3 0-.6-.1-.9-.3-3.4.5-8.4 3.1-11.3 1-1.1 2.1-1.7 3.4-2.1l-.6.6c-2.8 3.1-3.7 8.1-3.3 11.6 0 .2 0 .5.1.8.3 3.5.9 11.7 10.6 18.8.3.2.8.2 1-.2.2-.3.2-.8-.2-1-9.2-6.7-9.8-14.4-10-17.7 0-.3 0-.6-.1-.8-.3-3.2.5-7.7 3-10.5.8-.8 1.7-1.5 2.6-1.9h155.7c1 .4 1.9 1.1 2.6 1.9 2.5 2.8 3.3 7.3 3 10.5 0 .2 0 .5-.1.8-.3 3.6-1 13.1-13.8 20.1-.3.2-.5.6-.3 1 .1.2.4.4.6.4.1 0 .2 0 .3-.1 13.5-7.5 14.3-17.5 14.6-21.3 0-.3 0-.5.1-.8.4-3.5-.5-8.5-3.3-11.6l-.6-.6c1.3.4 2.5 1.1 3.4 2.1 2.6 2.9 3.5 7.9 3.1 11.3 0 .3 0 .6-.1.9-1.5 20.9-23.6 31.4-65.5 31.4h-43.8c-41.8 0-63.9-10.5-65.4-31.4zm91 89.1h-7c0-1.5 0-3-.1-4.2-.2-12.5-2.2-31.1-2.7-35.1h3.6c.8 0 1.4-.6 1.4-1.4v-14.1h2.4v14.1c0 .8.6 1.4 1.4 1.4h3.7c-.4 3.9-2.4 22.6-2.7 35.1v4.2zm65.3 11.9h-16.8c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h16.8v2.8h-62.2c0-.9-.1-1.9-.1-2.8h33.9c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-33.9c-.1-3.2-.1-6.3-.1-9h62.5v9zm-12.5 24.4h-6.3l.2-1.6h5.9l.2 1.6zm-5.8-4.5l1.6-12.3h2l1.6 12.3h-5.2zm-57-19.9h-62.4v-9h62.5c0 2.7 0 5.8-.1 9zm-62.4 1.4h62.4c0 .9-.1 1.8-.1 2.8H194v-2.8zm65.2 0h7.3c0 .9.1 1.8.1 2.8H259c.1-.9.1-1.8.1-2.8zm7.2-1.4h-7.2c.1-3.2.1-6.3.1-9h7c0 2.7 0 5.8.1 9zm-7.7-66.7v6.8h-9v-6.8h9zm-8.9 8.3h9v.7h-9v-.7zm0 2.1h9v2.3h-9v-2.3zm26-1.4h-9v-.7h9v.7zm-9 3.7v-2.3h9v2.3h-9zm9-5.9h-9v-6.8h9v6.8zm-119.3 91.1c-2.1-7.1-3-40.9-.9-53.6 2.2-13.5 11.9-28.6 17.8-35.6 5.6-6.5 13.5-15.7 15.7-18.3 11.4 6.4 28.7 9.6 51.8 9.6h6v14.1c0 .8.6 1.4 1.4 1.4h5.4c.3 3.1 2.4 22.4 2.7 35.1 0 1.2.1 2.6.1 4.2h-63.9c-.8 0-1.4.6-1.4 1.4v16.1c0 .8.6 1.4 1.4 1.4H256c-.8 11.8-2.8 24.7-8 33.3-2.6 4.4-4.9 8.5-6.9 12.2-.4.7-.1 1.6.6 1.9.2.1.4.2.6.2.5 0 1-.3 1.3-.8 1.9-3.7 4.2-7.7 6.8-12.1 5.4-9.1 7.6-22.5 8.4-34.7h7.8c.7 11.2 2.6 23.5 7.1 32.4.2.5.8.8 1.3.8.2 0 .4 0 .6-.2.7-.4 1-1.2.6-1.9-4.3-8.5-6.1-20.3-6.8-31.1H312l-2.4 18.6c-.1.4.1.8.3 1.1.3.3.7.5 1.1.5h9.6c.4 0 .8-.2 1.1-.5.3-.3.4-.7.3-1.1l-2.4-18.6H333c.8 0 1.4-.6 1.4-1.4v-16.1c0-.8-.6-1.4-1.4-1.4h-63.9c0-1.5 0-2.9.1-4.2.2-12.7 2.3-32 2.7-35.1h5.2c.8 0 1.4-.6 1.4-1.4v-14.1h6.2c23.1 0 40.4-3.2 51.8-9.6 2.3 2.6 10.1 11.8 15.7 18.3 5.9 6.9 15.6 22.1 17.8 35.6 2.2 13.4 2 43.2-1.1 53.1-1.2 3.9-1.4 8.7-1 13-1.7-2.8-2.9-4.4-3-4.6-.2-.3-.6-.5-.9-.6h-.5c-.2 0-.4.1-.5.2-.6.5-.8 1.4-.3 2 0 0 .2.3.5.8 1.4 2.1 5.6 8.4 8.9 16.7h-42.9v-43.8c0-.8-.6-1.4-1.4-1.4s-1.4.6-1.4 1.4v44.9c0 .1-.1.2-.1.3 0 .1 0 .2.1.3v9c-1.1 2-3.9 3.7-10.5 3.7h-7.5c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h7.5c5 0 8.5-.9 10.5-2.8-.1 3.1-1.5 6.5-10.5 6.5H210.4c-9 0-10.5-3.4-10.5-6.5 2 1.9 5.5 2.8 10.5 2.8h67.4c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-67.4c-6.7 0-9.4-1.7-10.5-3.7v-54.5c0-.8-.6-1.4-1.4-1.4s-1.4.6-1.4 1.4v43.8h-43.6c4.2-10.2 9.4-17.4 9.5-17.5.5-.6.3-1.5-.3-2s-1.5-.3-2 .3c-.1.2-1.4 2-3.2 5 .1-4.9-.4-10.2-1.1-12.8zm221.4 60.2c-1.5 8.3-14.9 12-26.6 12H174.4c-11.8 0-25.1-3.8-26.6-12-1-5.7.6-19.3 4.6-30.2H197v9.8c0 6.4 4.5 9.7 13.4 9.7h105.4c8.9 0 13.4-3.3 13.4-9.7v-9.8h44c4 10.9 5.6 24.5 4.6 30.2z"></path><path d="M286.1 359.3c0 .4.3.7.7.7h14.7c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-14.7c-.3 0-.7.3-.7.7zm5.3-145.6c13.5-.5 24.7-2.3 33.5-5.3.4-.1.6-.5.4-.9-.1-.4-.5-.6-.9-.4-8.6 3-19.7 4.7-33 5.2-.4 0-.7.3-.7.7 0 .4.3.7.7.7zm-11.3.1c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7H242c-19.9 0-35.3-2.5-45.9-7.4-.4-.2-.8 0-.9.3-.2.4 0 .8.3.9 10.8 5 26.4 7.5 46.5 7.5h38.1zm-7.2 116.9c.4.1.9.1 1.4.1 1.7 0 3.4-.7 4.7-1.9 1.4-1.4 1.9-3.2 1.5-5-.2-.8-.9-1.2-1.7-1.1-.8.2-1.2.9-1.1 1.7.3 1.2-.4 2-.7 2.4-.9.9-2.2 1.3-3.4 1-.8-.2-1.5.3-1.7 1.1s.2 1.5 1 1.7z"></path><path d="M275.5 331.6c-.8 0-1.4.6-1.5 1.4 0 .8.6 1.4 1.4 1.5h.3c3.6 0 7-2.8 7.7-6.3.2-.8-.4-1.5-1.1-1.7-.8-.2-1.5.4-1.7 1.1-.4 2.3-2.8 4.2-5.1 4zm5.4 1.6c-.6.5-.6 1.4-.1 2 1.1 1.3 2.5 2.2 4.2 2.8.2.1.3.1.5.1.6 0 1.1-.3 1.3-.9.3-.7-.1-1.6-.8-1.8-1.2-.5-2.2-1.2-3-2.1-.6-.6-1.5-.6-2.1-.1zm-38.2 12.7c.5 0 .9 0 1.4-.1.8-.2 1.3-.9 1.1-1.7-.2-.8-.9-1.3-1.7-1.1-1.2.3-2.5-.1-3.4-1-.4-.4-1-1.2-.8-2.4.2-.8-.3-1.5-1.1-1.7-.8-.2-1.5.3-1.7 1.1-.4 1.8.1 3.7 1.5 5 1.2 1.2 2.9 1.9 4.7 1.9z"></path><path d="M241.2 349.6h.3c.8 0 1.4-.7 1.4-1.5s-.7-1.4-1.5-1.4c-2.3.1-4.6-1.7-5.1-4-.2-.8-.9-1.3-1.7-1.1-.8.2-1.3.9-1.1 1.7.7 3.5 4.1 6.3 7.7 6.3zm-9.7 3.6c.2 0 .3 0 .5-.1 1.6-.6 3-1.6 4.2-2.8.5-.6.5-1.5-.1-2s-1.5-.5-2 .1c-.8.9-1.8 1.6-3 2.1-.7.3-1.1 1.1-.8 1.8 0 .6.6.9 1.2.9z"></path></svg>
            </div>
        `

        }
        
        return`
            <div class="cm_vehicle-categories_category-image-container cm_vehicle-categories_link">
               <img class="cm_vehicle-categories_category-image" src="${image}" />
            </div>
        
        `
        
    }

    function fetchSubCategoriesAndRender(){
        
        
        
        // The URL you provided
        const url = window.location.href;

        // Create a URL object
        const urlObj = new URL(url);

        // Get the pathname component which contains the product handle
        const pathname = urlObj.pathname;

        const categoryURL =  pathname.split('?')[0].replace('/collections/', '') 
        
        console.log('categoryurl', categoryURL)
        
        fetch(`${customYmm["subCategoryAPI"]}?category=${categoryURL}`)
        .then(response => response.json())
        .then(data => {
            data.shift();
                 
            if(data.length)
                document.querySelector(customYmm["subCatContainerForCategoryPage"]).style.display  = "block"
            var catTitle = document.querySelector('.bd-title').innerText
            
            document.querySelector(customYmm["subCatContainerForCategoryPage"]).innerHTML = 
                `<div class="categories-items-wrapper">`  +         
              data.map(subCat => {
                  console.log(subCat)
                  return ``
              }).join('')
              + '</div>'  
            
        })
        
    }

    

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


    function pushToGarage(containerId){

        const selectedYear = customYmm[`${containerId}`].selections.year
        const selectedMake = customYmm[`${containerId}`].selections.make
        const selectedModel = customYmm[`${containerId}`].selections.model
        const selectedSubModel = customYmm[`${containerId}`].selections.sub_model

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
                    vehicle.sub_model = selectedSubModel 
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
                sub_model: selectedSubModel
            }
        )

        setCookie("garage", JSON.stringify(customYmm["garage"]))


    }

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
        
        
        
  // Get the URL from the browser's address bar
        var url = window.location.href;
        
        // Create a new URL object
        var parsedUrl = new URL(url);
        
        // Retrieve the protocol (http or https)
        var protocol = parsedUrl.protocol;
        
        // Retrieve the hostname (website name)
        var hostname = parsedUrl.hostname;
        // Find the part of the URL after the '?'
        let basePath = protocol+'//'+hostname+'/a/search/'
        window.location.href =   protocol+'//'+hostname+'/search/'

        let [selectedYear, selectedMake, selectedModel, selectedSubModel] = returnSelections('custom-ymm-form-for-home-page')
        let ymmdfn = [selectedYear, selectedMake, selectedModel, selectedSubModel]
        ymmdfn = ymmdfn.filter(e=> (e !== false && e!== '')).map(ee=>ee.replaceAll(' ', '_'))
        if(ymmdfn.length){
            basePath += `v/${ymmdfn.join('>')}/`
        }
            
        // window.location.href =  basePath
    }

    const decideWhatHappensAfterFormChangeInHomePage = async (containerId) => {
    
        let [selectedYear, selectedMake, selectedModel, selectedSubModel] = returnSelections(containerId)
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
        hideSelectTag(containerId, "select-sub-model")
        


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
        
        hideSelectTag(containerId, "select-sub-model")
        
    }

    function setupForCategoryPage(){
        setupForSearchPage(isCategoryPage = true)
    }
    
    function setupForBrandPage(){
       setupForSearchPage() 
    }

    async function loadSettingsFile(){
        
        customYmm['settingsURL'] = 'https://auto.searchalytics.com/flextread/dashboard/send_settings.php?requestedFile=settings.json'
        
        const response = await fetch(customYmm['settingsURL'])
        
        const jsonData = await response.json()
        
        // customYmm['settings'] = jsonData
        
        customYmm['settings'] = {
    "showCategoryImages": true,
    "hideProductsUntilSelected": false,
    "showBrandInProductCards": true,
    "showReviewsInProductCards": true,
    "showButtonsInProductCards": false,
    "productsPerRow": "3",
    "productCardImageAspectRatio": [
        "4:3"
    ],
    "headerVehicleIcon": [
        "jeep"
    ],
    "years": [
        "2024",
        "2023",
        "2022",
        "2021",
        "2020",
        "2019",
        "2018",
        "2017",
        "2016",
        "2015",
        "2014",
        "2013",
        "2012",
        "2011",
        "2010",
        "2009",
        "2008",
        "2007",
        "2006",
        "2005",
        "2004",
        "2003",
        "2002",
        "2001",
        "2000",
        "1999",
        "1998",
        "1997",
        "1996",
        "1995",
        "1994",
        "1993",
        "1992",
        "1991",
        "1990",
        "1989",
        "1988",
        "1987",
        "1986",
        "1985",
        "1984",
        "1983",
        "1982",
        "1981",
        "1980",
        "1979",
        "1978",
        "1977",
        "1976",
        "1975",
        "1974",
        "1973",
        "1972",
        "1971",
        "1970",
        "1969",
        "1968",
        "1967",
        "1966",
        "1965",
        "1963",
        "1962",
        "1961",
        "1960",
        "1959",
        "1958",
        "1957",
        "1955",
        "1953",
        "1952"
    ]
}
        const ys = [];
        
        // Convert strings to integers
let yearsInt = jsonData.years.map(year => parseInt(year));

// Sort the array to find the lowest and highest years
yearsInt.sort((a, b) => a - b);
let lowestYear = yearsInt[0];
let highestYear = yearsInt[yearsInt.length - 1];

// Create an array containing all the years from lowest to highest
let allYears = [];
for (let i = highestYear; i >= lowestYear; i--) {
    allYears.push(i);
}
        
        customYmm['years'] = allYears;
        
        
        
        console.log(customYmm['settings'])
        
    }

    async function initialize(){

        loadCssFile()
        
        await loadSettingsFile();

        decideWhichPageIsIt()


        setupHeader()

        if(customYmm["isInProductPage"]) setupForProductPage()
        else if(customYmm["isInHomePage"]) setupForHomePage()
        else if(customYmm["isInCategoryPage"]) setupForCategoryPage()
        else if(customYmm["isInSearchPage"]) setupForSearchPage()
        else if(customYmm["isInBrandPage"]) setupForBrandPage()
        
    }

document.addEventListener("DOMContentLoaded", () => {
    initialize();
});