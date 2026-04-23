
let cart = [];


function addToCart(itemName, itemPrice) {
    
    let foundItem = null;
    for (let currentIdx = 0; currentIdx < cart.length; currentIdx++) {
        if (cart[currentIdx].name === itemName) {
            foundItem = cart[currentIdx];
            break;
        }
    }

    if (foundItem) {
        
        foundItem.quantity += 1;
    } else {
        let freshItem = {
            name: itemName,
            price: itemPrice,
            quantity: 1
        };
        cart.push(freshItem);
    }

    renderCart();
}


function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}


function clearCart() {
    cart = [];
    renderCart();
}


function calculateTotal() {
    let total = 0;
    if (cart.length === 0) return total;

    let i = 0;
    do {
        total += cart[i].price * cart[i].quantity;
        i++;
    } while (i < cart.length);

    return total;
}

function renderCart() {
    let myCartContainer = document.querySelector('.cart-box');
    if (!myCartContainer) return;

    let cartMarkup = '<h3>Your Cart</h3><br>';

    if (cart.length === 0) {
        
        cartMarkup += '<p class="text-light">Your cart is empty</p>';
        cartMarkup += '<div class="total-section">';
        cartMarkup += '    <span>Total</span>';
        cartMarkup += '    <span>₹0</span>';
        cartMarkup += '</div>';
    } else {
        
        cartMarkup += '<div id="cart-items">';
        for (let idx = 0; idx < cart.length; idx++) {
            let singleFoodItem = cart[idx];
            let itemTotalCost = singleFoodItem.price * singleFoodItem.quantity;
            
            cartMarkup += '<div class="cart-item">';
            cartMarkup += '    <span>' + singleFoodItem.name + ' x ' + singleFoodItem.quantity + '</span>';
            cartMarkup += '    <span>';
            cartMarkup += '        ₹' + itemTotalCost + ' ';
            cartMarkup += '        <button class="cart-item-remove" data-index="' + idx + '" title="Remove item">&times;</button>';
            cartMarkup += '    </span>';
            cartMarkup += '</div>';
        }
        cartMarkup += '</div>';

        
        let finalBill = calculateTotal();
        cartMarkup += '<div class="total-section">';
        cartMarkup += '    <span>Total</span>';
        cartMarkup += '    <span>₹' + finalBill + '</span>';
        cartMarkup += '</div>';

        
        cartMarkup += '<button class="btn btn-danger" id="clear-cart-btn" style="width: 100%; margin-top: 0.5rem;">Clear Cart</button>';
    }

    
    cartMarkup += '<button id="checkout-btn" class="btn btn-primary" style="width: 100%; margin-top: 0.5rem;">Checkout</button>';

    myCartContainer.innerHTML = cartMarkup;

    
    let trashBtns = document.querySelectorAll('.cart-item-remove');
    for (let btnIdx = 0; btnIdx < trashBtns.length; btnIdx++) {
        trashBtns[btnIdx].addEventListener('click', function () {
            let itemPosition = parseInt(this.getAttribute('data-index'));
            removeFromCart(itemPosition);
        });
    }


    let clearBtn = document.getElementById('clear-cart-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', function () {
            clearCart();
        });


        clearBtn.onmouseover = function () {
            this.style.opacity = '0.8';
            this.style.transition = 'opacity 0.2s';
        };
        clearBtn.onmouseout = function () {
            this.style.opacity = '1';
        };
    }

    let checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            if (cart.length === 0) {
                alert('Your cart is empty!');
            } else {
                
                let total = calculateTotal();
                localStorage.setItem('cartTotal', total);
                
                clearCart();
                window.location.href = 'payment.html';
            }
        });
    }
}


document.addEventListener('DOMContentLoaded', function () {

    
    renderCart();


    let menuItemsContainer = document.querySelector('.menu-items');

    if (menuItemsContainer) {
        menuItemsContainer.addEventListener('click', function (event) {
            let button = event.target;
            if (button.tagName === 'BUTTON' && button.textContent.trim() === 'Add to Cart') {

                let foodCardInfo = button.closest('.menu-item-card');
                if (foodCardInfo) {
                    
                    let titleTag = foodCardInfo.querySelector('.item-info h4');
                    let foodNameString = titleTag ? titleTag.textContent.trim() : 'Unknown Item';


                    
                    let costTag = foodCardInfo.querySelector('.item-info strong');
                    let costTextRaw = costTag ? costTag.textContent.trim() : '0';
                    let numericPrice = parseInt(costTextRaw.replace('₹', ''));

                    
                    addToCart(foodNameString, numericPrice);

                    
                    button.textContent = '✓ Added!';
                    button.style.backgroundColor = '#2e7d32';
                    
                    
                    setTimeout(function () {
                        button.textContent = 'Add to Cart';
                        button.style.backgroundColor = '';
                    }, 800);
                }
            }
        });
    }
});
