// Mobile device side menu features 
const menu = document.querySelector('.menu');
const btnHamburger = document.querySelector('.hamburger');
const btnMenuClose = document.querySelector('#btnMenuClose');

btnHamburger.addEventListener('click', onHamburgerClick);
function onHamburgerClick() {
    menu.classList.remove('hidden');
}
btnMenuClose.addEventListener('click', onBtnMenuCloseClick);
function onBtnMenuCloseClick() {
    menu.classList.add('hidden');
}

// Cart button box feature
const cart = document.querySelector('.cart');
const btnCart = document.querySelector('.btnCart');

btnCart.addEventListener('click', openCart);
function openCart() {
    cart.classList.toggle('hidden');
}

// product counter plus minus button features
const btnPlus = document.querySelector('#btnPlus');
const btnMinus = document.querySelector('#btnMinus');
const productCounter = document.querySelector('.counter');

btnPlus.addEventListener('click', productCounterPlus);
btnMinus.addEventListener('click', productCounterMinus);

let productCounterValue = 1;

function productCounterPlus() {
    setProductCounter(1);
}

function productCounterMinus() {
    setProductCounter(-1);
}

function setProductCounter(value) {
    if ((productCounterValue + value) > 0) {
        productCounterValue += value;
        productCounter.innerHTML = productCounterValue;
    }
}

// handle thumbnail click
const gallery = document.querySelectorAll('.pic');
const heroImg = document.querySelector('.product-hero');

gallery.forEach(img => {
    img.addEventListener('click', onThumbClick);
});

function onThumbClick(event) {
    //clear active state for all thumbnails
    gallery.forEach(img => {
        img.classList.remove('active');
    });
    //set active thumbnail
    event.target.parentElement.classList.add('active');
    //update hero image
    heroImg.src = event.target.src.replace('-thumbnail', '');//--replacing -thumbnail with '' 
}

// handle next/previous arrow click on Mobile screen for lightbox
const btnNext = document.querySelector('.next');
const btnPrevious = document.querySelector('.previous');

btnNext.addEventListener('click', handleBtnClickNext);
btnPrevious.addEventListener('click', handleBtnClickPrevious);

function handleBtnClickNext() {
    let imageIndex = getCurrentImageIndex();
    imageIndex++;
    if (imageIndex > 4) {
        imageIndex = 1;
    }
    setHeroImage(imageIndex);
}

function handleBtnClickPrevious() {
    let imageIndex = getCurrentImageIndex();
    imageIndex--;
    if (imageIndex < 1) {
        imageIndex = 4;
    }
    setHeroImage(imageIndex);
}

function getCurrentImageIndex() {
    const imageIndex = parseInt(heroImg.src.split('\\').pop().split('/').pop().replace('.jpg', '').replace('image-product-', ''));
    return imageIndex;
}

function setHeroImage(imageIndex) {
    heroImg.src = `./images/image-product-${imageIndex}.jpg`;
    //images are not sync
    gallery.forEach(img => {
        img.classList.remove('active');
    });
    //set active thumbnail
    gallery[imageIndex-1].classList.add('active');
}

// adding products to cart by button count feature
let productsInCart = 0;
let price = 250.0
let discount = 0.5;

const btnAddToCard = document.querySelector('.btn');
const cartCount = document.querySelector('.cart-count');//--cart icon value update
const productInShoppingCart = document.querySelector('.products-in-cart');
const msgEmpty = document.querySelector('.msg-empty');
const checkout = document.querySelector('.checkout');

btnAddToCard.addEventListener('click', addToCart);

function addToCart() {
    productsInCart += productCounterValue;

    const productHTMLElement = `
    <div class="item">
        <img class="product-img" src="./images/image-product-1-thumbnail.jpg" alt="product 1 thumb">
        <div class="details">
            <div class="product-name">Autumn Limited Edition...</div>
            <div class="price-group">
                <div class="price">$${(price*discount).toFixed(2)}</div> x
                <div class="count">${productsInCart}</div>
                <div class="total-amount">$${(price*discount*productsInCart).toFixed(2)}</div>
        </div>
        </div>
        <img id="btnDelete" src="./images/icon-delete.svg" alt="icon delete">
    </div>
    `;

    productInShoppingCart.innerHTML = productHTMLElement;

    updateCart();

    const btnDelete = document.querySelector('#btnDelete');
    btnDelete.addEventListener('click', onBtnDeleteClick);
    //console.log(productsInCart);
}

function updateCart() {
    updateCartIcon();
    updateMsgEmpty();
    updateCheckoutButton();
}

function updateCartIcon() {
    cartCount.textContent = productsInCart;
    if (productsInCart == 0) {
        if (!cartCount.classList.contains('hidden')) {
            cartCount.classList.add('hidden');
        }
    } else {
        cartCount.classList.remove('hidden');
    }
}

function updateMsgEmpty() {
    if (productsInCart == 0) {
        if (msgEmpty.classList.contains('hidden')) {
            msgEmpty.classList.remove('hidden');
        }
    } else {
        if (!msgEmpty.classList.contains('hidden')){
            msgEmpty.classList.add('hidden');
        }
    }

}

function updateCheckoutButton() {
    if (productsInCart == 0) {
        if (!checkout.classList.contains('hidden')) {
            checkout.classList.add('hidden');
        }
    } else {
        checkout.classList.remove('hidden');
    }
}

function onBtnDeleteClick() {
    productsInCart--;
    updateCart();

    const el = document.querySelector('.count');
    const totalAmount = document.querySelector('.total-amount');
    el.innerHTML = productsInCart;
    totalAmount.innerHTML = `$${(price*discount*productsInCart).toFixed(2)}`;

    if (productsInCart == 0) {
        productInShoppingCart.innerHTML = '';
    }
}

