async function loadSettingsFile(){customYmm.settingsURL="https://auto.searchalytics.com/suspension-bros/dashboard/send_settings.php?requestedFile=settings.json";var e=await(await fetch(customYmm.settingsURL)).json();customYmm.settings=e,customYmm.years=e.years,console.log(customYmm.settings)}async function initialize(){loadCssFile(),await loadSettingsFile(),decideWhichPageIsIt(),setupAddToGarageYMMform(),setupHeader(),customYmm.isInProductPage?setupForProductPage():customYmm.isInHomePage?setupForHomePage():customYmm.isInCategoryPage?setupForCategoryPage():customYmm.isInSearchPage?setupForSearchPage():customYmm.isInBrandPage&&setupForBrandPage()}async function setInitialSelections(){function e(e){return new URLSearchParams(window.location.search).get(e)}void 0!==customYmm.settings&&void 0!==customYmm.settings.hideProductsUntilSelected?customYmm.hideProductsUntilSelected=customYmm.settings.hideProductsUntilSelected:customYmm.hideProductsUntilSelected=!1,customYmm.products={},customYmm.loadMore=!0,customYmm.productsPerPage=12,customYmm.currentPage=1,customYmm.selectedCategories=[],customYmm.selectedBrands=[],customYmm.selectedPrices=[],customYmm.selectedCategory=!1,setDefaultCategory(),retrieveURLparams();var t=e("sq"),t=(null!==t&&(customYmm.searchQuery=t.trim()),customYmm.isInBrandPage&&null!==(t=e("q"))&&customYmm.selectedBrands.push(t.replaceAll("%20"," ")),"search-page-ymm-form-container");let r=!1;(customYmm.isInCategoryPage||customYmm.isInBrandPage||customYmm.isInSearchPage)&&0<customYmm.garage.length?(customYmm.garage.length&&((filteredVehicles=customYmm.garage.filter(e=>e.selected)).length?r=filteredVehicles[0]:!0===customYmm.hideProductsUntilSelected&&(document.getElementById("garage-btn").click(),document.getElementById("add-vehicle-to-garage-button").click())),r&&(ymm=r,customYmm[t].selections={year:ymm.year,make:ymm.make,model:ymm.model,drive_type:ymm.drive_type,fuel_type:ymm.fuel_type,num_doors:ymm.num_doors},manageHighlighted(t))):(customYmm.isInCategoryPage||customYmm.isInSearchPage||customYmm.isInBrandPage)&&!0===customYmm.hideProductsUntilSelected&&document.getElementById("garage-btn").click(),""==customYmm.searchQuery&&!1!==customYmm.hideProductsUntilSelected&&!1===r||fetchProductsAndRender()}function retrieveURLparams(){var e=location.href.split("?");if(1<e.length){var t=e[1].split("/");for(let e=0;e<t.length;e+=2){var r,a=t[e],s=t[e+1];"category"===a?(r="/"+(r=s).replaceAll("%3E","/")+"/",customYmm.selectedCategories.push(r)):"brand"===a||"q"===a&&customYmm.isInBrandPage?customYmm.selectedBrands.push(s.replaceAll("%20"," ")):"prices"===a&&customYmm.selectedPrices.push(s)}0<customYmm.selectedCategories.length&&(customYmm.selectedCategory=customYmm.selectedCategories[customYmm.selectedCategories.length-1])}}function setURLparams(){let e=location.href.split("?")[0],t="";customYmm.selectedCategory&&customYmm.selectedCategories.forEach(e=>{t+=`category/${e.replace(/^\/|\/$/g,"").replace(/\//g,">")}/`}),0<customYmm.selectedBrands.length&&(t+=`brand/${customYmm.selectedBrands.join(",")}/`),0<customYmm.selectedPrices.length&&(t+=`prices/${customYmm.selectedPrices.join(",")}/`),0<t.trim().length&&(e+="?"+t),history.replaceState({},"",e)}function decideWhichPageIsIt(){window.location.href.includes("/products/")?customYmm.isInProductPage=!0:window.location.href.includes("/search/")||window.location.href.includes("/search")?customYmm.isInSearchPage=!0:document.querySelector(customYmm.isInHomePageChecker)?customYmm.isInHomePage=!0:window.location.href.includes("/collections/vendors")?customYmm.isInBrandPage=!0:window.location.href.includes("/collections")&&(customYmm.isInCategoryPage=!0)}initialize();const customYmm={};function returnSiteURL(){var e=window.location.href,e=new URL(e);return e.protocol+"//"+e.hostname}function returnFitsMessage(e){return`

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
                        ${e}
                    </div>
                </div>
                <div class="verify-fitment_body">
                    <a class = "ymm-link" onclick = "displayYMMformFromBody()">Change Vehicle</a> 
                </div>
            </div>

        `}function returnDoesNotFitMessage(e){return`

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
                        <div class="fitment-message">${e}</div>
                    </div>
                    <div class="verify-fitment_body">
                        
                        <span class = "ymm-link" onclick = "displayYMMformFromBody()">Change Vehicle</span> 
                        <div class="verify-fitment_compatibl">
                            <a href = "${customYmm.siteURL}/search/?ymm=last">See Products That Fit Your Vehicle.</a>
                        </div>
                    </div>
                </div>
            </div>
                              
        `}function displayFitmentResult(e){let[r,a,s,o,c,m]=returnSelections(e),n=(carrySelectedVehicle(),!1);e=document.querySelector(".fitment-result");customYmm.fitmentData.forEach((e,t)=>{!(r>=parseInt(e.from_year)&&r<=parseInt(e.to_year)&&a==e.make.trim()&&s==e.model.trim())||""!=o&&""!=e.drive_type.trim()&&o!=e.drive_type.trim()||""!=c&&""!=e.fuel_type.trim()&&c!=e.fuel_type.trim()||""!=m&&""!=e.num_doors.trim()&&m!=e.num_doors.trim()||(n=!0)}),n?(document.querySelector("#form-action-addToCart")&&(document.querySelector("#form-action-addToCart").disabled=!1,document.querySelector("#form-action-addToCart").style.cursor="pointer",document.querySelector("#form-action-addToCart").style.opacity="1"),e.innerHTML=returnFitsMessage(`
                    <span class="selected-ymm selected-ymm-vq"> 
                        <span class="selected-ymm-ymm">
                            ${r} ${a} ${s}
                        </span>
                        <span class="selected-vq">
                            ${o} ${c} ${m}
                        </span>
                    </span>
                `)):(document.querySelector("#form-action-addToCart")&&(document.querySelector("#form-action-addToCart").disabled=!0,document.querySelector("#form-action-addToCart").style.cursor="no-drop",document.querySelector("#form-action-addToCart").style.opacity="0.3"),e.innerHTML=returnDoesNotFitMessage(`
                <span class="selected-ymm selected-ymm-vq"> 
                    <span class="selected-ymm-ymm">
                        ${r} ${a} ${s}
                    </span>
                    <span class="selected-vq">
                        ${o} ${c} ${m}
                    </span>
                </span>
            `))}function saveOrGoforProductPage(e){pushToGarage(e),setupGarage(!1),hideYMMFformFromBody(),displayFitmentResult(e)}customYmm.sortBy="default",customYmm.priceIdsAndLabels={"*-50":"$50 and less","50-100":"$50 to $100","100-250":"$100 to $250","250-500":"$250 to $500","500-1000":"$500 to $1000","1000-*":"$1000 and more"},customYmm.development="production",customYmm.siteURL=returnSiteURL(),"local"==customYmm.development?(customYmm.ymmOnlyApi="provide-ymm-data-only.php",customYmm.fitmentDataApi="provide-fitment-data.php",customYmm.searchDataApi="search.php",customYmm.linkToCssFile="style.css"):(customYmm.selectedCategoryURLVsName={},customYmm.ymmDomain="https://auto.searchalytics.com/suspension-bros/integration",customYmm.ymmOnlyApi=customYmm.ymmDomain+"/provide-ymm-data-only.php",customYmm.fitmentDataApi=customYmm.ymmDomain+"/provide-fitment-data.php",customYmm.searchDataApi=customYmm.ymmDomain+"/search.php",customYmm.linkToCssFile="https://apps.cartmade.com/arjun/suspension-bros/auto_search_suspension_bros.css",customYmm.subCategoryAPI=customYmm.ymmDomain+"/provideSubCategories.php"),customYmm.isInHomePage=!1,customYmm.isInProductPage=!1,customYmm.isInCategoryPage=!1,customYmm.isInBrandPage=!1,customYmm.isInSearchPage=!1,customYmm.productPageWrapper="#seach_auto_fitment_verification",customYmm.homePageWrapper="#suspensionbroshomewrapper",customYmm.searchPageWrapper="#searchpagewrapper",customYmm.subCatContainerForCategoryPage="#subcats-container",customYmm.categoryPageWrapper="#searchpagewrapper",customYmm.brandPageWrapper="#searchpagewrapper",customYmm.garageButtonWrapper=".menu-icons-wrap",customYmm.garageButtonWrapperMobile=".section-header-mobile",customYmm.quickSearchWrapper=".search-modal__content",customYmm.searchQuery="",customYmm.fitmentTableWrapper="#tab-custom-tab-fitment-mobile",customYmm.fitmentTabLinkWrapper=".productView-bottom .tabs",customYmm.isInHomePageChecker="#suspensionbroshomewrapper",customYmm.filtersWrapperMobile="#filters-wrapper-mobile",customYmm.filtersWrapperDesktop="#filters-wrapper-desktop",customYmm.filtersWrapperMobileSidebarClass="halo-sidebar halo-sidebar-left",createFiltersMobileWrapperAndAppend(),customYmm.svgCross=`<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_5_22)">
        <path d="M19.408 3.41599C19.5938 3.23017 19.7412 3.00957 19.8418 2.76678C19.9423 2.524 19.9941 2.26378 19.9941 2.00099C19.9941 1.7382 19.9423 1.47799 19.8418 1.2352C19.7412 0.992413 19.5938 0.771811 19.408 0.585991C19.2222 0.40017 19.0016 0.252772 18.7588 0.152206C18.516 0.0516411 18.2558 -0.00012207 17.993 -0.00012207C17.7302 -0.00012207 17.47 0.0516411 17.2272 0.152206C16.9844 0.252772 16.7638 0.40017 16.578 0.585991L9.99999 7.17499L3.41599 0.591988C3.04071 0.216706 2.53172 0.00587462 2.00099 0.00587463C1.47026 0.00587464 0.961271 0.216706 0.58599 0.591988C0.210709 0.967269 -0.000122059 1.47626 -0.00012207 2.00699C-0.000122081 2.53772 0.210709 3.04671 0.58599 3.42199L7.17499 9.99999L0.59199 16.584C0.216709 16.9593 0.00587792 17.4683 0.00587793 17.999C0.00587795 18.5297 0.216709 19.0387 0.59199 19.414C0.967272 19.7893 1.47626 20.0001 2.00699 20.0001C2.53772 20.0001 3.04671 19.7893 3.42199 19.414L9.99999 12.83L16.584 19.408C16.7698 19.5938 16.9904 19.7412 17.2332 19.8418C17.476 19.9423 17.7362 19.9941 17.999 19.9941C18.2618 19.9941 18.522 19.9423 18.7648 19.8418C19.0076 19.7412 19.2282 19.5938 19.414 19.408C19.5998 19.2222 19.7472 19.0016 19.8478 18.7588C19.9483 18.516 20.0001 18.2558 20.0001 17.993C20.0001 17.7302 19.9483 17.47 19.8478 17.2272C19.7472 16.9844 19.5998 16.7638 19.414 16.578L12.83 9.99999L19.408 3.41599Z" fill="#C2C2C2"/>
        </g>
        <defs>
        <clipPath id="clip0_5_22">
        <rect width="20" height="20" fill="white"/>
        </clipPath>
        </defs>
        </svg>
`,getCookie("garage")?customYmm.garage=JSON.parse(getCookie("garage")):customYmm.garage=[];const decideWhatHappensAfterFormChangeInProductPage=async e=>{var[t,r,a,s,o,c]=returnSelections(e),m=await fetchYmmOnlyDataAndRender(e);m.drive_type_arr=m.drive_type_arr.filter(e=>""!==e),m.fuel_type_arr=m.fuel_type_arr.filter(e=>""!==e),m.num_doors_arr=m.num_doors_arr.filter(e=>""!==e),manageHighlighted(e),m.makes.length&&0==r||m.models.length&&0==a||isDriveTypeExists()&&m.drive_type_arr.length&&""==s||isFuelTypeExists()&&m.fuel_type_arr.length&&""==o||isNumDoorsExists()&&m.num_doors_arr.length&&""==c||0==r||0==t||0==a?(document.querySelector("#form-action-addToCart")&&(document.querySelector("#form-action-addToCart").disabled=!0,document.querySelector("#form-action-addToCart").style.cursor="no-drop",document.querySelector("#form-action-addToCart").style.opacity="0.3"),displayYMMformFromBody()):(enableSelectTag(e,"btn-go"),saveOrGoforProductPage(e),removeHighlighted(e))};function createRequiredWrappersForProductPage(){var e=document.querySelector(customYmm.productPageWrapper),t=document.createElement("div");t.className="form-fitment-wrapper",e.appendChild(t),t.innerHTML=`

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

        `}function hideYMMFformFromBody(){document.querySelector(".custom-ymm-form-body").style.display="none",document.querySelector(".fitment-result").style.display="block"}function displayYMMformFromBody(){document.querySelector(".custom-ymm-form-body").style.display="block",document.querySelector(".fitment-result").style.display="none"}function isDriveTypeExists(){for(var e=0;e<customYmm.fitmentData.length;e++)if(0<customYmm.fitmentData[e].drive_type.trim().length)return!0;return!1}function isFuelTypeExists(){for(var e=0;e<customYmm.fitmentData.length;e++)if(0<customYmm.fitmentData[e].fuel_type.trim().length)return!0;return!1}function isNumDoorsExists(){for(var e=0;e<customYmm.fitmentData.length;e++)if(0<customYmm.fitmentData[e].num_doors.trim().length)return!0;return!1}function returnDriveTypeTH(){return isDriveTypeExists()?"<th>Drive Type</th>":""}function returnFuelTypeTH(){return isFuelTypeExists()?"<th>Fuel Type</th>":""}function returnNumDoorsTH(){return isNumDoorsExists()?"<th>Num Doors</th>":""}function returnDriveTypeTD(e){return isDriveTypeExists()?`<td>${e}</td>`:""}function returnFuelTypeTD(e){return isFuelTypeExists()?`<td>${e}</td>`:""}function returnNumDoorsTD(e){return isNumDoorsExists()?`<td>${e}</td>`:""}function toggleViewMoreOrLess(){var e;customYmm.view_more=!customYmm.view_more,0==customYmm.view_more&&((e=document.querySelector(".tabs-horizontal"))?3<=(e=e.querySelectorAll("li")).length?((e=e[2]).click(),console.log(e)):console.log("There are less than three li elements in the ul."):console.log("No ul element with the class 'tabs-horizontal' found.")),displayFitmentTable(),window.innerWidth<500&&document.querySelector("#tab-fitment").querySelector(".toggleLink").click()}function returnViewMoreOrLessBtn(){return 10<customYmm.fitmentData.length?`
                <span class="btn btn-secondary" onclick="toggleViewMoreOrLess()">${customYmm.view_more?"View Less":"View More"}</span>
            `:""}function displayFitmentTable(){void 0===customYmm.view_more&&(customYmm.view_more=!1);let e=customYmm.fitmentData;if(customYmm.view_more||(e=customYmm.fitmentData.slice(0,10)),0==customYmm.fitmentData.length)return"";var t=`

                    <div class = "fitment-data-table-wrapper ${customYmm.view_more?"viewing-more":"viewing-less"}">
                        <h3>Fitment Table</h3>
                        <div class="fitment-data-table">
                            
    
                            <table>
    
                                <tr>
                                    <th>Year</th>
                                    <th>Make</th>
                                    <th>Model</th>
                                    ${returnDriveTypeTH()}
                                    ${returnFuelTypeTH()}
                                    ${returnNumDoorsTH()}
                                </tr>
    
                                ${e.map(e=>`
                                        <tr>
                                            <td>${e.from_year} - ${e.to_year}</td>
                                            <td>${e.make}</td>
                                            <td>${e.model}</td>
                                            ${returnDriveTypeTD(e.drive_type)}
                                            ${returnFuelTypeTD(e.fuel_type)}
                                            ${returnNumDoorsTD(e.num_doors)}
                                        </tr>
                                    `).join(" ")}
    
                            </table>
                            
                            ${returnViewMoreOrLessBtn()}
                            
                        </div>
    
                    </div>
                

        `,r=document.querySelector(customYmm.fitmentTableWrapper);r?r.innerHTML=t:console.error("fitmenttable wrapper does not exist")}function carrySelectedVehicle(){var e,t,r;document.querySelector("#selected_vehicle")&&0<customYmm.garage.length&&(r=customYmm.garage.filter(({selected:e=!1})=>e)).length&&(e=(r=r[0]).year,t=r.make,r=r.model,document.querySelector("#selected_vehicle").value=e+" "+t+" "+r)}function setupForProductPage(){document.querySelector(".selected_vehicle")&&carrySelectedVehicle();var e=document.querySelector(".product-details").getAttribute("data-productId");fetch(customYmm.fitmentDataApi+"?productID="+e).then(e=>e.json()).then(t=>{if(customYmm.fitmentData=t.fitmentData,displayFitmentTable(),createRequiredWrappersForProductPage(),0==customYmm.fitmentData.length)hideYMMFformFromBody(),document.querySelector(".fitment-result").innerHTML=`

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

                `;else{document.querySelector(".product-recommendations").innerHTML=`
                    <div class="page-width container-wrapper container">
                        <div class="product-related-wrapper">
                            <div class="halo-block-header text-center block-title--style1">
                                <h3 class="title">
                                    <span class="text">RELATED PRODUCTS</span>
                                </h3>
                            </div>                            
                            <div class="products-related">
                                
                              <div class="carousel-products-related ymm-products-wrapper">
                                ${t.relatedProducts.map(e=>constructProductDiv(e)).join(" ")}
                              </div>
                             
                            </div>        
                        </div>
                    </div>
                `,$(".carousel-products-related").slick({slidesToShow:4,slidesToScroll:4,responsive:[{breakpoint:1025,settings:{slidesToShow:4,slidesToScroll:4,infinite:!0,dots:!0,arrows:!1}},{breakpoint:769,settings:{slidesToShow:3,slidesToScroll:3,dots:!0,arrows:!1}},{breakpoint:480,settings:{slidesToShow:2,slidesToScroll:2,dots:!0,arrows:!1}}]}),setupYMMform("product-page-ymm-form","ymm-form-container-container",decideWhatHappensAfterFormChangeInProductPage,saveOrGoforProductPage);let e=!1;(e=customYmm.garage.length&&(filteredVehicles=customYmm.garage.filter(e=>e.selected)).length?filteredVehicles[0]:e)&&(ymm=e,customYmm["product-page-ymm-form"].selections={year:ymm.year,make:ymm.make,model:ymm.model,drive_type:ymm.drive_type,fuel_type:ymm.fuel_type,num_doors:ymm.num_doors}),decideWhatHappensAfterFormChangeInProductPage("product-page-ymm-form")}})}function setupForSearchPage(e=!1){e?(insertWrappersForSearchPage(customYmm.categoryPageWrapper),fetchSubCategoriesAndRender()):insertWrappersForSearchPage(customYmm.searchPageWrapper),setupYMMform("search-page-ymm-form-container","search-page-ymm-form-container",decideWhatHappensAfterFormChangeInSearchPage,saveOrGoForSearchPage),setInitialSelections(),displayBreadCrumb()}function setupForCategoryPage(){setupForSearchPage(isCategoryPage=!0)}function setupForBrandPage(){setupForSearchPage()}function fetchProductsAndRender(r=!1){const a="search-page-ymm-form-container";let[s,o,c,e,t,m]=returnSelections(a);showLoadingOverlay(),fetch(`${customYmm.searchDataApi}?sortby=${customYmm.sortBy}&drive_type=${e}&fuel_type=${t}&num_doors=${m}&searchQuery=${customYmm.searchQuery}&year=${customYmm[a].selections.year}&make=${customYmm[a].selections.make}&model=${customYmm[a].selections.model}&category=${customYmm.selectedCategory}&page=${customYmm.currentPage}&limit=${customYmm.productsPerPage}&brands=${customYmm.selectedBrands.join(",")}&prices=`+customYmm.selectedPrices.join(",")).then(e=>e.json()).then(e=>{var t;console.log("helloosdfsdfhsf"),hideLoadingOverlay(),customYmm.searchResultsCount=e.count,displayMakesAndModels(e,a),hideOrShowFormAfterLoadingDropdownValues(e,a),setSelectedVehicleWithCategoryTitle(),!customYmm.isInCategoryPage||s&&c&&o||!customYmm.hideProductsUntilSelected?(document.querySelector(".ymm-filters-products").style.display="flex",t=e.products,r||(customYmm.products={}),t.forEach(e=>{customYmm.products[""+e.id]=e}),customYmm.allCounts=e.count,renderProducts(e.products,r),document.querySelector(".loading-indicator").innerHTML=generatePagination(customYmm.currentPage,12,customYmm.searchResultsCount),e.products.length==customYmm.productsPerPage?customYmm.loadMore=!0:customYmm.loadMore=!1,customYmm.categories=e.categories,customYmm.brands=e.brands,customYmm.priceRanngesVsFrequency=e.priceRanngesVsFrequency,displayResponsiveFilters(),document.querySelector(".ymm-change-or-clear__title").innerHTML=`
                ${returnSelectionsForBreadCrumb()}
            `,displayBreadCrumb(),scrollToTop()):console.log("returning because in category page and something is not set")}).catch(e=>{hideLoadingOverlay()})}function hideYmmFormInSearchPage(){document.querySelector(".ymm-form-search-page").style.display="none",document.querySelector(".ymm-change-or-clear").style.display="flex"}function displayYmmFormInSearchPage(){document.querySelector(".ymm-form-search-page").style.display="block",document.querySelector(".ymm-change-or-clear").style.display="none"}function clearYMMformAndDisplay(){document.querySelector(".ymm-form-search-page").querySelector(".btn-clear").click(),displayBreadCrumb()}function insertWrappersForSearchPage(e){let t="";document.querySelector("#search_auto_data")&&(t=document.querySelector("#search_auto_data").getAttribute("data-site_width"));var r=customYmm.settings.productsPerRow;document.querySelector(e).innerHTML+=`

            <div class="ymm-container ${t} container">

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
                        <div class="ymm-products grid-col-${r}">
                            
                        
                        </div>

                        <div class = "loading-indicator">
                        </div>
                    
                    </div>
                
                </div>
            
            </div>

        `}function saveOrGoForSearchPage(e){pushToGarage(e),hideYmmFormInSearchPage(),fetchProductsAndRender(),setupGarage(!1)}const decideWhatHappensAfterFormChangeInSearchPage=async e=>{customYmm.currentPage=1;var[t,r,a,s,o,c]=returnSelections(e),m=(clearContentsForCategoryPage(),await fetchYmmOnlyDataAndRender(e));manageHighlighted(e),m.drive_type_arr=m.drive_type_arr.filter(e=>""!==e),m.fuel_type_arr=m.fuel_type_arr.filter(e=>""!==e),m.num_doors_arr=m.num_doors_arr.filter(e=>""!==e),t&&r&&a&&enableSelectTag(e,"btn-go"),m.makes.length&&0==r||m.models.length&&0==a||m.drive_type_arr.length&&""==s||m.fuel_type_arr.length&&""==o||m.num_doors_arr.length&&""==c?!0!==customYmm.hideProductsUntilSelected&&fetchProductsAndRender():(removeHighlighted(e),saveOrGoForSearchPage(e))};function displayStars(e){if(0===Math.ceil(e)){var t="";for(i=0;i<5;i++)t+=returnGreyedOutStar()}else{t="";for(i=0;i<Math.ceil(e);i++)t+=returnColorfulStar()}return t}function formatPrice(e){return(e=parseFloat(e))%1!=0?e.toLocaleString(void 0,{minimumFractionDigits:2,maximumFractionDigits:2}):e.toLocaleString(void 0,{minimumFractionDigits:0,maximumFractionDigits:0})}function displayPrices(e,t){return null!==e&&0<e?`
            <span class="sale-price">$${formatPrice(t)}</span>
            <span class="compare-at-price ymm-product-price default-price">$${formatPrice(e)}</span>
        `:`
            <span class ="sale-price">$${formatPrice(t)}</span>
        `}function displayAddToCartButton(e){return customYmm.settings.showButtonsInProductCards?`
            <div class="add-to-cart-btn">
                <a href="#" onclick="addToCart(${e})"  data-event-type="product-click" data-button-type="add-cart" class="button button--secondary card-figcaption-button halo-add-to-cart" data-product-id="${e}" data-wait-message="Adding to Cart…">Add to Cart</a>
            </div>`:""}function displayOrHideStars(e){return void 0!==customYmm.settings.showReviewsInProductCards?`
            <div class="stars-and-review-count">
                <span class="stars">${displayStars(e.reviewsRatingSum)}</span>
                <span class="review-count">(${e.reviewCount})</span>    
            </div>
        `:""}function returnProductImage(e){return null!=e?`
            <img class ="ymm-product-thumbnail" src = "${e}"  />
        `:`
        <svg class="placeholder-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 525.5 525.5"><path d="M375.5 345.2c0-.1 0-.1 0 0 0-.1 0-.1 0 0-1.1-2.9-2.3-5.5-3.4-7.8-1.4-4.7-2.4-13.8-.5-19.8 3.4-10.6 3.6-40.6 1.2-54.5-2.3-14-12.3-29.8-18.5-36.9-5.3-6.2-12.8-14.9-15.4-17.9 8.6-5.6 13.3-13.3 14-23 0-.3 0-.6.1-.8.4-4.1-.6-9.9-3.9-13.5-2.1-2.3-4.8-3.5-8-3.5h-54.9c-.8-7.1-3-13-5.2-17.5-6.8-13.9-12.5-16.5-21.2-16.5h-.7c-8.7 0-14.4 2.5-21.2 16.5-2.2 4.5-4.4 10.4-5.2 17.5h-48.5c-3.2 0-5.9 1.2-8 3.5-3.2 3.6-4.3 9.3-3.9 13.5 0 .2 0 .5.1.8.7 9.8 5.4 17.4 14 23-2.6 3.1-10.1 11.7-15.4 17.9-6.1 7.2-16.1 22.9-18.5 36.9-2.2 13.3-1.2 47.4 1 54.9 1.1 3.8 1.4 14.5-.2 19.4-1.2 2.4-2.3 5-3.4 7.9-4.4 11.6-6.2 26.3-5 32.6 1.8 9.9 16.5 14.4 29.4 14.4h176.8c12.9 0 27.6-4.5 29.4-14.4 1.2-6.5-.5-21.1-5-32.7zm-97.7-178c.3-3.2.8-10.6-.2-18 2.4 4.3 5 10.5 5.9 18h-5.7zm-36.3-17.9c-1 7.4-.5 14.8-.2 18h-5.7c.9-7.5 3.5-13.7 5.9-18zm4.5-6.9c0-.1.1-.2.1-.4 4.4-5.3 8.4-5.8 13.1-5.8h.7c4.7 0 8.7.6 13.1 5.8 0 .1 0 .2.1.4 3.2 8.9 2.2 21.2 1.8 25h-30.7c-.4-3.8-1.3-16.1 1.8-25zm-70.7 42.5c0-.3 0-.6-.1-.9-.3-3.4.5-8.4 3.1-11.3 1-1.1 2.1-1.7 3.4-2.1l-.6.6c-2.8 3.1-3.7 8.1-3.3 11.6 0 .2 0 .5.1.8.3 3.5.9 11.7 10.6 18.8.3.2.8.2 1-.2.2-.3.2-.8-.2-1-9.2-6.7-9.8-14.4-10-17.7 0-.3 0-.6-.1-.8-.3-3.2.5-7.7 3-10.5.8-.8 1.7-1.5 2.6-1.9h155.7c1 .4 1.9 1.1 2.6 1.9 2.5 2.8 3.3 7.3 3 10.5 0 .2 0 .5-.1.8-.3 3.6-1 13.1-13.8 20.1-.3.2-.5.6-.3 1 .1.2.4.4.6.4.1 0 .2 0 .3-.1 13.5-7.5 14.3-17.5 14.6-21.3 0-.3 0-.5.1-.8.4-3.5-.5-8.5-3.3-11.6l-.6-.6c1.3.4 2.5 1.1 3.4 2.1 2.6 2.9 3.5 7.9 3.1 11.3 0 .3 0 .6-.1.9-1.5 20.9-23.6 31.4-65.5 31.4h-43.8c-41.8 0-63.9-10.5-65.4-31.4zm91 89.1h-7c0-1.5 0-3-.1-4.2-.2-12.5-2.2-31.1-2.7-35.1h3.6c.8 0 1.4-.6 1.4-1.4v-14.1h2.4v14.1c0 .8.6 1.4 1.4 1.4h3.7c-.4 3.9-2.4 22.6-2.7 35.1v4.2zm65.3 11.9h-16.8c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h16.8v2.8h-62.2c0-.9-.1-1.9-.1-2.8h33.9c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-33.9c-.1-3.2-.1-6.3-.1-9h62.5v9zm-12.5 24.4h-6.3l.2-1.6h5.9l.2 1.6zm-5.8-4.5l1.6-12.3h2l1.6 12.3h-5.2zm-57-19.9h-62.4v-9h62.5c0 2.7 0 5.8-.1 9zm-62.4 1.4h62.4c0 .9-.1 1.8-.1 2.8H194v-2.8zm65.2 0h7.3c0 .9.1 1.8.1 2.8H259c.1-.9.1-1.8.1-2.8zm7.2-1.4h-7.2c.1-3.2.1-6.3.1-9h7c0 2.7 0 5.8.1 9zm-7.7-66.7v6.8h-9v-6.8h9zm-8.9 8.3h9v.7h-9v-.7zm0 2.1h9v2.3h-9v-2.3zm26-1.4h-9v-.7h9v.7zm-9 3.7v-2.3h9v2.3h-9zm9-5.9h-9v-6.8h9v6.8zm-119.3 91.1c-2.1-7.1-3-40.9-.9-53.6 2.2-13.5 11.9-28.6 17.8-35.6 5.6-6.5 13.5-15.7 15.7-18.3 11.4 6.4 28.7 9.6 51.8 9.6h6v14.1c0 .8.6 1.4 1.4 1.4h5.4c.3 3.1 2.4 22.4 2.7 35.1 0 1.2.1 2.6.1 4.2h-63.9c-.8 0-1.4.6-1.4 1.4v16.1c0 .8.6 1.4 1.4 1.4H256c-.8 11.8-2.8 24.7-8 33.3-2.6 4.4-4.9 8.5-6.9 12.2-.4.7-.1 1.6.6 1.9.2.1.4.2.6.2.5 0 1-.3 1.3-.8 1.9-3.7 4.2-7.7 6.8-12.1 5.4-9.1 7.6-22.5 8.4-34.7h7.8c.7 11.2 2.6 23.5 7.1 32.4.2.5.8.8 1.3.8.2 0 .4 0 .6-.2.7-.4 1-1.2.6-1.9-4.3-8.5-6.1-20.3-6.8-31.1H312l-2.4 18.6c-.1.4.1.8.3 1.1.3.3.7.5 1.1.5h9.6c.4 0 .8-.2 1.1-.5.3-.3.4-.7.3-1.1l-2.4-18.6H333c.8 0 1.4-.6 1.4-1.4v-16.1c0-.8-.6-1.4-1.4-1.4h-63.9c0-1.5 0-2.9.1-4.2.2-12.7 2.3-32 2.7-35.1h5.2c.8 0 1.4-.6 1.4-1.4v-14.1h6.2c23.1 0 40.4-3.2 51.8-9.6 2.3 2.6 10.1 11.8 15.7 18.3 5.9 6.9 15.6 22.1 17.8 35.6 2.2 13.4 2 43.2-1.1 53.1-1.2 3.9-1.4 8.7-1 13-1.7-2.8-2.9-4.4-3-4.6-.2-.3-.6-.5-.9-.6h-.5c-.2 0-.4.1-.5.2-.6.5-.8 1.4-.3 2 0 0 .2.3.5.8 1.4 2.1 5.6 8.4 8.9 16.7h-42.9v-43.8c0-.8-.6-1.4-1.4-1.4s-1.4.6-1.4 1.4v44.9c0 .1-.1.2-.1.3 0 .1 0 .2.1.3v9c-1.1 2-3.9 3.7-10.5 3.7h-7.5c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h7.5c5 0 8.5-.9 10.5-2.8-.1 3.1-1.5 6.5-10.5 6.5H210.4c-9 0-10.5-3.4-10.5-6.5 2 1.9 5.5 2.8 10.5 2.8h67.4c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-67.4c-6.7 0-9.4-1.7-10.5-3.7v-54.5c0-.8-.6-1.4-1.4-1.4s-1.4.6-1.4 1.4v43.8h-43.6c4.2-10.2 9.4-17.4 9.5-17.5.5-.6.3-1.5-.3-2s-1.5-.3-2 .3c-.1.2-1.4 2-3.2 5 .1-4.9-.4-10.2-1.1-12.8zm221.4 60.2c-1.5 8.3-14.9 12-26.6 12H174.4c-11.8 0-25.1-3.8-26.6-12-1-5.7.6-19.3 4.6-30.2H197v9.8c0 6.4 4.5 9.7 13.4 9.7h105.4c8.9 0 13.4-3.3 13.4-9.7v-9.8h44c4 10.9 5.6 24.5 4.6 30.2z"></path><path d="M286.1 359.3c0 .4.3.7.7.7h14.7c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-14.7c-.3 0-.7.3-.7.7zm5.3-145.6c13.5-.5 24.7-2.3 33.5-5.3.4-.1.6-.5.4-.9-.1-.4-.5-.6-.9-.4-8.6 3-19.7 4.7-33 5.2-.4 0-.7.3-.7.7 0 .4.3.7.7.7zm-11.3.1c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7H242c-19.9 0-35.3-2.5-45.9-7.4-.4-.2-.8 0-.9.3-.2.4 0 .8.3.9 10.8 5 26.4 7.5 46.5 7.5h38.1zm-7.2 116.9c.4.1.9.1 1.4.1 1.7 0 3.4-.7 4.7-1.9 1.4-1.4 1.9-3.2 1.5-5-.2-.8-.9-1.2-1.7-1.1-.8.2-1.2.9-1.1 1.7.3 1.2-.4 2-.7 2.4-.9.9-2.2 1.3-3.4 1-.8-.2-1.5.3-1.7 1.1s.2 1.5 1 1.7z"></path><path d="M275.5 331.6c-.8 0-1.4.6-1.5 1.4 0 .8.6 1.4 1.4 1.5h.3c3.6 0 7-2.8 7.7-6.3.2-.8-.4-1.5-1.1-1.7-.8-.2-1.5.4-1.7 1.1-.4 2.3-2.8 4.2-5.1 4zm5.4 1.6c-.6.5-.6 1.4-.1 2 1.1 1.3 2.5 2.2 4.2 2.8.2.1.3.1.5.1.6 0 1.1-.3 1.3-.9.3-.7-.1-1.6-.8-1.8-1.2-.5-2.2-1.2-3-2.1-.6-.6-1.5-.6-2.1-.1zm-38.2 12.7c.5 0 .9 0 1.4-.1.8-.2 1.3-.9 1.1-1.7-.2-.8-.9-1.3-1.7-1.1-1.2.3-2.5-.1-3.4-1-.4-.4-1-1.2-.8-2.4.2-.8-.3-1.5-1.1-1.7-.8-.2-1.5.3-1.7 1.1-.4 1.8.1 3.7 1.5 5 1.2 1.2 2.9 1.9 4.7 1.9z"></path><path d="M241.2 349.6h.3c.8 0 1.4-.7 1.4-1.5s-.7-1.4-1.5-1.4c-2.3.1-4.6-1.7-5.1-4-.2-.8-.9-1.3-1.7-1.1-.8.2-1.3.9-1.1 1.7.7 3.5 4.1 6.3 7.7 6.3zm-9.7 3.6c.2 0 .3 0 .5-.1 1.6-.6 3-1.6 4.2-2.8.5-.6.5-1.5-.1-2s-1.5-.5-2 .1c-.8.9-1.8 1.6-3 2.1-.7.3-1.1 1.1-.8 1.8 0 .6.6.9 1.2.9z"></path></svg>
    `}function displayBrand(e){return customYmm.settings.showBrandInProductCards?`
            <div class="brand-name">
                ${e}
            </div>        
        `:""}function scrollToTop(){window.scrollTo({top:0,behavior:"smooth"})}function constructProductDiv(e){var t=customYmm.settings.productCardImageAspectRatio;return t.length&&(t="4:3"==t?"card_ratio_4_3":"1:1"==t?"card_ratio_1_1":""),`
            <div class = "product">
                
                <div class="ymm-product-wrapper ymm-product-item">
                    <div class="ymm-product-wrapper-holder">
                        <a href = "${customYmm.siteURL}/products/${e.url}/">
                            <div class  = "ymm-product-thumbnail-wrapper ${t}">
                               ${returnProductImage(e.thumbnail)}
                            </div>
                         </a>
                        <div class="ymm-product-wrapper-item">
                            <div class = "ymm-product-name-price">
                                
                                ${displayBrand(e.brand)}
                                
                                <div class= "ymm-product-name">
                                     <a href = "${customYmm.siteURL}/products/${e.url}/">
                                        ${e.name}
                                    </a>
                                </div>
                                

                                <div class="sale-and-default-price">
                                    
                                    ${displayPrices(e.compare_at_price,e.price)}
            
                                </div>
                            </div>
                    
                            <div class="product-action-buttons">
                                 ${displayAddToCartButton(e.variant_id)} 
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        
         `}function renderProducts(e,t=0){document.querySelector(".ymm-products").innerHTML="",document.querySelector(".no-results-message-outer").innerHTML="",document.querySelector(".search-results-count").innerHTML="",0<customYmm.searchResultsCount?(document.querySelector(".search-results-count").innerHTML=generateProductRangeText(),document.querySelector(".ymm-products").innerHTML=e.map(e=>constructProductDiv(e)).join("")):document.querySelector(".no-results-message-outer").innerHTML=`
            <div class="no-results-message">
                <p class="no-results-msg-inner">
                    No any products exist for this filter combination.
                    <br>
                    <a href = "${customYmm.siteURL}/search/">Please Click Here</a> to find all the parts that fit your selection or <a href="#"> ${returnClearAllText()} </a> filters.
                </p>
            </div>
        `}function renderCheckbox(e){return`
            
            <input 
            
                id = "shop-by-category-${e.url}"
                ${customYmm.isInCategoryPage&&0==e.parent_id?"disabled":""} 
                type = "checkbox" 
                data-filter-type = "category"
                name = "shop-by-category"
                data-term = "${e.url}"
                data-category-name='${e.name.trim()}'
                class  = "cb-filter" 
                data-category-url = "${e.url}"
                ${customYmm.selectedCategories.includes(e.url)?"checked":""} 
            
            />
            
        `}function displayEachCategory(e){return`
            <div class="ymm-categories-item">
                ${renderCheckbox(e)}

                <label for="shop-by-category-${e.url}" class="form-label--checkbox">
                    <span class="category-name">${e.name}</span>
                    <span class="category-hits">${e.hits}</span>
                </label>
            </div>    
        `}function fetchPreviousPage(){--customYmm.currentPage,fetchProductsAndRender()}function fetchNextPage(){customYmm.currentPage+=1,fetchProductsAndRender()}function fetchNewData(e){customYmm.currentPage=e,fetchProductsAndRender()}function generatePagination(t,e,r){console.log(t,e,r);var a=Math.ceil(r/e),s=window.innerWidth<768?0:2,o=[];if(1<t&&o.push({label:"Previous",page:t-1}),a<=(totalPagesThreshold=window.innerWidth<768?3:6))for(let e=1;e<=a;e++)o.push({label:String(e),page:e});else{for(let e=Math.max(1,t-s);e<=Math.min(a,t+s);e++)o.push({label:String(e),page:e});t+s<a&&(o.push({label:"...",disabled:!0}),o.push({label:String(a),page:a}))}return t<a&&o.push({label:"Next",page:t+1}),console.log(o),`
        <ul class="pagination">
            ${o.map(e=>`
            <li 
                class="pagination-link ${customYmm.currentPage==e.page?"active":""} ${"Previous"==e.label||"Next"==e.label?"pagination-btn":""} ${"..."==e.label?"disabled":""}"
                onclick="${"..."!=e.label&&customYmm.currentPage!=e.page?"fetchNewData("+e.page+")":""} "
            >
                ${"Previous"==e.label?returnPreviousIcon():"Next"==e.label?returnNextIcon():e.label}
            </li>
        `).join("")}
        </ul>
        <div class="search-results-count">
            ${generateProductRangeText()}
        </div>
    `}function generateProductRangeText(){if(0==customYmm.searchResultsCount)return"";currentPage=customYmm.currentPage,totalResults=customYmm.searchResultsCount,productsPerPage=12;var e=(currentPage-1)*productsPerPage+1,t=currentPage*productsPerPage;return`<span class="results-range">${e}-${t>totalResults?totalResults:t}</span>`+` of <span class="total-results"> ${totalResults} </span> products`}function hideOrShowMobileFilter(){document.querySelector(".background-overlay").addEventListener("click",()=>hideOrShowMobileFilter()),document.querySelector(customYmm.filtersWrapperMobile)&&(document.querySelector(customYmm.filtersWrapperMobile).classList.toggle("mobile-filters-open"),document.body.classList.toggle("mobile-filter-overlay"))}function convertCategoriesToHierarchialForm(e){const r={},a=[];return e.forEach(e=>{e.children=[],r[e.id]=e}),e.forEach(e=>{var t;0===parseInt(e.parent_id)?a.push(e):(t=r[e.parent_id])&&t.children.push(e)}),a}function displayCategories(e){0<e.length&&(e=e,document.querySelector(".ymm-categories").innerHTML=`
                <div class="collapsible-wrapper">
                    <div class="collapsible-title-icon" onclick="hideOrShowCollapsibleContent(event)" >
                        <h3>Category</h3>
                        <div class="collapsible-toggle-icon">${returnArrowLeft()}</div>
                    </div>
                    <div class="collapsible-content">
                        <ul id="tree" class="tree"></ul>
                    </div>
                </div>
            `,renderTree(e,document.getElementById("tree")))}function renderTree(e,a){e.forEach(e=>{var t,r=document.createElement("li");r.innerHTML=displayEachCategory(e),a.appendChild(r),0<e.children.length&&((t=document.createElement("ul")).className=`tree  ${customYmm.selectedCategories.includes(e.url)?"":"hidden"} `,r.appendChild(t),renderTree(e.children,t))})}function uncheckSiblingsAndHideChildren(e){function r(e){e=e.querySelector("ul");e&&(e.classList.add("hidden"),e.querySelectorAll('input[type="checkbox"]').forEach(e=>{e.checked=!1}))}const a=e.closest("li");a&&Array.from(a.parentElement.children).forEach(e=>{var t;e!==a&&((t=e.querySelector('input[type="checkbox"]'))&&(t.checked=!1),r(e))}),e.checked||e.closest("li").querySelector("ul")&&(e.closest("li").querySelector("ul").classList.add("hidden"),r(e.closest("li")))}function createFiltersMobileWrapperAndAppend(){var e=document.createElement("div");e.id="filters-wrapper-mobile",e.className=customYmm.filtersWrapperMobileSidebarClass,document.body.appendChild(e)}function assignListenerToTheCheckBoxes(){const t=document.querySelectorAll(".cb-filter");function r(e){customYmm.currentPage=1,customYmm.loadMore=!0,"category"==e.target.getAttribute("data-filter-type")&&uncheckSiblingsAndHideChildren(e.target);e=Array.from(t).filter(e=>e.checked);const a=[];let s=[],o=[];e.forEach(e=>{switch(e.getAttribute("data-filter-type")){case"category":var t=e.getAttribute("data-category-url"),r=e.getAttribute("data-category-name");s.push(t),customYmm.selectedCategoryURLVsName[t]=r;break;case"brand":a.push(e.getAttribute("data-term"));break;case"price":o.push(e.getAttribute("data-term"))}}),customYmm.selectedCategories=s,customYmm.selectedBrands=a,customYmm.selectedPrices=o,0<s.length?customYmm.selectedCategory=s[s.length-1]:(customYmm.selectedCategory=!1,setDefaultCategory()),setURLparams(),fetchProductsAndRender()}t.forEach(e=>{e.addEventListener("change",r)})}function fillupFiltersWrappers(){document.querySelector(".ymm-filters-selections")&&(document.querySelector(".ymm-filters-selections").innerHTML="",customYmm.searchQuery.trim().length&&(document.querySelector(".ymm-filters-selections").innerHTML+=`
                <div class="filter-item-wrapper" onclick="removeSelectedQuery()">
                    <span>
                        <strong>Query:</strong> 
                        <span class="query-name filter-name">${customYmm.searchQuery}</span>
                    </span>
                    <span class='close-icon'>
                        ${returnCloseIcon()}
                    </span>
                </div>
            `),customYmm.selectedCategories&&(document.querySelector(".ymm-filters-selections").innerHTML+=customYmm.selectedCategories.map(e=>`
                                                    <div class="filter-item-wrapper category-name-wrapper ${customYmm.isInCategoryPage?"greyed-out":""}" 
                                                        onclick="removeSelectedCategory('${e}');fetchProductsAndRender()">
                                                        <span>
                                                            <strong>Category:</strong> 
                                                            <span class="category-name filter-name"> ${customYmm.selectedCategoryURLVsName[e]||e.replaceAll("/"," ").trim()}</span>
                                                        </span>
                                                        <span class="close-icon">${customYmm.isInCategoryPage?"":returnCloseIcon()}</span>
                                                    </div>
                                                `).join("")),customYmm.selectedBrands.length&&(document.querySelector(".ymm-filters-selections").innerHTML+=customYmm.selectedBrands.map(e=>`
                                                    <div class="brand-name-wrapper ${customYmm.isInBrandPage?"greyed-out":""} filter-item-wrapper" onclick="removeSelectedBrand();fetchProductsAndRender()">
                                                        <span>
                                                            <strong>Brand:</strong> 
                                                            <span class="brand-name filter-name"> ${e}</span>
                                                        </span>
                                                        <span class="close-icon">
                                                            ${customYmm.isInBrandPage?"":returnCloseIcon()}
                                                        </span>
                                                    </div>
                                                `).join("")),customYmm.selectedPrices.length)&&(document.querySelector(".ymm-filters-selections").innerHTML+=customYmm.selectedPrices.map(e=>`
                                                    <div class="price-name-wrapper filter-item-wrapper" onclick="removeSelectedPrice();fetchProductsAndRender()">
                                                        <span>
                                                            <strong>Price:</strong> 
                                                            <span class="price-name filter-name"> ${customYmm.priceIdsAndLabels[e]||e}</span>
                                                        </span>
                                                        <span class="close-icon"">
                                                            ${returnCloseIcon()}
                                                        </span>
                                                    </div>
                                                `).join("")),document.querySelector(".ymm-brands")&&customYmm.brands&&(brandData=customYmm.brands,document.querySelector(".ymm-brands").innerHTML=`
            <div class="collapsible-wrapper">
                <div class="collapsible-title-icon" onclick="hideOrShowCollapsibleContent(event)">
                    <h3>Brand</h3>
                    <div class="collapsible-toggle-icon" >${returnArrowLeft()}</div>
                </div>
                <div class="collapsible-content">
                    ${brandData.map(e=>createBrandItem(e)).join(" ")}
                </div>
            </div>
        `);var e=customYmm.categories;e?(displayCategories(e),displayPriceRanges(),assignListenerToTheCheckBoxes()):document.querySelector(".ymm-filters-selections").innerHTML="";document.querySelector(".sort-by").innerHTML=`
        <div class="sort-by-wrapper-inner">
            <select class="sort-by-select select" onChange="handleSortByChange(event)">
                ${[{value:"default",label:"Default"},{value:"price-low-to-high",label:"Price Low to High"},{value:"price-high-to-low",label:"Price High to Low"},{value:"title-a-to-z",label:"Title A to Z"},{value:"title-z-to-a",label:"Title Z to A"}].map(({value:e,label:t})=>`
                            <option value="${e}" ${e===customYmm.sortBy?"selected":""}>${t}</option>
                        `).join(" ")}
            </select>
        </div>
    `}function displayResponsiveFilters(){(customYmm.isInCategoryPage||customYmm.isInSearchPage||customYmm.isInBrandPage)&&(1024<window.innerWidth?(console.log("display only in desktop "),document.querySelector(customYmm.filtersWrapperDesktop).innerHTML=returnFiltersWrappers(),document.querySelector(customYmm.filtersWrapperMobile).innerHTML=""):(console.log("display only in mobile"),document.querySelector(customYmm.filtersWrapperDesktop).innerHTML="",document.querySelector(customYmm.filtersWrapperMobile).innerHTML=returnFiltersWrappers()),fillupFiltersWrappers())}function createBrandItem(e){return`
        <div class="input-and-label">
            <input ${customYmm.isInBrandPage?"disabled":""} ${customYmm.selectedBrands.includes(e.name)?"checked":""} name = "cb-filter" data-filter-type = "brand" class = "cb-filter" type = "checkbox" data-brand-id = "${e.id}" id = "cb-${e.id}" data-term = "${e.name}" >
            <label for  = "cb-${e.id}" class="form-label--checkbox">
                <span class="brand-name">${e.name}</span>
                <span class="brand-hits">${e.hits}</span>
            </label>
        </div>
   `}function removeAllFilters(){customYmm.selectedCategories.length&&removeSelectedCategory(customYmm.selectedCategories[0]),removeSelectedBrand(),removeSelectedPrice(),customYmm.searchQuery="",fetchProductsAndRender()}function returnClearAllText(){return customYmm.selectedPrices.length||customYmm.selectedBrands.length||customYmm.searchQuery.length||!customYmm.isInCategoryPage&&customYmm.selectedCategories.length?'<span class="remove-all" onclick="removeAllFilters()">Clear All</span>':'<span class="disabled remove-all">Clear All</span>'}function returnFiltersWrappers(){return`

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
                ${returnClearAllText()}
            </div>

        </div>

        <a href="#" class="close-mobile-filter" onclick="hideOrShowMobileFilter()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path d="M 38.982422 6.9707031 A 2.0002 2.0002 0 0 0 37.585938 7.5859375 L 24 21.171875 L 10.414062 7.5859375 A 2.0002 2.0002 0 0 0 8.9785156 6.9804688 A 2.0002 2.0002 0 0 0 7.5859375 10.414062 L 21.171875 24 L 7.5859375 37.585938 A 2.0002 2.0002 0 1 0 10.414062 40.414062 L 24 26.828125 L 37.585938 40.414062 A 2.0002 2.0002 0 1 0 40.414062 37.585938 L 26.828125 24 L 40.414062 10.414062 A 2.0002 2.0002 0 0 0 38.982422 6.9707031 z"></path></svg>
        </a>
    `}function hideOrShowCollapsibleContent(e){var e=e.target.closest(".collapsible-wrapper"),t=e.querySelector(".collapsible-content"),r=window.getComputedStyle(t),e=e.querySelector(".collapsible-toggle-icon");"none"===r.display?(t.style.display="block",e.innerHTML=returnArrowLeft()):(t.style.display="none",e.innerHTML=returnArrowDown())}function removeSelectedCategory(e){customYmm.isInCategoryPage||(e=customYmm.selectedCategories.indexOf(e),console.log(customYmm.selectedCategories,"1"),customYmm.selectedCategories.splice(e),console.log(customYmm.selectedCategories,"2"),customYmm.selectedCategories.length?customYmm.selectedCategory=customYmm.selectedCategories[customYmm.selectedCategories.length-1]:customYmm.selectedCategory="")}function removeSelectedBrand(){customYmm.isInBrandPage||(customYmm.selectedBrands=[])}function removeSelectedPrice(){customYmm.selectedPrices=[]}function removeSelectedQuery(){customYmm.searchQuery="",fetchProductsAndRender()}window.onresize=function(){console.log("reeized"),displayResponsiveFilters()};const handleSortByChange=e=>{customYmm.sortBy=e.target.value,fetchProductsAndRender()};function displayPriceRanges(){const r=customYmm.priceIdsAndLabels;document.querySelector(".ymm-price").innerHTML=`
        
            <div class="collapsible-wrapper">
                <div  class="collapsible-title-icon" onclick="hideOrShowCollapsibleContent(event)">
                    <h3>Price</h3>
                    <div class="collapsible-toggle-icon" >${returnArrowLeft()}</div>
                </div>
                <div class="collapsible-content">
                    ${Object.keys(r).filter(e=>0<customYmm.priceRanngesVsFrequency[e]).map(e=>{return t=e,e=r[e],`
                <div class="input-and-label">
                    <input ${customYmm.selectedPrices.includes(t)?"checked":""} data-term = "${t}" name = "cb-filter" data-filter-type = "price" class = "cb-filter" type = "checkbox" data-price-id = "${t}" id = "cb-${t}">
                    <label for  = "cb-${t}" class="form-label--checkbox">
                        
                        <span class="brand-name">${e}</span>
                        <span class="brand-hits">${customYmm.priceRanngesVsFrequency[t]}</span>                        
                            
                    </label>
                </div>
            `;var t}).join(" ")}
                </div>
            </div>
        `}function convertArrayOrObjectToArray(e){if(Array.isArray(e))return e;var t,r=[];for(t in e)r.push(e[t]);return r}function filterProductsByBrandIds(r,t){return Object.keys(r).filter(e=>null!=r[e].brand&&t.includes(r[e].brand.pid.toString())).reduce((e,t)=>(e[t]=r[t],e),{})}function returnUniqueObjects(e){const t=new Set;return e.filter(e=>{e=e.id;return!t.has(e)&&(t.add(e),!0)})}function renderCheckbox(e){return`
            
            <input 
            
                id = "shop-by-category-${e.url}"
                ${customYmm.isInCategoryPage&&0==e.parent_id?"disabled":""} 
                type = "checkbox" 
                data-filter-type = "category"
                name = "shop-by-category"
                data-term = "${e.url}"
                data-category-name='${e.name.trim()}'
                class  = "cb-filter" 
                data-category-url = "${e.url}"
                ${customYmm.selectedCategories.includes(e.url)?"checked":""} 
            
            />
            
        `}function displayEachCategory(e){return`
            <div class="ymm-categories-item">
                ${renderCheckbox(e)}

                <label for="shop-by-category-${e.url}" class="form-label--checkbox">
                    <span class="category-name">${e.name}</span>
                    <span class="category-hits">${e.hits}</span>
                </label>
            </div>    
        `}function clearContentsForCategoryPage(){document.querySelector(".ymm-filters-products").style.display="none"}function setSelectedVehicleWithCategoryTitle(){var e,t,r="search-page-ymm-form-container",[a,s,o,,,,]=returnSelections(r);customYmm.isInCategoryPage&&document.querySelector(".page-listing-header--content")&&(e=document.querySelector(".page-listing-header--content")).querySelector("h1.page-heading")&&(t=(e=e.querySelector("h1.page-heading")).innerText,null==customYmm.originalCateogry&&(customYmm.originalCateogry=t),e.innerText=a&&o&&s?returnSelections(r).join(" ")+" "+customYmm.originalCateogry:customYmm.originalCateogry)}function returnCategoryImage(e){return null===e||""==e?`
            <div class="cm_vehicle-categories_category-image-container cm_vehicle-categories_link">
                <svg class="placeholder-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 525.5 525.5"><path d="M375.5 345.2c0-.1 0-.1 0 0 0-.1 0-.1 0 0-1.1-2.9-2.3-5.5-3.4-7.8-1.4-4.7-2.4-13.8-.5-19.8 3.4-10.6 3.6-40.6 1.2-54.5-2.3-14-12.3-29.8-18.5-36.9-5.3-6.2-12.8-14.9-15.4-17.9 8.6-5.6 13.3-13.3 14-23 0-.3 0-.6.1-.8.4-4.1-.6-9.9-3.9-13.5-2.1-2.3-4.8-3.5-8-3.5h-54.9c-.8-7.1-3-13-5.2-17.5-6.8-13.9-12.5-16.5-21.2-16.5h-.7c-8.7 0-14.4 2.5-21.2 16.5-2.2 4.5-4.4 10.4-5.2 17.5h-48.5c-3.2 0-5.9 1.2-8 3.5-3.2 3.6-4.3 9.3-3.9 13.5 0 .2 0 .5.1.8.7 9.8 5.4 17.4 14 23-2.6 3.1-10.1 11.7-15.4 17.9-6.1 7.2-16.1 22.9-18.5 36.9-2.2 13.3-1.2 47.4 1 54.9 1.1 3.8 1.4 14.5-.2 19.4-1.2 2.4-2.3 5-3.4 7.9-4.4 11.6-6.2 26.3-5 32.6 1.8 9.9 16.5 14.4 29.4 14.4h176.8c12.9 0 27.6-4.5 29.4-14.4 1.2-6.5-.5-21.1-5-32.7zm-97.7-178c.3-3.2.8-10.6-.2-18 2.4 4.3 5 10.5 5.9 18h-5.7zm-36.3-17.9c-1 7.4-.5 14.8-.2 18h-5.7c.9-7.5 3.5-13.7 5.9-18zm4.5-6.9c0-.1.1-.2.1-.4 4.4-5.3 8.4-5.8 13.1-5.8h.7c4.7 0 8.7.6 13.1 5.8 0 .1 0 .2.1.4 3.2 8.9 2.2 21.2 1.8 25h-30.7c-.4-3.8-1.3-16.1 1.8-25zm-70.7 42.5c0-.3 0-.6-.1-.9-.3-3.4.5-8.4 3.1-11.3 1-1.1 2.1-1.7 3.4-2.1l-.6.6c-2.8 3.1-3.7 8.1-3.3 11.6 0 .2 0 .5.1.8.3 3.5.9 11.7 10.6 18.8.3.2.8.2 1-.2.2-.3.2-.8-.2-1-9.2-6.7-9.8-14.4-10-17.7 0-.3 0-.6-.1-.8-.3-3.2.5-7.7 3-10.5.8-.8 1.7-1.5 2.6-1.9h155.7c1 .4 1.9 1.1 2.6 1.9 2.5 2.8 3.3 7.3 3 10.5 0 .2 0 .5-.1.8-.3 3.6-1 13.1-13.8 20.1-.3.2-.5.6-.3 1 .1.2.4.4.6.4.1 0 .2 0 .3-.1 13.5-7.5 14.3-17.5 14.6-21.3 0-.3 0-.5.1-.8.4-3.5-.5-8.5-3.3-11.6l-.6-.6c1.3.4 2.5 1.1 3.4 2.1 2.6 2.9 3.5 7.9 3.1 11.3 0 .3 0 .6-.1.9-1.5 20.9-23.6 31.4-65.5 31.4h-43.8c-41.8 0-63.9-10.5-65.4-31.4zm91 89.1h-7c0-1.5 0-3-.1-4.2-.2-12.5-2.2-31.1-2.7-35.1h3.6c.8 0 1.4-.6 1.4-1.4v-14.1h2.4v14.1c0 .8.6 1.4 1.4 1.4h3.7c-.4 3.9-2.4 22.6-2.7 35.1v4.2zm65.3 11.9h-16.8c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h16.8v2.8h-62.2c0-.9-.1-1.9-.1-2.8h33.9c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-33.9c-.1-3.2-.1-6.3-.1-9h62.5v9zm-12.5 24.4h-6.3l.2-1.6h5.9l.2 1.6zm-5.8-4.5l1.6-12.3h2l1.6 12.3h-5.2zm-57-19.9h-62.4v-9h62.5c0 2.7 0 5.8-.1 9zm-62.4 1.4h62.4c0 .9-.1 1.8-.1 2.8H194v-2.8zm65.2 0h7.3c0 .9.1 1.8.1 2.8H259c.1-.9.1-1.8.1-2.8zm7.2-1.4h-7.2c.1-3.2.1-6.3.1-9h7c0 2.7 0 5.8.1 9zm-7.7-66.7v6.8h-9v-6.8h9zm-8.9 8.3h9v.7h-9v-.7zm0 2.1h9v2.3h-9v-2.3zm26-1.4h-9v-.7h9v.7zm-9 3.7v-2.3h9v2.3h-9zm9-5.9h-9v-6.8h9v6.8zm-119.3 91.1c-2.1-7.1-3-40.9-.9-53.6 2.2-13.5 11.9-28.6 17.8-35.6 5.6-6.5 13.5-15.7 15.7-18.3 11.4 6.4 28.7 9.6 51.8 9.6h6v14.1c0 .8.6 1.4 1.4 1.4h5.4c.3 3.1 2.4 22.4 2.7 35.1 0 1.2.1 2.6.1 4.2h-63.9c-.8 0-1.4.6-1.4 1.4v16.1c0 .8.6 1.4 1.4 1.4H256c-.8 11.8-2.8 24.7-8 33.3-2.6 4.4-4.9 8.5-6.9 12.2-.4.7-.1 1.6.6 1.9.2.1.4.2.6.2.5 0 1-.3 1.3-.8 1.9-3.7 4.2-7.7 6.8-12.1 5.4-9.1 7.6-22.5 8.4-34.7h7.8c.7 11.2 2.6 23.5 7.1 32.4.2.5.8.8 1.3.8.2 0 .4 0 .6-.2.7-.4 1-1.2.6-1.9-4.3-8.5-6.1-20.3-6.8-31.1H312l-2.4 18.6c-.1.4.1.8.3 1.1.3.3.7.5 1.1.5h9.6c.4 0 .8-.2 1.1-.5.3-.3.4-.7.3-1.1l-2.4-18.6H333c.8 0 1.4-.6 1.4-1.4v-16.1c0-.8-.6-1.4-1.4-1.4h-63.9c0-1.5 0-2.9.1-4.2.2-12.7 2.3-32 2.7-35.1h5.2c.8 0 1.4-.6 1.4-1.4v-14.1h6.2c23.1 0 40.4-3.2 51.8-9.6 2.3 2.6 10.1 11.8 15.7 18.3 5.9 6.9 15.6 22.1 17.8 35.6 2.2 13.4 2 43.2-1.1 53.1-1.2 3.9-1.4 8.7-1 13-1.7-2.8-2.9-4.4-3-4.6-.2-.3-.6-.5-.9-.6h-.5c-.2 0-.4.1-.5.2-.6.5-.8 1.4-.3 2 0 0 .2.3.5.8 1.4 2.1 5.6 8.4 8.9 16.7h-42.9v-43.8c0-.8-.6-1.4-1.4-1.4s-1.4.6-1.4 1.4v44.9c0 .1-.1.2-.1.3 0 .1 0 .2.1.3v9c-1.1 2-3.9 3.7-10.5 3.7h-7.5c-.4 0-.7.3-.7.7 0 .4.3.7.7.7h7.5c5 0 8.5-.9 10.5-2.8-.1 3.1-1.5 6.5-10.5 6.5H210.4c-9 0-10.5-3.4-10.5-6.5 2 1.9 5.5 2.8 10.5 2.8h67.4c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-67.4c-6.7 0-9.4-1.7-10.5-3.7v-54.5c0-.8-.6-1.4-1.4-1.4s-1.4.6-1.4 1.4v43.8h-43.6c4.2-10.2 9.4-17.4 9.5-17.5.5-.6.3-1.5-.3-2s-1.5-.3-2 .3c-.1.2-1.4 2-3.2 5 .1-4.9-.4-10.2-1.1-12.8zm221.4 60.2c-1.5 8.3-14.9 12-26.6 12H174.4c-11.8 0-25.1-3.8-26.6-12-1-5.7.6-19.3 4.6-30.2H197v9.8c0 6.4 4.5 9.7 13.4 9.7h105.4c8.9 0 13.4-3.3 13.4-9.7v-9.8h44c4 10.9 5.6 24.5 4.6 30.2z"></path><path d="M286.1 359.3c0 .4.3.7.7.7h14.7c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7h-14.7c-.3 0-.7.3-.7.7zm5.3-145.6c13.5-.5 24.7-2.3 33.5-5.3.4-.1.6-.5.4-.9-.1-.4-.5-.6-.9-.4-8.6 3-19.7 4.7-33 5.2-.4 0-.7.3-.7.7 0 .4.3.7.7.7zm-11.3.1c.4 0 .7-.3.7-.7 0-.4-.3-.7-.7-.7H242c-19.9 0-35.3-2.5-45.9-7.4-.4-.2-.8 0-.9.3-.2.4 0 .8.3.9 10.8 5 26.4 7.5 46.5 7.5h38.1zm-7.2 116.9c.4.1.9.1 1.4.1 1.7 0 3.4-.7 4.7-1.9 1.4-1.4 1.9-3.2 1.5-5-.2-.8-.9-1.2-1.7-1.1-.8.2-1.2.9-1.1 1.7.3 1.2-.4 2-.7 2.4-.9.9-2.2 1.3-3.4 1-.8-.2-1.5.3-1.7 1.1s.2 1.5 1 1.7z"></path><path d="M275.5 331.6c-.8 0-1.4.6-1.5 1.4 0 .8.6 1.4 1.4 1.5h.3c3.6 0 7-2.8 7.7-6.3.2-.8-.4-1.5-1.1-1.7-.8-.2-1.5.4-1.7 1.1-.4 2.3-2.8 4.2-5.1 4zm5.4 1.6c-.6.5-.6 1.4-.1 2 1.1 1.3 2.5 2.2 4.2 2.8.2.1.3.1.5.1.6 0 1.1-.3 1.3-.9.3-.7-.1-1.6-.8-1.8-1.2-.5-2.2-1.2-3-2.1-.6-.6-1.5-.6-2.1-.1zm-38.2 12.7c.5 0 .9 0 1.4-.1.8-.2 1.3-.9 1.1-1.7-.2-.8-.9-1.3-1.7-1.1-1.2.3-2.5-.1-3.4-1-.4-.4-1-1.2-.8-2.4.2-.8-.3-1.5-1.1-1.7-.8-.2-1.5.3-1.7 1.1-.4 1.8.1 3.7 1.5 5 1.2 1.2 2.9 1.9 4.7 1.9z"></path><path d="M241.2 349.6h.3c.8 0 1.4-.7 1.4-1.5s-.7-1.4-1.5-1.4c-2.3.1-4.6-1.7-5.1-4-.2-.8-.9-1.3-1.7-1.1-.8.2-1.3.9-1.1 1.7.7 3.5 4.1 6.3 7.7 6.3zm-9.7 3.6c.2 0 .3 0 .5-.1 1.6-.6 3-1.6 4.2-2.8.5-.6.5-1.5-.1-2s-1.5-.5-2 .1c-.8.9-1.8 1.6-3 2.1-.7.3-1.1 1.1-.8 1.8 0 .6.6.9 1.2.9z"></path></svg>
            </div>
        `:`
            <div class="cm_vehicle-categories_category-image-container cm_vehicle-categories_link">

               <img class="cm_vehicle-categories_category-image" src="${e}" />

            </div>
        
        `}function fetchSubCategoriesAndRender(){var e=window.location.href,e=new URL(e).pathname.split("?")[0].replace("/collections/","");console.log("categoryurl",e),fetch(customYmm.subCategoryAPI+"?category="+e).then(e=>e.json()).then(e=>{e.shift(),e.length&&(document.querySelector(customYmm.subCatContainerForCategoryPage).style.display="block");document.querySelector(".bd-title").innerText;document.querySelector(customYmm.subCatContainerForCategoryPage).innerHTML='<div class="categories-items-wrapper">'+e.map(e=>(console.log(e),"")).join("")+"</div>"})}function setDefaultCategory(){var e;customYmm.selectedCategory=!1,customYmm.isInCategoryPage&&("local"==customYmm.development?(categoryURL="/axles-and-gears/",customYmm.selectedCategory=categoryURL):(e=window.location.href,e=new URL(e).pathname,customYmm.selectedCategory=e.split("?")[0].split("/").reverse()[0],console.log("selectedCategory",customYmm.selectedCategory),customYmm.selectedCategories.push(customYmm.selectedCategory)))}function createWrappersForHomePage(){var e=document.createElement("div");e.className="container";let t="";document.querySelector("#search_auto_data")&&(t=document.querySelector("#search_auto_data").getAttribute("data-site_width")),e.innerHTML=`
            <div class="${t} container--medium">
            <div class = "custom-ymm-wrapper-for-home-page ">

                <div class = "home-page-select-your-vehicle">

                    <h3> Select Your Vehicle </h3>

                </div>

                <div class = "custom-ymm-form-for-home-page ymm-form-search-page">

                </div>

            </div>
        </div>


        `;var r=document.querySelector(customYmm.homePageWrapper);r&&r.insertBefore(e,r.firstChild)}function saveOrGoForHomePage(e){pushToGarage(e),window.location.href=customYmm.siteURL+"/search/"}const decideWhatHappensAfterFormChangeInHomePage=async e=>{var[t,r,a,,,,]=returnSelections(e);(t&&r&&a?(removeHighlighted(e),saveOrGoForHomePage):(await fetchYmmOnlyDataAndRender(e),manageHighlighted))(e)};async function setupForHomePage(){createWrappersForHomePage(),setupYMMform("custom-ymm-form-for-home-page","custom-ymm-form-for-home-page",decideWhatHappensAfterFormChangeInHomePage,saveOrGoForHomePage);var e="custom-ymm-form-for-home-page",t=(hideSelectTag(e,"select-drive-type"),hideSelectTag(e,"select-fuel-type"),hideSelectTag(e,"select-num-doors"),customYmm.garage.filter(e=>e.selected));t.length&&(selectedVehicle=t[0],customYmm[e].selections.year=selectedVehicle.year,customYmm[e].selections.make=selectedVehicle.make,customYmm[e].selections.model=selectedVehicle.model,await fetchYmmOnlyDataAndRender(e),enableSelectTag(e,"btn-go"),enableSelectTag(e,"btn-clear")),hideSelectTag(e,"select-drive-type"),hideSelectTag(e,"select-fuel-type"),hideSelectTag(e,"select-num-doors")}function hideOrShowFormAfterLoadingDropdownValues(e,t){var[r,a,s,o,c,m]=returnSelections(t);e.drive_type_arr=e.drive_type_arr.filter(e=>""!==e),e.fuel_type_arr=e.fuel_type_arr.filter(e=>""!==e),e.num_doors_arr=e.num_doors_arr.filter(e=>""!==e),r&&a&&s&&(enableSelectTag(t,"btn-go"),enableSelectTag(t,"btn-clear")),(e.makes.length&&0==a||e.models.length&&0==s||e.drive_type_arr.length&&""==o||e.fuel_type_arr.length&&""==c||e.num_doors_arr.length&&""==m||0==a||0==r||0==s?displayYmmFormInSearchPage:hideYmmFormInSearchPage)()}function resetDropdownData(e){customYmm[""+e].makes=[],customYmm[""+e].models=[],customYmm[""+e].drive_type_arr=[],customYmm[""+e].fuel_type_arr=[],customYmm[""+e].num_doors_arr=[]}function returnSelections(e){return[customYmm[""+e].selections.year,customYmm[""+e].selections.make,customYmm[""+e].selections.model,customYmm[""+e].selections.drive_type,customYmm[""+e].selections.fuel_type,customYmm[""+e].selections.num_doors]}function returnDropdowns(e){return[customYmm[""+e].years,customYmm[""+e].makes,customYmm[""+e].models,customYmm[""+e].drive_type_arr,customYmm[""+e].fuel_type_arr,customYmm[""+e].num_doors_arr]}function addHighlighted(e,t){try{removeHighlighted(e),document.querySelector("#"+e).querySelector("."+t).classList.add("ymm-select-selected")}catch(e){console.log(e)}}function removeHighlighted(e){document.querySelector("#"+e).querySelector(".ymm-select-selected")&&document.querySelector("#"+e).querySelector(".ymm-select-selected").classList.remove("ymm-select-selected")}function manageHighlighted(e){var[t,r,a,s,o,,]=returnSelections(e);addHighlighted(e,"select-year"),t&&addHighlighted(e,"select-make"),enableSelectTag(e,"btn-clear"),r&&addHighlighted(e,"select-model"),a&&addHighlighted(e,"select-drive-type"),""!=s&&addHighlighted(e,"select-fuel-type"),""!=o&&addHighlighted(e,"select-num-doors")}function assignYmmFormChangeListeners(a,s,e,t){document.querySelector("#"+a).querySelectorAll(".ymm-select").forEach(r=>{r.addEventListener("change",e=>{var t=r.getAttribute("data-type");switch(enableSelectTag(a,"btn-clear"),t){case"select-year":customYmm[""+a].years.includes(parseInt(r.value))||(selectedYear=!1),customYmm[""+a].selections.year=r.value,customYmm[""+a].selections.make=!1,customYmm[""+a].selections.model=!1,customYmm[""+a].selections.drive_type="",customYmm[""+a].selections.fuel_type="",customYmm[""+a].selections.num_doors="",disableSelectTag(a,"select-make"),disableSelectTag(a,"select-model"),disableSelectTag(a,"btn-go");break;case"select-make":customYmm[""+a].selections.model=!1,customYmm[""+a].selections.make=r.value,customYmm[""+a].selections.drive_type="",customYmm[""+a].selections.fuel_type="",customYmm[""+a].selections.num_doors="",disableSelectTag(a,"select-model"),disableSelectTag(a,"btn-go");break;case"select-model":customYmm[""+a].selections.model=r.value,customYmm[""+a].selections.drive_type="",customYmm[""+a].selections.fuel_type="",customYmm[""+a].selections.num_doors="";break;case"select-drive-type":customYmm[""+a].selections.drive_type=r.value;break;case"select-fuel-type":customYmm[""+a].selections.fuel_type=r.value;break;case"select-num-doors":customYmm[""+a].selections.num_doors=r.value}disableSelectTag(a,"select-drive-type"),disableSelectTag(a,"select-fuel-type"),disableSelectTag(a,"select-num-doors"),s(a)})}),document.querySelector("#"+a).querySelector(".btn-clear").addEventListener("click",()=>{clearYmmForm(a,t)}),document.querySelector("#"+a).querySelector(".btn-go").addEventListener("click",()=>{e(a)})}function resetSelectTag(e,t){document.querySelector("#"+e).querySelector("."+t).selectedIndex=0}function clearYmmForm(e,t=!1){customYmm[""+e].selections.year=!1,customYmm[""+e].selections.make=!1,customYmm[""+e].selections.model=!1,customYmm[""+e].selections.drive_type="",customYmm[""+e].selections.num_doors="",customYmm[""+e].selections.fuel_type="",enableSelectTag(e,"select-year"),resetSelectTag(e,"select-year"),disableSelectTag(e,"select-make"),resetSelectTag(e,"select-make"),disableSelectTag(e,"select-model"),resetSelectTag(e,"select-model"),disableSelectTag(e,"select-drive-type"),resetSelectTag(e,"select-drive-type"),disableSelectTag(e,"select-num-doors"),resetSelectTag(e,"select-num-doors"),disableSelectTag(e,"select-fuel-type"),resetSelectTag(e,"select-fuel-type"),disableSelectTag(e,"btn-go"),disableSelectTag(e,"btn-clear"),manageHighlighted(e),customYmm.garage.forEach((e,t)=>{e.selected&&(customYmm.garage[t].selected=!1)}),setCookie("garage",JSON.stringify(customYmm.garage)),setupGarage(!1),(customYmm.isInSearchPage||customYmm.isInCategoryPage||customYmm.isInBrandPage)&&(setSelectedVehicleWithCategoryTitle(),clearContentsForCategoryPage(),displayYmmFormInSearchPage(),customYmm.searchQuery=""),t&&t(),displayBreadCrumb(),!1===customYmm.hideProductsUntilSelected&&fetchProductsAndRender()}function createYmmForm(e){return customYmm[""+e]={},customYmm[""+e].years=customYmm.years,customYmm[""+e].makes=[],customYmm[""+e].models=[],customYmm[""+e].drive_type_arr=[],customYmm[""+e].fuel_type_arr=[],customYmm[""+e].num_doors_arr=[],customYmm[""+e].selections={year:!1,make:!1,model:!1,drive_type:"",fuel_type:"",num_doors:""},`

            <div class="ymm-form-container" id= "${e}">
            
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
                    
                    ${"ymm-add-to-garage-form-modal"==e?'<div class="optional-field-label-wrapper">Optional Fields </div>':""}
                        
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
        `}function setupYMMform(e,t,r,a=!1,s=!1){var t=document.querySelector("."+t),o=document.createElement("div");t.appendChild(o),o.innerHTML=createYmmForm(e),assignYmmFormChangeListeners(e,r,a,s),document.querySelector("#"+e).querySelector(".select-year").innerHTML=createOptionTag("Year")+customYmm[""+e].years.map(e=>createOptionTag(e)).join("")}async function fetchYmmOnlyDataAndRender(e){try{var t=await(await fetch(`${customYmm.ymmOnlyApi}?category=${customYmm.selectedCategory}&drive_type=${customYmm[e].selections.drive_type}&fuel_type=${customYmm[e].selections.fuel_type}&num_doors=${customYmm[e].selections.num_doors}&year=${customYmm[e].selections.year}&make=${customYmm[e].selections.make}&model=`+customYmm[e].selections.model)).json();return displayMakesAndModels(t,e),t}catch(e){console.error(e)}}function disableSelectTag(e,t){document.querySelector("#"+e).querySelector("."+t).disabled=!0,resetSelectTag(e,t)}function enableSelectTag(e,t){document.querySelector("#"+e).querySelector("."+t).disabled=!1}function hideSelectTag(e,t){document.querySelector("#"+e).querySelector("."+t).closest(".ymm-form-select").style.display="none"}function displaySelectTag(e,t){document.querySelector("#"+e).querySelector("."+t).closest(".ymm-form-select").style.display="block"}function createOptionTag(e,t=!1){let r=!1;return`
            <option value = "${e}" ${(r=0!=t&&Object.values(customYmm[""+t].selections).includes(e)?!0:r)?"selected":""} >${e}</option>
        `}function isInVehiclePage(){return window.location.href.includes("/vehicles/")}function returnYMMvaluesFromVehiclePage(){return document.querySelector(".page-description").innerText.split(":")[1].trim().split("|").map(e=>e.trim())}function displayMakesAndModels(t,r){if(customYmm[""+r].makes=[...new Set(t.makes)].sort(),customYmm[""+r].models=[...new Set(t.models)].sort(),customYmm[""+r].drive_type_arr=[...new Set(t.drive_type_arr)].sort().filter(e=>null!=e&&0<e.trim().length),customYmm[""+r].fuel_type_arr=[...new Set(t.fuel_type_arr)].sort().filter(e=>null!=e&&0<e.trim().length),customYmm[""+r].num_doors_arr=[...new Set(t.num_doors_arr)].sort().filter(e=>null!=e&&0<e.trim().length),customYmm[""+r].selections.year)for(var e=customYmm[""+r].selections.year,a=document.querySelector(`#${r} .select-year`),s=0;s<a.options.length;s++)if((o=a.options[s]).value===e){o.selected=!0;break}if(0<customYmm[""+r].makes.length&&0!=customYmm[""+r].selections.year&&(customYmm[""+r].makes=[...new Set(t.makes)].sort(),enableSelectTag(r,"select-make"),document.querySelector("#"+r).querySelector(".select-make").innerHTML=createOptionTag("Make")+customYmm[""+r].makes.map(e=>createOptionTag(e,r)).join(""),isInVehiclePage())){t=returnYMMvaluesFromVehiclePage();let e=!1;if(e=t[0],(e=3==t.length?t[1]:e)&&0==customYmm[""+r].selections.make)for(var o,a=document.querySelector(`#${r} .select-make`),s=0;s<a.options.length;s++)if((o=a.options[s]).value===e){o.selected=!0;var c=new Event("change");a.dispatchEvent(c);break}}0<customYmm[""+r].models.length&&0!=customYmm[""+r].selections.make&&(enableSelectTag(r,"select-model"),document.querySelector("#"+r).querySelector(".select-model").innerHTML=createOptionTag("Model")+customYmm[""+r].models.map(e=>createOptionTag(e,r)).join("")),0!=customYmm[""+r].selections.model&&(0<customYmm[""+r].drive_type_arr.length?(displaySelectTag(r,"select-drive-type"),enableSelectTag(r,"select-drive-type"),document.querySelector("#"+r).querySelector(".select-drive-type").innerHTML=createOptionTag("Drive Type")+customYmm[""+r].drive_type_arr.map(e=>createOptionTag(e,r)).join("")):hideSelectTag(r,"select-drive-type"),0<customYmm[""+r].fuel_type_arr.length?(displaySelectTag(r,"select-fuel-type"),enableSelectTag(r,"select-fuel-type"),document.querySelector("#"+r).querySelector(".select-fuel-type").innerHTML=createOptionTag("Fuel Type")+customYmm[""+r].fuel_type_arr.map(e=>createOptionTag(e,r)).join("")):hideSelectTag(r,"select-fuel-type"),0<customYmm[""+r].num_doors_arr.length?(displaySelectTag(r,"select-num-doors"),enableSelectTag(r,"select-num-doors"),document.querySelector("#"+r).querySelector(".select-num-doors").innerHTML=createOptionTag("Num Doors")+customYmm[""+r].num_doors_arr.map(e=>createOptionTag(e,r)).join("")):hideSelectTag(r,"select-num-doors"))}function setCookie(e,t){e=e+"="+encodeURIComponent(t),t=new Date;t.setDate(t.getDate()+30),e=e+("; expires="+t.toUTCString())+"; path=/",document.cookie=e}function getCookie(e){for(const a of document.cookie.split(";")){var[t,r]=a.trim().split("=");if(t===e)return decodeURIComponent(r)}return null}function loadCssFile(){var e=document.createElement("link");e.rel="stylesheet",e.type="text/css",e.href=customYmm.linkToCssFile,document.head.appendChild(e)}function showLoadingOverlay(){var e=document.createElement("div");e.innerHTML=`
    <div class="loadingOverlay loadingOverlay2" style = "display:block;background-color: rgba(0, 0, 0, 0.03)">
        <div class = "loadingIcon loadingText">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
            </svg>
        </div>
    </div>
    `,document.body.appendChild(e.firstElementChild)}function hideLoadingOverlay(){var e=document.querySelector(".loadingOverlay2");e&&e.parentNode.removeChild(e)}function hideOverlay(){document.querySelector(".modal-wrapper").style.display="none",document.querySelector(".ymm-modal").style.display="none",document.body.classList.remove("my-grage-active"),document.querySelector("#cb-garage-btn")&&(document.querySelector("#cb-garage-btn").checked=!1)}function displayOverlay(){document.querySelector(".modal-wrapper").style.display="block",document.body.classList.add("my-grage-active"),document.querySelector(".ymm-modal").style.display="block"}function returnGarage(){return`
		<svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_119_373)">
            <path d="M31.453 20.875V0.535H0.547V20.875H1.5V1.338H30.5V20.875H31.457M32 21.41H29.949V1.873H2.051V21.41H0V0H32V21.41Z" fill="white"></path>
            <path d="M29.9488 5.88708H2.05176V6.42208H29.9488V5.88708Z" fill="white"></path>
            <path d="M29.9488 4.54907H2.05176V5.08407H29.9488V4.54907Z" fill="white"></path>
            <path d="M29.9488 3.21106H2.05176V3.74606H29.9488V3.21106Z" fill="white"></path>
            <path d="M29.9488 1.87305H2.05176V2.40805H29.9488V1.87305Z" fill="white"></path>
            <path d="M29.9488 7.22607H2.05176V7.76107H29.9488V7.22607Z" fill="white"></path>
            <path d="M29.9488 8.56409H2.05176V9.09909H29.9488V8.56409Z" fill="white"></path>
            <path d="M29.9488 9.9021H2.05176V10.4371H29.9488V9.9021Z" fill="white"></path>
            <path d="M29.9488 11.24H2.05176V11.775H29.9488V11.24Z" fill="white"></path>
            <path d="M29.9488 12.578H2.05176V13.113H29.9488V12.578Z" fill="white"></path>
            <path d="M29.9488 13.916H2.05176V14.451H29.9488V13.916Z" fill="white"></path>
            <path d="M29.9488 15.254H2.05176V15.789H29.9488V15.254Z" fill="white"></path>
            <path d="M29.9488 16.592H2close-icon.05176V17.127H29.9488V16.592Z" fill="white"></path>
            <path d="M8.75305 17.129V18.2C8.75675 18.4868 8.87396 18.7604 9.07901 18.961C9.28406 19.1616 9.56024 19.2727 9.84705 19.27H22.2911C22.578 19.2727 22.8544 19.1614 23.0595 18.9606C23.2645 18.7599 23.3816 18.486 23.3851 18.199V17.129H8.75305ZM8.20605 16.594H23.9321V18.2C23.9273 18.6305 23.7518 19.0416 23.4441 19.3427C23.1363 19.6439 22.7216 19.8105 22.2911 19.806H9.84705C9.41651 19.8105 9.00178 19.6439 8.69406 19.3427C8.38634 19.0416 8.2108 18.6305 8.20605 18.2V16.594Z" fill="white"></path>
            <path d="M10.3952 17.932C10.8486 17.932 11.2162 17.6325 11.2162 17.263C11.2162 16.8935 10.8486 16.594 10.3952 16.594C9.94179 16.594 9.57422 16.8935 9.57422 17.263C9.57422 17.6325 9.94179 17.932 10.3952 17.932Z" fill="white"></path>
            <path d="M21.7448 17.932C22.1983 17.932 22.5658 17.6325 22.5658 17.263C22.5658 16.8935 22.1983 16.594 21.7448 16.594C21.2914 16.594 20.9238 16.8935 20.9238 17.263C20.9238 17.6325 21.2914 17.932 21.7448 17.932Z" fill="white"></path>
            <path d="M10.394 19.538H12.582V20.317C12.582 20.6071 12.4668 20.8854 12.2616 21.0905C12.0565 21.2957 11.7782 21.411 11.488 21.411C11.1979 21.411 10.9196 21.2957 10.7145 21.0905C10.5093 20.8854 10.394 20.6071 10.394 20.317V19.538Z" fill="white"></path>
            <path d="M19.5562 19.538H21.7442V20.317C21.7442 20.6071 21.6289 20.8854 21.4237 21.0905C21.2186 21.2957 20.9403 21.411 20.6502 21.411C20.36 21.411 20.0817 21.2957 19.8766 21.0905C19.6714 20.8854 19.5562 20.6071 19.5562 20.317V19.538Z" fill="white"></path>
            </g>
            <defs>
            <clipPath id="clip0_119_373">
            <rect width="32" height="21.41" fill="white"></rect>
            </clipPath>
            </defs>
        </svg>
	`}function returnCloseIcon(){return`
            <svg xmlns="http://www.w3.org/2000/svg" class="icon-tabler icon-tabler-x" width="28" height="28" viewBox="0 0 24 24" stroke-width="1" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M18 6l-12 12"></path>
              <path d="M6 6l12 12"></path>
            </svg>    
        `}function returnCar(){return`
        <svg width="115" height="44" viewBox="0 0 115 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.12065 10.137C3.94927 10.3165 1.10699 11.0645 0 14.5949H0.0897561V27.9985C1.10699 31.4391 3.53041 33.2343 6.94114 33.9822C7.97723 34.2067 8.99339 34.5109 10.0069 34.8143C10.7493 35.0366 11.4904 35.2585 12.2367 35.4482C12.9249 35.5978 13.2839 35.9868 13.5532 36.6151C15.2585 40.5643 18.3402 42.8082 22.5886 43.1673C26.508 43.4964 29.7392 41.9107 32.0728 38.7094C32.5515 38.0512 33.0302 37.8417 33.8081 37.8417C50.2634 37.8717 66.6888 37.8717 83.1141 37.8417C83.922 37.8118 84.4306 38.0212 84.9392 38.7393C87.602 42.4791 92.1496 44.0349 96.5477 42.8082C100.736 41.6414 103.938 37.752 104.297 33.4437C104.745 27.9386 100.826 22.8226 95.5304 21.9549C89.786 20.9975 84.4306 24.5279 83.2039 30.1526C83.0037 31.0334 82.9643 31.9543 82.9242 32.8885V32.8886C82.9044 33.3507 82.8845 33.8161 82.8449 34.2814H33.9577C34.3167 31.0801 33.6885 28.2079 31.654 25.7247C29.6195 23.2713 26.9867 21.9549 23.7854 21.8053C21.3021 21.6856 19.0582 22.4037 17.0537 23.8697C14.3311 25.8743 12.9548 28.6567 12.6257 32.0076C11.8769 31.7951 11.1383 31.5894 10.4077 31.386L10.4075 31.3859C8.97809 30.9879 7.57908 30.5983 6.19317 30.1826C4.69724 29.7338 3.65008 28.6866 3.53041 27.1608C3.42684 25.8973 3.45233 24.6338 3.47783 23.3703C3.48916 22.8087 3.50049 22.2472 3.50049 21.6856C3.85228 21.6168 4.24709 21.6144 4.64092 21.6121C5.78782 21.6052 6.92652 21.5984 6.97106 19.9504C7.01573 18.1634 5.82639 18.1442 4.62311 18.1246C4.21466 18.118 3.80459 18.1114 3.44065 18.0356C3.44065 17.8051 3.43729 17.5746 3.43395 17.3452C3.42732 16.8898 3.42075 16.4388 3.44065 16.0011C3.50049 14.7744 4.03902 14.176 5.26569 13.9666C6.19973 13.7968 7.16055 13.6805 8.09748 13.5671L8.25756 13.5478C11.8777 13.1289 15.5278 12.6801 18.9385 11.244C19.2255 11.1223 19.52 10.9652 19.8148 10.8079C20.5342 10.4241 21.2551 10.0396 21.8706 10.1669C22.518 10.2964 23.0564 10.9551 23.5869 11.6042C23.7919 11.8549 23.9958 12.1043 24.2042 12.3211C25.8797 14.1162 27.8244 15.4925 30.2777 15.8814C31.6978 16.1056 33.1385 16.1224 34.5655 16.139H34.5655L34.5661 16.139C34.8526 16.1423 35.1386 16.1457 35.4237 16.1507C36.8299 16.1507 37.5779 15.5224 37.5779 14.4154C37.5779 13.3084 36.8299 12.6801 35.4237 12.6801H31.5941C31.7569 11.9428 31.9258 11.2239 32.092 10.5166L32.0924 10.5149L32.0925 10.5146C32.4455 9.01239 32.7862 7.5621 33.0302 6.098C33.2397 4.78157 33.868 4.27296 35.1545 4.03361C38.6133 3.39396 42.1096 3.46715 45.5989 3.5402C46.5162 3.5594 47.4331 3.5786 48.3486 3.58483C48.3956 3.58483 48.4425 3.6401 48.475 3.67835C48.4839 3.68885 48.4918 3.69806 48.4982 3.7045V12.6801H47.5109C47.0533 12.6801 46.5925 12.6768 46.1305 12.6735H46.1303H46.1302H46.1302H46.1301C45.2027 12.6668 44.2708 12.6601 43.3522 12.6801C42.1854 12.71 41.3776 13.458 41.4075 14.4154C41.4374 15.3429 42.1854 16.031 43.2924 16.1208C43.5505 16.1406 43.7955 16.1341 44.0448 16.1275C44.1711 16.1241 44.2985 16.1208 44.4293 16.1208C48.1368 16.1208 51.8477 16.1241 55.5608 16.1274H55.561H55.5612C62.9944 16.1341 70.4364 16.1407 77.8784 16.1208C83.6527 16.0908 89.3971 16.2105 95.1115 17.0782C99.5395 17.7364 103.938 18.6639 108.066 20.459C108.5 20.6417 108.899 20.8941 109.303 21.1497C109.429 21.229 109.554 21.3086 109.682 21.3865C109.209 21.5377 108.784 21.5814 108.377 21.6233C108.14 21.6477 107.909 21.6715 107.677 21.7156C106.391 21.9549 105.733 23.3312 106.54 24.2586C106.929 24.7074 107.707 24.9767 108.366 25.0665C109.096 25.1499 109.841 25.1315 110.6 25.1127C110.93 25.1046 111.262 25.0964 111.597 25.0964C111.597 25.7995 111.602 26.4876 111.607 27.1649V27.1652C111.619 28.8222 111.631 30.4149 111.567 32.0076C111.507 33.4437 110.968 33.9822 109.682 34.2515C108.425 34.5208 107.827 35.2986 108.066 36.3458C108.276 37.3032 109.233 37.8118 110.37 37.6323C113.063 37.1835 114.918 34.9995 114.978 32.0973C115.007 29.9133 115.007 27.7591 114.978 25.5751C114.918 21.8053 113.153 19.0827 109.772 17.4671C108.515 16.8687 107.169 16.3601 105.822 15.9412C98.7616 13.6973 91.4914 12.9793 84.1613 12.6203C83.5031 12.5904 82.8748 12.4108 82.3063 12.0518L82.3052 12.0511C78.1768 9.44843 74.0484 6.84573 69.92 4.1832C65.5519 1.37084 60.7649 0.0244997 55.5889 0.0244997C54.0721 0.0244997 52.5552 0.0164216 51.0383 0.00834359C47.4989 -0.0105052 43.9595 -0.029354 40.4202 0.0544184C38.1164 0.114256 35.8127 0.443361 33.5389 0.892142C29.9931 1.57931 26.826 3.3271 23.713 5.0451L23.7125 5.04536L23.7125 5.04538C23.4373 5.19728 23.1624 5.34894 22.8878 5.49962C17.9512 8.1923 12.7454 9.80792 7.12065 10.137ZM76.2927 12.2612C76.2628 12.4408 76.2628 12.4408 76.2029 12.6203H52.0286V3.55491C56.3369 3.34548 60.6751 3.28564 64.5346 5.32011C67.3256 6.76727 70.0023 8.41443 72.6831 10.0642L72.6833 10.0643L72.6836 10.0645L72.6837 10.0645C73.8823 10.8021 75.0818 11.5403 76.2927 12.2612ZM85.9564 32.4863C85.9564 28.4473 89.1278 25.216 93.1668 25.216C97.2657 25.1861 100.557 28.4772 100.497 32.5162C100.467 36.4954 97.1759 39.7565 93.1968 39.7565C89.1876 39.7565 85.9564 36.4954 85.9564 32.4863ZM15.9167 32.4265C15.9467 28.3874 19.2676 25.1562 23.3366 25.216C27.226 25.2759 30.4273 28.4772 30.4572 32.3965C30.5171 36.4356 27.2859 39.7266 23.2468 39.7565C19.2078 39.7864 15.8868 36.4356 15.9167 32.4265ZM27.4689 7.06593C28.0864 6.75533 28.7526 6.42023 29.4699 6.06808C29.0863 7.82172 28.7278 9.37461 28.3254 11.1174L28.2133 11.603L27.8083 11.1193L27.8065 11.1171C26.8991 10.0334 26.0938 9.07156 25.3112 8.13247C25.9525 7.8287 26.6699 7.46782 27.4689 7.06593ZM40.2706 30.6015H58.162H76.0533C77.9083 30.6015 78.8059 30.0031 78.7759 28.8362C78.746 27.6993 77.8784 27.1309 76.1132 27.1309H40.3304C39.9115 27.1309 39.4927 27.1608 39.1037 27.2206C38.2361 27.3702 37.6976 27.9686 37.6976 28.8362C37.6676 29.7637 38.266 30.3621 39.1636 30.5416C39.4515 30.6136 39.7587 30.6086 40.0542 30.6038C40.1272 30.6026 40.1995 30.6015 40.2706 30.6015ZM96.1288 33.2642C96.2485 33.713 96.1587 34.1618 95.8894 34.5507C95.7099 34.82 95.5304 35.0593 95.2611 35.1491C94.7226 35.3286 93.855 35.2987 93.4361 34.9696C92.4189 34.1917 91.5213 33.2044 90.6537 32.2171C90.0553 31.5589 90.0852 30.781 90.6836 30.0928C91.2221 29.4346 92.0598 29.1953 92.6881 29.7039C93.7003 30.5389 94.6054 31.5023 95.5121 32.4674L95.5123 32.4676C95.6776 32.6436 95.843 32.8196 96.0091 32.9949C96.0689 33.0847 96.0989 33.1445 96.1288 33.2642ZM21.0328 35.0893C21.4517 35.3585 21.9304 35.4782 22.4091 35.3585C22.5288 35.3286 22.6185 35.2987 22.6485 35.2389C22.8379 35.0544 23.0283 34.8707 23.2186 34.687C24.1702 33.7687 25.1217 32.8503 25.9694 31.8281C26.4781 31.2297 26.1489 30.4519 25.5506 29.9432C24.9223 29.4047 24.1444 29.315 23.5161 29.8535C22.4689 30.751 21.4517 31.7084 20.614 32.7855C20.3148 33.1745 20.2849 34.0122 20.4943 34.5208C20.5841 34.7602 20.7935 34.9397 21.0328 35.0893Z" fill="black"/>
        </svg>
    `}function returnTruck(){return`
        <svg width="50" height="25" viewBox="0 0 50 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M49.987 19.1756C49.5566 20.3131 48.735 20.786 47.4961 20.7221C46.7977 20.6906 46.0943 20.6979 45.3921 20.7051H45.3921C44.9535 20.7097 44.5155 20.7142 44.0793 20.7093C43.7663 20.7093 43.5968 20.786 43.4403 21.0671C42.3187 23.0481 40.5712 24.1089 38.276 24.0961C35.9807 24.0833 34.2462 23.0225 33.1247 21.0416C32.9682 20.7732 32.8117 20.7093 32.5248 20.7093C30.4904 20.7221 28.4559 20.7221 26.4215 20.7093C25.9259 20.7093 25.6129 20.4281 25.5999 20.0191C25.5869 19.5974 25.9129 19.2907 26.4215 19.2779H26.7606H31.9379H32.4726V17.527H16.0668V19.2779H16.5623H22.7569C23.2003 19.2779 23.5263 19.4057 23.6307 19.8658C23.735 20.3642 23.3959 20.7093 22.796 20.7093C22.2414 20.7093 21.6876 20.7101 21.1342 20.7109C19.4755 20.7133 17.8204 20.7157 16.1581 20.6965C15.7538 20.6965 15.5451 20.8115 15.3365 21.1694C14.2149 23.0864 12.4935 24.0961 10.2634 24.1089C8.0073 24.1089 6.27282 23.0864 5.15128 21.1566C4.94262 20.7987 4.73396 20.7093 4.35576 20.7221C3.54721 20.7476 2.72561 20.7348 1.91706 20.7221C0.795514 20.6965 0 19.9169 0 18.8306V9.46255C0 8.33788 0.821596 7.53271 1.95618 7.51993C4.14701 7.51141 6.33784 7.51425 8.52868 7.51709H8.52895C9.62441 7.51851 10.7199 7.51993 11.8153 7.51993C12.3892 7.51993 12.7021 7.78832 12.7021 8.24841C12.7021 8.70851 12.3892 8.95133 11.8023 8.96411H5.99896H5.39906C5.39906 9.0699 5.39751 9.17113 5.39601 9.26885C5.39317 9.45446 5.39052 9.62739 5.39906 9.79484C5.51643 11.6097 4.95566 12.4659 2.80386 12.3254C2.51743 12.3083 2.22521 12.314 1.93107 12.3196H1.93105C1.78326 12.3225 1.63498 12.3254 1.4867 12.3254C1.48299 12.3726 1.47928 12.4147 1.47587 12.4534C1.46729 12.5507 1.46062 12.6265 1.46062 12.7088V16.0572C1.74274 16.0572 2.02238 16.058 2.30017 16.0588H2.30054H2.30073C3.12708 16.0612 3.93704 16.0636 4.747 16.0444C4.85133 16.0444 4.9687 15.8911 5.03391 15.7761C6.16849 13.7951 7.88993 12.7088 10.2243 12.696C12.5848 12.696 14.3062 13.7951 15.4408 15.8016C15.506 15.9166 15.6755 16.0444 15.7929 16.0444C18.8054 16.0572 21.8049 16.0572 24.8566 16.0572V8.97689H24.3349H15.8451H15.4017C14.9583 8.95133 14.6453 8.6446 14.6453 8.26119C14.6453 7.87778 14.9713 7.55827 15.4147 7.54549C15.7625 7.53697 16.1102 7.53981 16.458 7.54265H16.458C16.6319 7.54407 16.8058 7.54549 16.9797 7.54549H21.9614L21.966 7.47791C21.9774 7.31414 21.9875 7.16782 21.9875 7.02149V2.19051C21.9875 0.938032 22.6395 0.286232 23.9045 0.299013C24.3512 0.302208 24.7979 0.303006 25.2445 0.303805C26.5845 0.306201 27.9245 0.308598 29.2645 0.375695C30.7773 0.452377 32.0162 1.18086 33.0073 2.30553C33.7637 3.16182 34.494 4.04366 35.1982 4.93829C35.4721 5.29614 35.772 5.44951 36.2285 5.41117C36.5356 5.38381 36.8493 5.38899 37.165 5.3942C37.2917 5.39629 37.4187 5.39839 37.5456 5.39839C38.9932 5.39839 39.6974 6.08853 39.7366 7.49437C39.7366 7.53628 39.7422 7.57819 39.7497 7.63452V7.63455C39.7537 7.6641 39.7582 7.69762 39.7627 7.7372C40.2712 7.78831 40.7765 7.83623 41.2818 7.88415L41.282 7.88417L41.2822 7.88419C41.7874 7.93211 42.2927 7.98003 42.8013 8.03115C43.168 8.06631 43.5348 8.09669 43.9011 8.12704L43.9012 8.12705C44.7334 8.19599 45.5636 8.26477 46.3876 8.389C48.2394 8.68294 49.3871 9.79484 49.8957 11.5585C49.9218 11.6352 49.9609 11.6991 50 11.763C49.987 14.2041 49.987 16.6835 49.987 19.1756ZM33.7637 8.98967H26.4085V16.0189L26.4768 16.0237C26.6308 16.0347 26.7674 16.0444 26.904 16.0444C27.3666 16.0444 27.8291 16.0436 28.2919 16.0429H28.2925C29.6822 16.0405 31.0737 16.0381 32.4726 16.0572C32.8247 16.0572 33.0073 15.9422 33.1768 15.6483C34.2723 13.7823 35.9285 12.7471 38.1325 12.696C40.3886 12.6449 42.097 13.629 43.2968 15.4693C43.7141 16.1211 43.7402 16.1467 44.5618 15.9805C44.5618 15.7475 44.5604 15.513 44.559 15.2776L44.5589 15.2767C44.556 14.8024 44.5531 14.3243 44.5618 13.8462C44.5879 12.6832 45.2921 12.0186 46.4658 12.0186H48.3959C48.3046 10.9451 47.3526 9.93542 46.2311 9.80762C44.4545 9.60467 42.6687 9.44635 40.8814 9.28791L40.8813 9.2879L40.8804 9.28782C40.5296 9.25672 40.1787 9.22561 39.8279 9.19416C39.7105 9.18138 39.541 9.30918 39.4757 9.41143C39.0584 10.0632 38.4455 10.3572 37.6761 10.37C37.506 10.37 37.3375 10.3671 37.1694 10.3643C36.8347 10.3586 36.5019 10.3529 36.1633 10.37C35.0417 10.4339 34.1549 10.076 33.7637 8.98967ZM34.1028 5.87126C34.0093 5.75751 33.9141 5.64075 33.8171 5.5219C33.4674 5.09323 33.0953 4.6373 32.7074 4.19703C32.6134 4.09005 32.52 3.98163 32.4263 3.87288L32.426 3.87255C32.0384 3.42274 31.6461 2.96744 31.1946 2.5867C30.072 1.65971 28.7588 1.69081 27.4334 1.7222C27.0959 1.73019 26.7576 1.7382 26.4215 1.73042V7.46881H33.5811C33.6451 7.27101 33.7091 7.07866 33.7738 6.88423L33.7741 6.88325L33.7742 6.88316C33.8808 6.56286 33.9892 6.23683 34.1028 5.87126ZM33.9332 18.396C33.9463 20.7732 35.8894 22.6519 38.3151 22.6391C40.7016 22.6263 42.6578 20.7093 42.6578 18.3833C42.6578 16.0189 40.6625 14.0763 38.2368 14.1018C35.8503 14.1146 33.9202 16.0572 33.9332 18.396ZM10.1982 22.6391C12.6239 22.6647 14.5801 20.786 14.6062 18.4088C14.6322 16.0828 12.6761 14.1274 10.3156 14.1018C7.88993 14.0763 5.88159 16.0061 5.88159 18.3705C5.8555 20.6965 7.81169 22.6263 10.1982 22.6391ZM48.5133 17.527H44.1184V19.2779H47.9265C48.2916 19.2779 48.5003 19.0606 48.5133 18.7155C48.5219 18.4542 48.5192 18.204 48.5163 17.943V17.9429C48.5148 17.8081 48.5133 17.6705 48.5133 17.527ZM24.8696 7.49437V1.73042C24.7633 1.73042 24.6599 1.73337 24.5586 1.73626C24.3617 1.74188 24.1722 1.74729 23.9828 1.73042C23.6046 1.69207 23.4742 1.83266 23.4872 2.21607C23.5068 3.43339 23.5043 4.6507 23.5019 5.86802L23.5019 5.87086C23.5011 6.27571 23.5003 6.68055 23.5003 7.0854C23.5003 7.17404 23.5106 7.2576 23.5216 7.34569C23.528 7.39731 23.5346 7.45048 23.5394 7.50715C23.9958 7.49437 24.4131 7.49437 24.8696 7.49437ZM37.0611 8.90152C37.6894 8.9052 37.991 8.90697 38.1348 8.75725C38.2675 8.6191 38.266 8.352 38.2632 7.83845C38.2624 7.70658 38.2616 7.55847 38.2629 7.39213V7.341C38.2499 6.99593 38.0934 6.81701 37.7282 6.81701C37.0631 6.82979 36.398 6.82979 35.7329 6.81701C35.3547 6.81701 35.1982 6.98315 35.1852 7.32822V8.32509C35.1852 8.69573 35.3547 8.88743 35.746 8.88743C36.072 8.90021 36.3849 8.90021 36.7109 8.90021H36.711C36.8377 8.90021 36.9542 8.90089 37.0611 8.90152ZM46.0616 16.0061H48.4872V13.4372C48.2845 13.4372 48.0839 13.4351 47.8848 13.433H47.8848C47.3925 13.4278 46.9096 13.4227 46.4267 13.45C46.2963 13.4628 46.0746 13.6929 46.0746 13.8207C46.0551 14.3556 46.0575 14.8906 46.0599 15.4415V15.4417C46.0607 15.6278 46.0616 15.8157 46.0616 16.0061ZM1.46062 17.5142V18.7667C1.46062 19.0606 1.61711 19.2651 1.9301 19.2651C2.47824 19.2736 3.03219 19.2708 3.5842 19.2679H3.58441H3.58475C3.85994 19.2665 4.13466 19.2651 4.40793 19.2651V17.5142H1.46062ZM2.01706 10.8572H2.01731C2.5592 10.8596 3.08293 10.8619 3.59937 10.8428C3.7037 10.8428 3.89932 10.6767 3.89932 10.5872C3.91883 10.1858 3.91645 9.78438 3.91401 9.37227C3.91319 9.23331 3.91236 9.09314 3.91236 8.95133C3.68127 8.95133 3.45774 8.94985 3.23921 8.9484C2.81647 8.94559 2.41241 8.94291 2.00835 8.95133C1.66928 8.96411 1.47366 9.14304 1.47366 9.50089C1.46062 9.92264 1.46062 10.3572 1.46062 10.8556C1.64845 10.8556 1.8338 10.8564 2.01706 10.8572ZM38.2627 21.3868C36.5543 21.3741 35.2111 20.0449 35.2241 18.3707C35.2372 16.7092 36.6065 15.3545 38.2888 15.3673C39.9842 15.3673 41.4056 16.7731 41.3796 18.4218C41.3404 20.0832 39.9581 21.3996 38.2627 21.3868ZM39.8668 18.3707C39.8668 17.5144 39.1756 16.8242 38.3018 16.8115C37.415 16.7987 36.6978 17.5016 36.6978 18.3834C36.6978 19.2525 37.4281 19.9554 38.3149 19.9427C39.1756 19.9299 39.8668 19.227 39.8668 18.3707ZM7.14693 18.3697C7.13389 20.0439 8.54234 21.3986 10.2638 21.3859C11.9722 21.3731 13.3285 20.0311 13.3024 18.3569C13.2893 16.6955 11.907 15.3535 10.2247 15.3535C8.55539 15.3535 7.15998 16.7338 7.14693 18.3697ZM10.2638 16.8233C11.1375 16.836 11.8287 17.5262 11.8287 18.3825C11.8287 19.2515 11.1115 19.9545 10.2247 19.9545C9.3509 19.9417 8.65971 19.2515 8.65971 18.3952C8.65971 17.5006 9.37698 16.8105 10.2638 16.8233Z" fill="black"/>
        </svg>
    `}function returnJeep(){return`
        <svg width="47" height="29" viewBox="0 0 47 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.50607 19.3189H0.973464C0.395376 19.3055 0.0996094 19.0231 0.0996094 18.4585V7.2866C0.0996094 6.74885 0.40882 6.45308 0.946576 6.45308C1.27356 6.44424 1.60054 6.44703 1.94661 6.44997C2.12701 6.4515 2.31259 6.45308 2.50607 6.45308C2.50607 6.34794 2.50918 6.24591 2.51223 6.14592C2.51814 5.95187 2.52382 5.76555 2.50607 5.57923C2.34474 4.35583 3.6488 3.19965 4.84531 3.22654C5.71518 3.24448 6.59104 3.23848 7.46489 3.23251H7.46492H7.46495H7.46498C7.90113 3.22952 8.33678 3.22654 8.77094 3.22654C8.78756 3.22654 8.80931 3.22141 8.83937 3.21431C8.85795 3.20992 8.8797 3.20479 8.90538 3.19965V1.61327H7.42655C6.87535 1.59983 6.53925 1.29062 6.5258 0.806635C6.5258 0.322654 6.84846 0 7.4131 0H27.3908C27.942 0 28.2781 0.322654 28.2646 0.820079C28.2512 1.29062 27.9285 1.59983 27.4042 1.59983C27.0755 1.60871 26.7467 1.60585 26.4063 1.60289C26.2317 1.60137 26.0539 1.59983 25.8716 1.59983V3.2131C26.2573 3.2131 26.6408 3.21531 27.0227 3.21751C27.972 3.22299 28.9115 3.22841 29.851 3.19965C31.1685 3.15932 32.0155 3.68363 32.5263 4.94736C33.2003 6.62094 33.9305 8.26637 34.6622 9.91501L34.6636 9.91828L34.6657 9.92309C34.8086 10.2451 34.9516 10.5671 35.0941 10.8896C35.1352 10.9799 35.1963 11.0601 35.259 11.1426C35.2991 11.1952 35.3398 11.2487 35.3765 11.3063C35.3903 11.2994 35.4033 11.2924 35.4159 11.2857C35.452 11.2665 35.4845 11.2491 35.5243 11.2391C35.5243 9.58552 35.5243 7.91847 35.5109 6.26487C35.5109 6.14387 35.363 5.98254 35.242 5.90188C34.9664 5.70694 34.6875 5.52209 34.4085 5.33723C34.1295 5.15238 33.8506 4.96753 33.575 4.77259C33.091 4.43649 32.9566 3.99284 33.2389 3.57608C33.5078 3.15932 33.9783 3.10555 34.4757 3.4282C34.8387 3.66346 35.2017 3.90544 35.5646 4.14742L35.5647 4.14745C35.9277 4.38944 36.2906 4.63143 36.6536 4.8667C36.9897 5.09525 37.1376 5.37757 37.1376 5.79433C37.1286 6.87881 37.1316 7.96328 37.1346 9.04776L37.1346 9.0519C37.1361 9.59276 37.1376 10.1336 37.1376 10.6745V11.2794H37.7157H44.3032C45.782 11.2794 46.7903 12.3012 46.7903 13.78V20.8784C46.7903 22.3169 45.7552 23.3521 44.3167 23.3521H41.1708C41.0901 25.2073 40.3776 26.7131 38.9256 27.8424C37.7695 28.7297 36.452 29.1061 35.0135 28.9716C32.3247 28.7297 29.972 26.5786 29.8644 23.3924H17.8321C17.738 25.2342 17.0255 26.7668 15.5198 27.8961C14.4039 28.7297 13.1268 29.0792 11.742 28.9851C9.63135 28.8507 6.75435 27.2508 6.49892 23.3521H3.54125C2.77495 23.3521 2.50607 23.0967 2.50607 22.3438V19.3189ZM4.13279 21.0935C4.14623 21.0935 4.15967 21.0969 4.17312 21.1002L4.17314 21.1002C4.18658 21.1036 4.20001 21.107 4.21345 21.107L4.21356 21.1067C4.54962 20.4346 4.88568 19.7625 5.23519 19.0904C5.70572 18.1762 6.47203 17.7191 7.50721 17.7191H16.5146C17.6708 17.7191 18.4506 18.2568 18.9077 19.292C19.2169 19.9911 19.5261 20.7036 19.8084 21.4162C19.9025 21.6447 20.0101 21.7523 20.2789 21.7523C21.4015 21.7455 22.5241 21.7455 23.6483 21.7455C24.7726 21.7455 25.8985 21.7455 27.0278 21.7388C27.1891 21.7388 27.4311 21.5909 27.5118 21.4431C27.9151 20.6902 28.2915 19.9239 28.6679 19.1576C29.1519 18.1896 29.9182 17.7191 31.0072 17.7325C33.9917 17.746 36.9763 17.746 39.9608 17.7325C41.117 17.7325 41.9102 18.2568 42.3673 19.292C42.4372 19.4562 42.5064 19.6203 42.5756 19.7843L42.5757 19.7845C42.8124 20.3457 43.0483 20.9051 43.3084 21.4565C43.3756 21.5909 43.5772 21.7119 43.7386 21.7523C43.9402 21.806 44.1688 21.7792 44.3839 21.7523C44.841 21.6985 45.1502 21.4431 45.1636 20.986C45.1837 20.1915 45.1813 19.3894 45.1788 18.5687V18.5686V18.5686V18.5686V18.5675V18.5665V18.5654C45.1779 18.29 45.1771 18.0125 45.1771 17.7325H42.1791C41.5203 17.7325 41.3321 17.5981 41.117 16.9662C41.0099 16.6449 40.8995 16.3203 40.789 15.9956L40.7884 15.9937L40.7877 15.9918C40.6768 15.6657 40.5658 15.3396 40.4583 15.0169C40.1759 14.143 40.4851 13.7128 41.4262 13.7128H45.1367C45.0157 13.0944 44.7872 12.9062 44.1553 12.9062H37.4603C37.3813 12.9062 37.2951 12.9206 37.2177 12.9337C37.1896 12.9384 37.1626 12.9429 37.1376 12.9465V13.7128C37.2288 13.7128 37.3184 13.7113 37.4065 13.7097H37.4065C37.5782 13.7068 37.744 13.7039 37.9039 13.7128C38.4148 13.7397 38.7374 14.0623 38.724 14.5329C38.7105 14.9765 38.4013 15.2992 37.9174 15.3126C37.4199 15.3261 36.9091 15.3261 36.4116 15.3126C35.8067 15.2992 35.5243 15.0169 35.5243 14.4119V12.9196C35.4984 12.9172 35.4741 12.9149 35.4513 12.9127L35.4508 12.9126L35.4507 12.9126C35.344 12.9022 35.2704 12.8951 35.2151 12.9062C34.4219 13.0406 34.0455 12.6507 33.7497 11.9516C33.3061 10.8829 32.8456 9.82415 32.3852 8.76544L32.3851 8.76515C31.9246 7.70654 31.4642 6.64792 31.0206 5.57923C30.7921 5.04147 30.4963 4.83981 29.9317 4.83981C27.4043 4.85325 24.8635 4.85325 22.3361 4.85325H22.3359H21.8384V5.48512V14.99C21.8384 15.9042 21.6233 16.1193 20.7226 16.1193H4.72432H4.14623C4.13279 17.8132 4.13279 19.4534 4.13279 21.0935ZM20.1983 4.8667C20.173 4.86248 20.1503 4.85826 20.1298 4.85446C20.0852 4.84614 20.0512 4.83981 20.0235 4.83981H4.97975C4.37478 4.83981 4.11934 5.12213 4.11934 5.754V14.0086V14.4791H20.2117C20.1983 11.2665 20.1983 8.0807 20.1983 4.86807V4.8667ZM12.1588 19.3189C9.954 19.3324 8.12563 21.1742 8.13907 23.3655C8.15252 25.5434 9.98089 27.3718 12.1454 27.3718C14.3636 27.3718 16.2054 25.5166 16.192 23.2983C16.1651 21.1204 14.3233 19.3055 12.1588 19.3189ZM31.4912 23.3386C31.4777 25.5166 33.2926 27.3584 35.4706 27.3718C37.6888 27.3987 39.5441 25.5569 39.5441 23.3252C39.5441 21.1607 37.7157 19.3324 35.5378 19.3189C33.3464 19.3055 31.5046 21.1338 31.4912 23.3386ZM24.218 1.64016H10.5859V3.19965H24.218V1.64016ZM1.72632 8.06635V17.6922H2.47918V8.06635H1.72632ZM5.71917 21.7119C6.21684 21.754 6.45503 21.7741 6.61858 21.6732C6.76871 21.5806 6.85593 21.386 7.02323 21.0128C7.06356 20.9187 7.10389 20.8246 7.15767 20.744C7.36282 20.4407 7.56798 20.1315 7.77706 19.8164C7.88311 19.6566 7.99016 19.4952 8.09874 19.3324C7.99643 19.335 7.89309 19.3309 7.79073 19.327C7.36852 19.3105 6.96289 19.2947 6.71402 19.7491C6.52284 20.1009 6.34472 20.4613 6.15985 20.8354C6.01971 21.119 5.87569 21.4105 5.71917 21.7119ZM42.1925 15.3261C42.2664 15.4323 42.3324 15.5528 42.3942 15.6658C42.5124 15.8817 42.6155 16.0701 42.7303 16.0789C43.3064 16.1365 43.8826 16.1256 44.4588 16.1146C44.6893 16.1102 44.9197 16.1058 45.1502 16.1058V15.3261H42.1925ZM31.4508 19.171C31.3024 19.2321 31.147 19.2791 30.9973 19.3243C30.6859 19.4182 30.3996 19.5047 30.2543 19.6953C29.948 20.1165 29.7167 20.6057 29.4876 21.0904L29.4876 21.0904C29.3949 21.2865 29.3025 21.4818 29.2057 21.6716L29.2864 21.8329C29.376 21.8044 29.478 21.7833 29.5804 21.7621C29.8158 21.7134 30.0531 21.6642 30.1468 21.5237C30.486 21.0197 30.7624 20.4876 31.0716 19.8924L31.0717 19.8923L31.0717 19.8923C31.1913 19.662 31.3158 19.4223 31.4508 19.171ZM41.4934 21.3924L41.4901 21.3842L41.4878 21.3787C41.301 20.9263 41.1127 20.4699 40.9154 20.0314C40.633 19.3727 40.3104 19.2248 39.6651 19.3861C39.773 19.5701 39.8869 19.7516 40.0011 19.9336L40.0012 19.9337L40.0012 19.9338L40.0013 19.9339C40.271 20.3637 40.5423 20.7961 40.7406 21.2683C40.9288 21.7119 41.1439 21.8329 41.6144 21.685C41.5741 21.5878 41.5338 21.4902 41.4934 21.3924ZM17.8216 20.9005L17.8213 20.8998C17.6925 20.5986 17.5654 20.3016 17.4423 20.0046C17.1734 19.3861 16.9448 19.2651 16.313 19.3458C16.3938 19.4844 16.4765 19.6236 16.5598 19.7637L16.5601 19.7642C16.8643 20.2763 17.1755 20.8002 17.4288 21.3489C17.5901 21.7119 17.7515 21.806 18.1548 21.685C18.0434 21.4189 17.932 21.1586 17.8219 20.9012L17.8216 20.9005ZM27.4445 12.0726H24.4331C23.7206 12.0726 23.4517 11.8038 23.4517 11.1181V7.39416C23.4517 6.72196 23.7206 6.43964 24.3928 6.43964H28.9637C29.4342 6.43964 29.7166 6.62785 29.8913 7.05806C30.14 7.69649 30.3954 8.33157 30.6507 8.96665L30.6509 8.96709L30.6511 8.96754C30.9065 9.60262 31.1618 10.2377 31.4105 10.8761C31.6794 11.5752 31.3298 12.0726 30.577 12.0726H27.4445ZM25.0784 8.05291V10.4594H29.4746C29.3974 10.268 29.3218 10.0792 29.2471 9.89246L29.2469 9.89182C29.0225 9.33094 28.8057 8.78897 28.5738 8.25457C28.5335 8.16046 28.3453 8.06635 28.2377 8.06635C27.4638 8.04625 26.6898 8.04869 25.8934 8.0512L25.893 8.05121C25.6243 8.05205 25.3531 8.05291 25.0784 8.05291ZM17.5901 6.43964H12.1991C10.3708 6.43964 8.54239 6.43964 6.72746 6.42619C5.98805 6.42619 5.73261 6.69507 5.73261 7.43449V11.9113C5.73261 12.5835 6.01493 12.8658 6.67369 12.8658H17.6439C18.343 12.8658 18.6119 12.5835 18.6119 11.8844V7.46138C18.6119 6.69507 18.3565 6.43964 17.5901 6.43964ZM16.9583 8.06635V11.2526H7.35933V8.06635H16.9583ZM12.1319 26.0812C10.5993 26.0678 9.41624 24.8578 9.42969 23.3118C9.44313 21.806 10.6531 20.623 12.1588 20.623C13.6914 20.623 14.8879 21.8329 14.8879 23.3655C14.8879 24.8981 13.678 26.0812 12.1319 26.0812ZM11.0564 23.3521C11.0564 23.9705 11.5673 24.4679 12.1722 24.4545C12.7907 24.4545 13.2746 23.9436 13.2746 23.3386C13.2746 22.7202 12.7772 22.2362 12.1588 22.2362C11.5404 22.2362 11.043 22.7337 11.0564 23.3521ZM32.7952 23.3118C32.7818 24.8578 33.9648 26.0678 35.4974 26.0812C37.0435 26.0812 38.2534 24.8981 38.2534 23.3655C38.2534 21.8329 37.0569 20.623 35.5243 20.623C34.0052 20.623 32.8087 21.806 32.7952 23.3118ZM35.4974 24.4679C34.879 24.4545 34.395 23.9436 34.4085 23.3252C34.4219 22.7068 34.9194 22.2228 35.5512 22.2497C36.1696 22.2497 36.6536 22.7606 36.6402 23.379C36.6267 23.9974 36.1159 24.4814 35.4974 24.4679Z" fill="black"/>
        </svg>
    `}function returnGreyedOutStar(){return`
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.14371 0.56411C9.06183 0.395039 8.93398 0.252452 8.7748 0.152684C8.61563 0.0529151 8.43157 0 8.24371 0C8.05586 0 7.8718 0.0529151 7.71262 0.152684C7.55345 0.252452 7.4256 0.395039 7.34371 0.56411L5.33471 4.70211L0.852714 5.36111C0.669072 5.38846 0.496671 5.46639 0.354817 5.58618C0.212963 5.70597 0.107258 5.86288 0.0495424 6.03935C-0.00817295 6.21582 -0.0156195 6.40487 0.0280351 6.58533C0.0716897 6.76579 0.164723 6.93053 0.296714 7.06111L3.55271 10.2831L2.78371 14.8361C2.75202 15.0208 2.77285 15.2107 2.84383 15.3841C2.91481 15.5575 3.03308 15.7075 3.18517 15.8169C3.33726 15.9264 3.51705 15.9909 3.70403 16.0031C3.89101 16.0154 4.07766 15.9748 4.24271 15.8861L8.25171 13.7461L12.2607 15.8861C12.4258 15.9748 12.6124 16.0154 12.7994 16.0031C12.9864 15.9909 13.1662 15.9264 13.3183 15.8169C13.4703 15.7075 13.5886 15.5575 13.6596 15.3841C13.7306 15.2107 13.7514 15.0208 13.7197 14.8361L12.9477 10.2831L16.2037 7.06111C16.3357 6.93053 16.4287 6.76579 16.4724 6.58533C16.516 6.40487 16.5086 6.21582 16.4509 6.03935C16.3932 5.86288 16.2875 5.70597 16.1456 5.58618C16.0038 5.46639 15.8314 5.38846 15.6477 5.36111L11.1527 4.70211L9.14371 0.56411Z" fill="#C2C2C2"/>
        </svg>
    `}function returnColorfulStar(){return`
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.14371 0.56411C9.06183 0.395039 8.93398 0.252452 8.7748 0.152684C8.61563 0.0529151 8.43157 0 8.24371 0C8.05586 0 7.8718 0.0529151 7.71262 0.152684C7.55345 0.252452 7.4256 0.395039 7.34371 0.56411L5.33471 4.70211L0.852714 5.36111C0.669072 5.38846 0.496671 5.46639 0.354817 5.58618C0.212963 5.70597 0.107258 5.86288 0.0495424 6.03935C-0.00817295 6.21582 -0.0156195 6.40487 0.0280351 6.58533C0.0716897 6.76579 0.164723 6.93053 0.296714 7.06111L3.55271 10.2831L2.78371 14.8361C2.75202 15.0208 2.77285 15.2107 2.84383 15.3841C2.91481 15.5575 3.03308 15.7075 3.18517 15.8169C3.33726 15.9264 3.51705 15.9909 3.70403 16.0031C3.89101 16.0154 4.07766 15.9748 4.24271 15.8861L8.25171 13.7461L12.2607 15.8861C12.4258 15.9748 12.6124 16.0154 12.7994 16.0031C12.9864 15.9909 13.1662 15.9264 13.3183 15.8169C13.4703 15.7075 13.5886 15.5575 13.6596 15.3841C13.7306 15.2107 13.7514 15.0208 13.7197 14.8361L12.9477 10.2831L16.2037 7.06111C16.3357 6.93053 16.4287 6.76579 16.4724 6.58533C16.516 6.40487 16.5086 6.21582 16.4509 6.03935C16.3932 5.86288 16.2875 5.70597 16.1456 5.58618C16.0038 5.46639 15.8314 5.38846 15.6477 5.36111L11.1527 4.70211L9.14371 0.56411Z" fill="#FFC404"/>
        </svg>
    `}function returnArrowLeft(){return`
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="2.769" viewBox="0 0 18 2.769">
            <path id="minus-solid" d="M34,225.385a1.383,1.383,0,0,1-1.385,1.385H17.385a1.385,1.385,0,1,1,0-2.769H32.615A1.383,1.383,0,0,1,34,225.385Z" transform="translate(-16 -224)" fill="#050505"/>
        </svg>
    `}function returnArrowDown(){return`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
    `}function returnPreviousIcon(){return`
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.99979 14C7.26498 13.9999 7.51929 13.8945 7.70679 13.707C7.89426 13.5195 7.99957 13.2652 7.99957 13C7.99957 12.7348 7.89426 12.4805 7.70679 12.293L2.41179 7L7.70679 1.707C7.89426 1.51947 7.99957 1.26516 7.99957 0.999996C7.99957 0.734832 7.89426 0.480524 7.70679 0.292996C7.51926 0.105525 7.26495 0.000209808 6.99979 0.000209808C6.73462 0.000209808 6.48031 0.105525 6.29279 0.292996L0.292787 6.293C0.105316 6.48052 0 6.73483 0 7C0 7.26516 0.105316 7.51947 0.292787 7.707L6.29279 13.707C6.38539 13.8002 6.49557 13.874 6.61693 13.9243C6.73829 13.9746 6.86842 14.0004 6.99979 14Z" fill="white"/>
        </svg>
    `}function returnNextIcon(){return`
        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.999847 13.9998C0.734653 13.9997 0.48034 13.8943 0.292847 13.7068C0.105376 13.5193 6.10352e-05 13.265 6.10352e-05 12.9998C6.10352e-05 12.7346 0.105376 12.4803 0.292847 12.2928L5.58785 6.99979L0.292847 1.70679C0.105376 1.51926 6.10352e-05 1.26495 6.10352e-05 0.999786C6.10352e-05 0.734622 0.105376 0.480314 0.292847 0.292787C0.480375 0.105316 0.734683 0 0.999847 0C1.26501 0 1.51932 0.105316 1.70685 0.292787L7.70685 6.29279C7.89432 6.48031 7.99963 6.73462 7.99963 6.99979C7.99963 7.26495 7.89432 7.51926 7.70685 7.70679L1.70685 13.7068C1.61424 13.8 1.50407 13.8738 1.38271 13.9241C1.26135 13.9744 1.13122 14.0001 0.999847 13.9998Z" fill="white"/>
        </svg>
    `}function setupHeader(){setupGarage(),setupQuickSearch()}function handleSubmit(){var e=customYmm.searchQuery;customYmm.isInSearchPage?0<e.trim().length&&(customYmm.loadMore=!0,customYmm.currentPage=1,fetchProductsAndRender()):0<e.trim().length&&(window.location.href=customYmm.siteURL+"/search/?sq="+e)}function setupQuickSearch(){document.querySelector(customYmm.quickSearchWrapper)&&(document.querySelector(customYmm.quickSearchWrapper).innerHTML=`
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

        `,document.getElementById("ymm-search-query-form").addEventListener("submit",handleSubmit),document.getElementById("nav-quick-search").addEventListener("input",e=>{customYmm.searchQuery=e.target.value.trim()}))}function hideGarage(){document.querySelector("#garage-wrapper-wrapper").style.display="none"}function displayGarage(){document.querySelector("#garage-wrapper-wrapper").style.display="block"}function pushToGarage(e){var t=customYmm[""+e].selections.year,r=customYmm[""+e].selections.make,a=customYmm[""+e].selections.model,s=customYmm[""+e].selections.drive_type,o=customYmm[""+e].selections.fuel_type,c=customYmm[""+e].selections.num_doors;if(customYmm.garage.length){for(var m=0;m<customYmm.garage.length;m++)(vehicle=customYmm.garage[m]).selected&&(customYmm.garage[m].selected=!1);for(m=0;m<customYmm.garage.length;m++)if((vehicle=customYmm.garage[m]).selected&&(customYmm.garage[m].selected=!1),vehicle.year===t&&vehicle.make===r&&vehicle.model===a)return vehicle.drive_type=s,vehicle.fuel_type=o,vehicle.num_doors=c,vehicle.selected=!0,void setCookie("garage",JSON.stringify(customYmm.garage))}customYmm.garage.push({selected:!0,id:customYmm.garage.length?customYmm.garage[customYmm.garage.length-1].id+1:1,year:t,make:r,model:a,drive_type:s,fuel_type:o,num_doors:c}),setCookie("garage",JSON.stringify(customYmm.garage))}function decideWhereToGoWhenGarageItemClicked(r){var e,t="search-page-ymm-form-container";customYmm.garage.forEach((e,t)=>{e.selected&&(customYmm.garage[t].selected=!1)}),customYmm.garage.forEach((e,t)=>{e.id==r&&(customYmm.garage[t].selected=!0)}),setCookie("garage",JSON.stringify(customYmm.garage)),customYmm.isInSearchPage||customYmm.isInCategoryPage?(setupGarage(!1),e=customYmm.garage.filter(e=>e.id==r)[0],customYmm[t].selections.year=e.year,customYmm[t].selections.make=e.make,customYmm[t].selections.model=e.model,fetchProductsAndRender()):window.location.href=customYmm.siteURL+"/search/"}function fillGarageWithVehicles(){return 0<customYmm.garage.length?customYmm.garage.map(({selected:e=!1,id:t,year:r,make:a,model:s,drive_type:o,fuel_type:c,num_doors:m})=>`
                <div class  =  "each-vehicle-in-garage ${e?"selected-vehicle-in-garage":""} d-flex align-items-center ymm-justify-content-between ymm-mt-2 cursor-pointer  ">
                    
                    <div class = "each-vehicle-in-garage__name" data-ymm-id="${t}">
                        
                        <span class="selected-ymm-each selected-ymm-vq-each"> 
                            <span class="selected-ymm-ymm-each">
                                ${r} ${a} ${s} 
                            </span>
                            <span class="selected-vq-each">
                                ${o} ${c} ${m}
                            </span>
                        </span>
                        
                    </div>
                    
                    <div data-vehicle = "${t}" class = "remove-this-vehicle-from-garage ymm-icon-danger">
                        ${customYmm.svgCross}
                    </div>
                
                </div>
            `).join(" "):"The garage is empty."}function displayGarageWrapper(){document.querySelector("#wrapperToGarageWrapperWrapper").style.display="block",document.querySelector("#garage-wrapper-wrapper").style.display="block"}function hideGarageWrapper(){document.querySelector("#wrapperToGarageWrapperWrapper").style.display="none",document.querySelector("#garage-wrapper-wrapper").style.display="none",document.querySelector("#cb-garage-btn")&&(document.querySelector("#cb-garage-btn").checked=!1)}function setPositionForGarageWrapper(){var e=document.getElementById("garage-wrapper-wrapper"),t=document.getElementById("garage-btn").getBoundingClientRect(),r=t.left;let a,s;s=r<=300?(a=t.left+20,"auto"):300<=r?(a="auto",window.innerWidth-t.right):(a=t.left,"auto"),e.style.top=t.bottom+10+"px",e.style.left=a+"px",e.style.right=s+"px"}function constructGarageAndDisplayIt(){var e=`

            <div id = "garage-wrapper">

                <div class = "clear-garage d-flex align-items-center ymm-justify-content-between cursor-pointer">
                    <div><strong>Your Garage</strong></div>
                    <div class ="ymm-text-right">
                        <span class = "clear-garage-span" id="clear-garage-span">
                            Clear Garage
                        </span>
                    </div>
                </div>

                <hr>

                <div class = "garage-content">

                    ${fillGarageWithVehicles()}
                    
                </div>
                
                <hr>
                <div class = "add-vehicle-to-garage-button-wrapper ymm-text-center">
                    <button class = "button button-primary" id = "add-vehicle-to-garage-button">
                        Add Vehicle
                    </button>
                </div>

            </div>
        `,t=document.querySelector("#garage-wrapper-wrapper");t||((t=document.createElement("div")).id="garage-wrapper-wrapper",t.className="garage-wrapper-wrapper",document.querySelector("#newly-added-garage-btn").appendChild(t),(t=document.createElement("div")).className="modal-wrapper",t.id="wrapperToGarageWrapperWrapper",t.style.backgroundColor="rgba(255, 255, 255, 0)",t.addEventListener("click",()=>{hideGarageWrapper()}),document.body.appendChild(t)),document.querySelector("#garage-wrapper-wrapper").innerHTML=e,Array.from(document.querySelector("#garage-wrapper").querySelectorAll(".remove-this-vehicle-from-garage")).forEach(t=>{t.addEventListener("click",e=>{customYmm.garage=customYmm.garage.filter(e=>e.id!=t.getAttribute("data-vehicle")),setupGarage(displayGarageFlag=!0),setCookie("garage",JSON.stringify(customYmm.garage))})}),document.querySelector("#add-vehicle-to-garage-button").addEventListener("click",e=>{displayOverlay(),hideGarageWrapper()}),document.querySelector("#clear-garage-span").addEventListener("click",()=>{customYmm.garage=[],setCookie("garage",JSON.stringify(customYmm.garage)),setupGarage(!0)}),Array.from(document.querySelectorAll(".each-vehicle-in-garage__name")).forEach(t=>{t.addEventListener("click",e=>{decideWhereToGoWhenGarageItemClicked(t.getAttribute("data-ymm-id"))})})}function returnGarageText(){let e=!1;return(e=customYmm.garage.length&&(filteredVehicles=customYmm.garage.filter(e=>e.selected)).length?filteredVehicles[0]:e)?`
                    <span class="selected-ymm selected-ymm-vq"> 
                        <span class="selected-ymm-ymm">
                            ${e.year} ${e.make} ${e.model}
                        </span>
                        <span class="selected-vq">
                            ${e.drive_type} ${e.fuel_type} ${e.num_doors}
                        </span>
                    </span>
                    <span class = "filter-pipe"> | </span>
                    <span class = "change-vehicle"> Change </span> 
                `:`
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
                
                `}function returnGarageIcon(){return`
            <span class="icon-grage">
                ${(void 0===customYmm.settings.headerVehicleIcon?returnJeep:"garage"==customYmm.settings.headerVehicleIcon?returnGarage:"truck"==customYmm.settings.headerVehicleIcon?returnTruck:"car"==customYmm.settings.headerVehicleIcon?returnCar:returnJeep)()}
            </span>
        `}function returnGarageIconOrNothing(){return`
            ${1!=customYmm.garage.filter(e=>e.selected).length?returnGarageIcon():""}
        `}function setupGarage(e=!1){const t=customYmm.garage.length;var r,a;document.querySelector("#newly-added-garage-btn")&&document.querySelector("#newly-added-garage-btn").remove(),1024<window.innerWidth?document.querySelector(customYmm.garageButtonWrapper).innerHTML+=`
                                            
                <!-- need-to-change for every site -->
                                            
                <div id = "newly-added-garage-btn" class="navPages-item navPages-item-page">
                    <input type="checkbox" id="cb-garage-btn" class="hidden">
                    <label for="cb-garage-btn" class ='navPages-action' id="garage-btn">
                        ${returnGarageIconOrNothing()}
                        ${returnGarageText()}
                    </label>
                </div>
    
            `:(r=document.querySelector(".section-header-navigation"),(a=document.createElement("sticky-ymm-mobile")).innerHTML=`
            <div id = "newly-added-garage-btn" class="navPages-item navPages-item-page">
                <input type="checkbox" id="cb-garage-btn" class="hidden">
                <label for="cb-garage-btn" class ='navPages-action' id="garage-btn">
                    ${returnGarageIconOrNothing()}
                    ${returnGarageText()}
                </label>
            </div>
        `,r.parentNode.insertBefore(a,r.nextSibling)),document.querySelector("#cb-garage-btn").addEventListener("change",e=>{(e.target.checked?0<t?(constructGarageAndDisplayIt(),displayGarageWrapper):(document.body.classList.toggle("my-grage-active"),displayOverlay):hideGarageWrapper)()}),e&&constructGarageAndDisplayIt()}function goForAddToGarage(e){var[t,r,a,s,o,c]=returnSelections(e);pushToGarage(e),setupGarage(!1),hideOverlay(),customYmm.isInSearchPage||customYmm.isInCategoryPage||customYmm.isInBrandPage?(customYmm["search-page-ymm-form-container"].selections={year:t,make:r,model:a,drive_type:s,fuel_type:o,num_doors:c},fetchProductsAndRender()):window.location.href=customYmm.siteURL+"/search/"}const decideWhatHappensAfterFormChangeInAddToGarage=async e=>{try{var[t,r,a,s,o,c]=returnSelections(e),m=await fetchYmmOnlyDataAndRender(e);m.drive_type_arr=m.drive_type_arr.filter(e=>""!==e),m.fuel_type_arr=m.fuel_type_arr.filter(e=>""!==e),m.num_doors_arr=m.num_doors_arr.filter(e=>""!==e),manageHighlighted(e),t&&r&&a&&(enableSelectTag(e,"btn-go"),m.drive_type_arr.length||m.fuel_type_arr.length||m.num_doors_arr.length?document.querySelector(".optional-field-label-wrapper").style.display="block":document.querySelector(".optional-field-label-wrapper").style.display="none"),m.makes.length&&0==r||m.models.length&&0==a||m.drive_type_arr.length&&""==s||m.fuel_type_arr.length&&""==o||m.num_doors_arr.length&&""==c||(removeHighlighted(e),goForAddToGarage(e))}catch(e){console.log(e),alert("An error has occurred. Please report it to us.\n"+JSON.stringify(e))}};function setupAddToGarageYMMform(){var e=document.createElement("div"),t=(e.className="modal-wrapper",e.addEventListener("click",()=>{hideOverlay()}),document.createElement("div"));t.className="ymm-add-to-garage-form-modal",t.classList.add("ymm-modal"),t.innerHTML=`

            <div class = "add-to-garage-form-wrapper">
                
                <div class = "add-to-garage-heading">
                    <h3 class = "add-to-garage-heading__heading">SELECT YOUR TRUCK</h3>
                    <div class = "close-icon" onclick = "hideOverlay()">${customYmm.svgCross}</div>
                </div>
                    
                <div class = "ymm-add-to-garage-form-wrapper">
                </div>
                
            </div>

        `,document.body.appendChild(e),document.body.appendChild(t),hideOverlay(),setupYMMform("ymm-add-to-garage-form-modal","ymm-add-to-garage-form-wrapper",decideWhatHappensAfterFormChangeInAddToGarage,goForAddToGarage)}function returnSelectionsForBreadCrumb(){var[e,t,r,a,s,o]=returnSelections("search-page-ymm-form-container");return`
            <h4>${e||""} ${t||""} ${r||""} ${a} ${s} ${o} </h4>
        `}function displayBreadCrumb(){var e,t;customYmm.isInSearchPage?(e=[],(t=customYmm.searchQuery).length&&e.push('"'+t+'"'),document.querySelector("#ymm-breadcrumb").innerHTML=e.length?`
                    <div class="category-title heading-custom"><h1>Search results for ${e.join(" for ")}</h1></div> 
                `:'<div class="category-title heading-custom"><h1>Search Results</h1></div>'):(customYmm.isInCategoryPage||customYmm.isInBrandPage)&&(document.querySelector("#ymm-breadcrumb").innerHTML=`
                 <div class="category-title heading-custom"><h1>${document.querySelectorAll(".bd-title")[document.querySelectorAll(".bd-title").length-1].innerText}</h1></div> 
            `)}async function addToCart(e){e={id:e,quantity:1};try{var t=await fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});console.log(t),document.querySelector(".header__icon--cart").click()}catch(e){console.error(e)}}