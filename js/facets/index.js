const facetSelections = {}

function generateFacetContent(data){
	return data.facets.map(f => {
	    return`
			<div class="facet facet-${f.value}">
			<div class="facet-header">
				<h5>${f.label}</h5>
			</div>
			<div class="facet-options">
				<div class="facet-options-inner">
					${
						f.options.map(o => {
						    const inputID = generateRandomString() 
						    return`
								<div class="facet-option">
									<div class="facet-input-and-label">
									  	<div class="facet-input">
										    <input type="checkbox"
										    	id="cb-${inputID}"
												onChange="handleNonTreeFacetOptionChange(event)"
												value="${o.value}"  
												data-facet="${f.value}"
												data-value="${o.value}"
										    />
									  	</div>
										<div class="facet-label-wrapper">
											<label class="facet-label" for="cb-${inputID}">
										    	${o.label}
											</label>
										</div>
									</div>
									<div class="facet-hit-count">
									 	${o.hits}
									</div>
								</div>
						    `
					  	}).join('')
					}
				</div>
			</div>
			</div>
	    `
  	}).join('')
}

function displayFacetContent(data){

	document.querySelector('.facets').innerHTML = generateFacetContent(data);

}