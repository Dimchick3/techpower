let cart = [];
let totalPrice = 0;

document.addEventListener('DOMContentLoaded', (event) => {
    const cartCookie = getCookie('basket');
    if (cartCookie) {
        cart = JSON.parse(cartCookie);
        totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    }
});

function addToCart(itemName, price) {
    const newItem = { item_name: itemName, price: price };
    cart.push(newItem);
    totalPrice += price;
    setCookie('basket', JSON.stringify(cart), 7);
    localStorage.setItem('basket', JSON.stringify(basket));
    window.location.href = 'basket.html';// Сохранить корзину в куки на 7 дней
}
function toggleCart() {
    const cart = document.getElementById('cart');
    cart.classList.toggle('visible');
}

function placeOrder() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'order.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert('Заказ оформлен!');
            eraseCookie('basket'); // Очистить куки после оформления заказа
            cart = [];
            totalPrice = 0;
            updateCartDisplay();
        }
    };
    xhr.send(JSON.stringify(cart));
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

