
   
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

        customYmm["linkToCssFile"] = "style.css"

    }else{

        /***************** for production **********************************/
    
        
        customYmm['selectedCategoryURLVsName']= {};        

        customYmm['ymmDomain'] = 'https://auto.searchalytics.com/suspension-bros/integration'

        customYmm["ymmOnlyApi"] =  customYmm['ymmDomain'] + "/provide-ymm-data-only.php"

        customYmm["fitmentDataApi"] = customYmm['ymmDomain'] + "/provide-fitment-data.php"

        customYmm["searchDataApi"] = customYmm['ymmDomain'] + "/search.php"
        
        customYmm["linkToCssFile"] = "https://apps.cartmade.com/arjun/suspension-bros/auto_search_suspension_bros.css"

        // customYmm["linkToCssFile"] = customYmm['ymmDomain'] + "/style.css"

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



    // customYmm["productPageWrapper"] = ".productView-moreItem .productView-options"
    customYmm["productPageWrapper"] = "#seach_auto_fitment_verification"
    customYmm["homePageWrapper"] = "#suspensionbroshomewrapper"
    customYmm["searchPageWrapper"] = "#searchpagewrapper"
    customYmm["subCatContainerForCategoryPage"] = "#subcats-container"
    
    customYmm["categoryPageWrapper"] = "#searchpagewrapper"
    customYmm["brandPageWrapper"] = "#searchpagewrapper"
    // customYmm["garageButtonWrapper"] = ".header-single-line__item"
    customYmm["garageButtonWrapper"] = ".menu-icons-wrap"
    customYmm["garageButtonWrapperMobile"] = ".section-header-mobile";
    
    customYmm["quickSearchWrapper"] = ".search-modal__content"
    customYmm["searchQuery"] = ""
    
    customYmm["fitmentTableWrapper"] = "#tab-custom-tab-fitment-mobile"
    customYmm["fitmentTabLinkWrapper"] = ".productView-bottom .tabs"

    customYmm['isInHomePageChecker'] = '#suspensionbroshomewrapper'

    customYmm['filtersWrapperMobile'] = '#filters-wrapper-mobile';
    customYmm['filtersWrapperDesktop'] = '#filters-wrapper-desktop';

    customYmm['filtersWrapperMobileSidebarClass'] = "halo-sidebar halo-sidebar-left";


    createFiltersMobileWrapperAndAppend();

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



    if(getCookie("garage")) customYmm["garage"] = JSON.parse(getCookie("garage"))
    else customYmm["garage"] = []
