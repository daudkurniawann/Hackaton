if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
    //gunain class button remove
    let removeCartItemButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons);
    for(let i = 0; i < removeCartItemButtons.length; i++){
        let button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    // class quantity
    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for(let j = 0; j < quantityInputs.length; j++){
        let input = quantityInputs[j]
        input.addEventListener('change', quantityChanged)
    }
    
    //class add to cart
    let addToCartButtons = document.getElementsByClassName('shop-item-button')
    for(let k = 0; k < addToCartButtons.length; k++){
        let button = addToCartButtons[k]
        button.addEventListener('click', addToCartClicked)
    }
    
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked(){
    alert('Terima Kasih Sudah Berbelanja di Toko Arya')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }

    updateCartTotal()
}

function addToCartClicked(event){
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    let price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    let imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)

    //panggil fungsi lagi untuk update jumlah total
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc){
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0]
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title')

    for(let i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert('sudah ada')
            return
        }
    }

    let cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100" />
            <span class="cart-item-title">${title}</span>
        </div>

        <span class="cart-price cart-column">${price}</span>

        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" />
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`

        cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)

    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function removeCartItem(event){
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()

}

//function untuk tiap quantity berubah harga juga berubah
function quantityChanged(event){
    let input= event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }

    updateCartTotal()
}


// function untuk angka total tiap remove
function updateCartTotal(){
    let cartItemContainer = document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItemContainer.getElementsByClassName('cart-row');
    let total = 0
    for(let i = 0; i < cartRows.length; i++){
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('Rp', ''))
        var quantity = quantityElement.value 
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100

    document.getElementsByClassName('cart-total-price')[0].innerText = 'Rp' + total
}