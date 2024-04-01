
    function hideOrShowMobileFilter(){

        document.querySelector('.background-overlay').addEventListener('click', ()=> hideOrShowMobileFilter())
        if(document.querySelector(customYmm['filtersWrapperMobile'])){
            document.querySelector(customYmm['filtersWrapperMobile']).classList.toggle('mobile-filters-open')
            document.body.classList.toggle('mobile-filter-overlay')

        }

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

            document.querySelector('.ymm-categories').innerHTML = `
                <div class="collapsible-wrapper">
                    <div class="collapsible-title-icon" onclick="hideOrShowCollapsibleContent(event)" >
                        <h3>Category</h3>
                        <div class="collapsible-toggle-icon">${returnArrowLeft()}</div>
                    </div>
                    <div class="collapsible-content">
                        <ul id="tree" class="tree"></ul>
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

            fetchProductsAndRender()


        }


        // Add a "change" event listener to each checkbox
        checkboxes.forEach((checkbox) => {

          checkbox.addEventListener('change', handleCheckboxChange);
        
        });

    }



function fillupFiltersWrappers(){
    
    if(document.querySelector('.ymm-filters-selections')){
            document.querySelector('.ymm-filters-selections').innerHTML = ''

        if(customYmm['searchQuery'].trim().length){
               document.querySelector('.ymm-filters-selections').innerHTML += `
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
        }
        
        if( customYmm['selectedCategories'] ){
            
            document.querySelector('.ymm-filters-selections').innerHTML +=  customYmm['selectedCategories']
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
                
        if( customYmm['selectedBrands'].length ){

         document.querySelector('.ymm-filters-selections').innerHTML += customYmm['selectedBrands']
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
        
                        
        if( customYmm['selectedPrices'].length ){
   
            document.querySelector('.ymm-filters-selections').innerHTML += customYmm['selectedPrices']
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
        
    }
    
    
    if(document.querySelector('.ymm-brands') && customYmm["brands"]){
        brandData = customYmm["brands"];
        
        document.querySelector('.ymm-brands').innerHTML = `
            <div class="collapsible-wrapper">
                <div class="collapsible-title-icon" onclick="hideOrShowCollapsibleContent(event)">
                    <h3>Brand</h3>
                    <div class="collapsible-toggle-icon" >${returnArrowLeft()}</div>
                </div>
                <div class="collapsible-content">
                    ${brandData.map(brand => createBrandItem(brand)).join(' ')}
                </div>
            </div>
        `

    }

    const categories = customYmm["categories"] ;

    if(categories){
        displayCategories(categories)
        displayPriceRanges()
        assignListenerToTheCheckBoxes()
    }else{
        document.querySelector('.ymm-filters-selections').innerHTML = ''
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


window.onresize = function(){
    console.log("reeized")
    displayResponsiveFilters()
}
