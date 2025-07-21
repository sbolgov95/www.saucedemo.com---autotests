import { test, expect } from '../fixtures/CartFixtures';

test.beforeEach(async ({ authPage }) => {
  await authPage.login('standard_user', 'secret_sauce');
  await authPage.expectLoginSuccess();
});


test.describe('Начальное состояние корзины', () => {
  test('Корзина пуста по умолчанию', async ({ cartPage }) => {
    await cartPage.openCart();
    await cartPage.expectItemCount(0);
  });
});

test.describe('Добавление товаров в корзину', () => {
  test('Добавление одного товара и проверка корзины', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItemByIndex(0);
    await cartPage.expectCartCount(1);
    await cartPage.openCart();
    await cartPage.expectItemCount(1);
  });

  test('Добавление нескольких товаров и проверка корзины', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItemByIndex(1);
    await inventoryPage.addItemByIndex(2);
    await cartPage.expectCartCount(2);
    await cartPage.openCart();
    await cartPage.expectItemCount(2);
  });
});

test.describe('Удаление товаров из корзины', () => {
  test('Удаление одного товара', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItemByIndex(0);
    await cartPage.openCart();
    const removeButton = cartPage.page.locator('[data-test^="remove-"]');
    await removeButton.click();
    await cartPage.expectItemCount(0);
    await expect(cartPage.cartBadge).toHaveCount(0);
  });
});

test.describe('Навигация корзины', () => {
  test('Переход в корзину и возврат на главную страницу', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItemByIndex(0);
    await cartPage.openCart();
    await cartPage.expectItemCount(1);
    await cartPage.goBackToInventory();
    await cartPage.expectOnInventoryPage();
  });
});
