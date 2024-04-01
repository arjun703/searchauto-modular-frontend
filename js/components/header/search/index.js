

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
        // document.querySelector('.halo-sidebar-search').innerHTML = `

        //     <form class="form" id = "ymm-search-query-form-mobile" onsubmit="return false">
        //         <fieldset class="form-fieldset">
        //             <div class="form-field">
        //                 <input class="form-input" data-search-quick="" name="nav-quick-search" id="nav-quick-search-mobile"  placeholder="Search the store" autocomplete="off">
        //                  <button type="submit" class="button button--{{#if theme_settings.halo_homepage_layout_4}}tertiary{{else}}primary{{/if}}" aria-label="{{lang 'search.quick_search.input_label'}}"><svg id="Icon_-_Search" data-name="Icon - Search" xmlns="http://www.w3.org/2000/svg" width="18.875" height="20" viewBox="0 0 18.875 20">
        //                     <path id="Union_1" data-name="Union 1" d="M18.166,20l-6.376-6.925a7.2,7.2,0,0,1-4.526,1.6A7.337,7.337,0,0,1,7.264,0a7.309,7.309,0,0,1,7.265,7.336,7.4,7.4,0,0,1-2.023,5.08l6.37,6.918ZM7.264.979a6.359,6.359,0,0,0,0,12.716A6.246,6.246,0,0,0,11.5,12.038a6.4,6.4,0,0,0,2.057-4.7A6.334,6.334,0,0,0,7.264.979Z" transform="translate(0 0)" fill="#fff"/>
        //                         </svg></button>
        //             </div>
        //         </fieldset>
        //     </form>

        // `



        document.getElementById('ymm-search-query-form').addEventListener('submit', handleSubmit)
        // document.getElementById('ymm-search-query-form-mobile').addEventListener('submit', handleSubmit)

        document.getElementById('nav-quick-search').addEventListener('input', event => {
            customYmm["searchQuery"] = event.target.value.trim()
        })

        // document.getElementById('nav-quick-search-mobile').addEventListener('input', event => {
        //     customYmm["searchQuery"] = event.target.value.trim()
        // })


    }
