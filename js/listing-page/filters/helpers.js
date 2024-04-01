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
         return'<span class="remove-all" onclick="removeAllFilters()">Clear All</span>'
    }else{
        return '<span class="disabled remove-all">Clear All</span>'
    }
    
    
    
}

function returnFiltersWrappers(){
    
    return`

        <div class="ymm-filters">
            
            <div class="ymm-brands-wrapper ymm-filters-wrapper-inner">
                
                <div class="filters-heading">
                    <h2 class="h2">FILTER BY</h2>
                </div>
                
                <div class="ymm-categories">
                    
                </div>

                <div class = "ymm-brands">
                    
                </div>

                <div class="ymm-price">
                    
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
    fetchProductsAndRender()
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


          
        document.querySelector('.ymm-price').innerHTML = `
        
            <div class="collapsible-wrapper">
                <div  class="collapsible-title-icon" onclick="hideOrShowCollapsibleContent(event)">
                    <h3>Price</h3>
                    <div class="collapsible-toggle-icon" >${returnArrowLeft()}</div>
                </div>
                <div class="collapsible-content">
                    ${Object.keys(priceIdsAndLabels).filter(id=>customYmm["priceRanngesVsFrequency"][id] > 0 ).map(key => createPriceItem(key, priceIdsAndLabels[key]) ).join(' ')}
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
