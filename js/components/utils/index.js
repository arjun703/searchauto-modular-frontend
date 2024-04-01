
    // Set a cookie with a name, value, optional expiration date, and path
    function setCookie(name, value) {

        let cookie = `${name}=${encodeURIComponent(value)}`;
        let daysToExpire = 30
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + daysToExpire);
        cookie += `; expires=${expirationDate.toUTCString()}`;
        cookie += `; path=/`; // Default path to '/'
        document.cookie = cookie;

    }

    // Read a cookie by its key (name)
    function getCookie(key) {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
            const [cookieKey, cookieValue] = cookie.trim().split('=');
            if (cookieKey === key) {
                return decodeURIComponent(cookieValue);
            }
        }
        return null; // Return null if the cookie is not found
    }







    function loadCssFile(){

        // Create a new link element for the CSS file
        const linkElement = document.createElement("link");

        // Set the attributes for the link element
        linkElement.rel = "stylesheet";
        linkElement.type = "text/css";
        linkElement.href = customYmm["linkToCssFile"]; // Replace with the actual path to your CSS file

        // Append the link element to the <head> section of the document
        document.head.appendChild(linkElement);

    }