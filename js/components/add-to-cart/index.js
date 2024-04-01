async function addToCart(variantID){
    
    let items = {
        id: variantID,
        quantity: 1
    };

    try {
        const response = await fetch("/cart/add.js", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(items),
    });
        console.log(response);
        document.querySelector('.header__icon--cart').click()
    } catch (error) {
        console.error(error);
    }

}
