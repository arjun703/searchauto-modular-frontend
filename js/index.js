
    async function loadSettingsFile(){
        
        customYmm['settingsURL'] = 'https://auto.searchalytics.com/suspension-bros/dashboard/send_settings.php?requestedFile=settings.json'
        
        const response = await fetch(customYmm['settingsURL'])
        
        const jsonData = await response.json()
        
        customYmm['settings'] = jsonData
        
        customYmm['years'] = jsonData.years;
        
        console.log(customYmm['settings'])
        
    }

    async function initialize(){

        loadCssFile()
        
        await loadSettingsFile();

        decideWhichPageIsIt()

        setupAddToGarageYMMform()

        setupHeader()

        if(customYmm["isInProductPage"]) setupForProductPage()
        else if(customYmm["isInHomePage"]) setupForHomePage()
        else if(customYmm["isInCategoryPage"]) setupForCategoryPage()
        else if(customYmm["isInSearchPage"]) setupForSearchPage()
        else if(customYmm["isInBrandPage"]) setupForBrandPage()
        
    }

    initialize()
