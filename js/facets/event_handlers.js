function handleNonTreeFacetOptionChange(e){

  if(e.target.checked){
    facetSelections[e.target.getAttribute("data-facet")] = e.target.value
  }else if(e.target.getAttribute("data-facet") in facetSelections){
    delete facetSelections[e.target.getAttribute("data-facet")] 
  }
  
}