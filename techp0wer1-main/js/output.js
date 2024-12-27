let basket = []; // Массив для хранения товаров в корзине

// Получаем значение куки по имени
function getCookie(name) {
    const cookieValue = document.cookie.match('(^|[^;]+)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? JSON.parse(cookieValue.pop()) : [];
}

// Функция для отображения данных из куки
function displayCartFromCookie() {
    basket = getCookie('basket'); // Получаем корзину из куки
    const cartItemsList = document.getElementById('cart-items'); // Получаем элемент списка корзины
    const totalPriceElement = document.getElementById('total-price'); // Получаем элемент для вывода общей суммы
    const checkoutButton = document.getElementById('checkout-button'); // Получаем кнопку "Оформить заказ"

    // Очищаем список корзины перед добавлением новых элементов
    cartItemsList.innerHTML = '';

    // Обнуляем общую сумму перед пересчетом
    let totalPrice = 0;

    // Проверяем, пуста ли корзина
    if (basket.length === 0) {
        checkoutButton.style.display = 'none'; // Скрываем кнопку "Оформить заказ"
    } else {
        checkoutButton.style.display = 'block'; // Отображаем кнопку "Оформить заказ"
    }

    // Перебираем товары в корзине и добавляем их в список
    basket.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = ` ${item.item_name} - $${item.price}   `;

        // Создаем кнопку "Удалить" для каждого товара
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', () => {
            basket.splice(index, 1); // Удаляем товар из корзины
            saveCartToCookies(); // Сохраняем обновленную корзину в куки
            displayCartFromCookie(); // Перерисовываем корзину
        });

        listItem.appendChild(deleteButton);
        cartItemsList.appendChild(listItem);

        // Считаем общую сумму
        totalPrice += item.price;
    });

    // Выводим общую сумму
    totalPriceElement.textContent = `Общая сумма: $${totalPrice}`;
}

// Функция для сохранения корзины в куки
function saveCartToCookies() {
    document.cookie = `basket=${JSON.stringify(basket)}; expires=${new Date(Date.now() + 604800000).toUTCString()}; path=/`; // Сохраняем корзину в куки на 7 дней
}

// Показать попап
function showPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 2000); // Попап исчезнет через 2 секунды
}

// Вызываем функцию отображения корзины при загрузке страницы
window.addEventListener('load', displayCartFromCookie);

// Обработчик кнопки оформления заказа
document.getElementById('checkout-button').addEventListener('click', () => {
    showPopup(); // Показываем попап с сообщением о том, что заказ оформлен
});