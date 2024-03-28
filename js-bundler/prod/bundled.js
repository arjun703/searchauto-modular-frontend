const data={facets:[{value:"price",type:"standard",label:"Price",options:[{value:"(, 50]",hits:20,label:"less than $50"},{value:"(50, 100]",hits:30,label:"$50 to $100"},{value:"(100, )",hits:33,label:"$50 to $100"}]},{value:"lift_height",type:"non_standard",label:"Lift Height",options:[{value:"1",hits:20,label:"1",selected:!0},{value:"4_4",hits:30,label:"4_4"},{value:"10",hits:33,label:"10"}]},{value:"brand",type:"non_standard",label:"Brand",options:[{value:"bds-suspension",hits:20,label:"BDS Suspension"},{value:"ford",hits:30,selected:!0,label:"Ford"},{value:"corvette",hits:33,label:"Corvette"}]},{value:"lift_weight",type:"non_standard",label:"Lift Weight",options:[{value:"1",hits:20,label:"1"},{value:"4_4",hits:30,label:"4_4"},{value:"10",selected:!0,hits:33,label:"10"}]},{value:"house_material",type:"non_standard",label:"House Material",options:[{value:"material-a",hits:20,label:"Material A"},{value:"material-b",hits:30,label:"Material B",selected:!0},{value:"material-c",hits:33,label:"Material C"}]}]};function generateRandomString(a=10){var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let l="";for(let e=0;e<a;e++){var i=Math.floor(Math.random()*t.length);l+=t.charAt(i)}return l}displayFacetContent(data);const facetSelections={};function generateFacetContent(e){return e.facets.map(t=>`
			<div class="facet facet-${t.value}">
				<div class="facet-header">
					<h5>${t.label}</h5>
				</div>
				<div class="facet-options">
					<div class="facet-options-inner">
						${t.options.map(e=>{var a=generateRandomString();return`
									<div class="facet-option">
										<div class="facet-input-and-label">
										  	<div class="facet-input">
											    <input type="checkbox"
											    	id="cbb-${a}"
													onChange="handleNonTreeFacetOptionChange(event)"
													value="${e.value}"  
													data-facet="${t.value}"
													data-value="${e.value}"
											    />
										  	</div>
											<div class="facet-label-wrapper">
												<label class="facet-label" for="cbb-${a}">
											    	${e.label}
												</label>
											</div>
										</div>
										<div class="facet-hit-count">
										 	${e.hits}
										</div>
									</div>
							    `}).join("")}
					</div>
				</div>
			</div>
	    `).join("")}function displayFacetContent(e){document.querySelector(".facets").innerHTML=generateFacetContent(e)}function handleNonTreeFacetOptionChange(e){e.target.checked?facetSelections[e.target.getAttribute("data-facet")]=e.target.value:e.target.getAttribute("data-facet")in facetSelections&&delete facetSelections[e.target.getAttribute("data-facet")]}