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


function generateProductRangeText() {
    
    if(customYmm['searchResultsCount'] == 0){
        return ''
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