if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
 
function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('order-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('cafe-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Order placed successfully.THANK YOU')
    var cartItems = document.getElementsByClassName('order-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('cafe-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('cafe-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('cafe-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('order-row')
    var cartItems = document.getElementsByClassName('order-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('order-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already ordered')
            return
        }
    }
    var cartRowContents = `
        <div class="order-item order-column">
            <img class="order-item-image" src="${imageSrc}" width="100" height="100">
          <span class="order-item-title">${title}</span>
        </div>
        <span class="order-price order-column">${price}</span>
        <div class="order-quantity order-column">
            <input class="order-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('order-quantity-input')[0].addEventListener('change', quantityChanged)
  
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('order-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('order-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('order-price')[0]
        var quantityElement = cartRow.getElementsByClassName('order-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('Ksh.', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('order-total-price')[0].innerText = 'Ksh.' + total
}