import { test } from '../fixtures/CartFixtures';

test.describe('Начальное состояние корзины', () => {
  test('Корзина пуста по умолчанию', async ({ authPage, cartPage }) => {
    await cartPage.openCart();
    await cartPage.expectItemCount(0);
    await authPage.logout();
  });
});

test.describe('Добавление товаров в корзину', () => {
  test('Добавление одного товара и проверка корзины', async ({ authPage, inventoryPage, cartPage }) => {
    await inventoryPage.addItemByIndex(0);
    await cartPage.expectCartCount(1);
    await cartPage.openCart();
    await cartPage.expectItemCount(1);
    await authPage.logout();
  });

  test('Добавление нескольких товаров и проверка корзины', async ({ authPage, inventoryPage, cartPage }) => {
    await inventoryPage.addItemsByIndexes([1, 2]);
    await cartPage.expectCartCount(2);
    await cartPage.openCart();
    await cartPage.expectItemCount(2);
    await authPage.logout();
  });
});

test.describe('Удаление товаров из корзины', () => {
  test('Удаление одного товара', async ({ authPage, inventoryPage, cartPage }) => {
    await inventoryPage.addItemByIndex(0);
    await cartPage.openCart();
    await cartPage.removeFirstItem();
    await cartPage.expectItemCount(0);
    await cartPage.expectCartIsEmpty();
    await authPage.logout();
  });
});

test.describe('Навигация корзины', () => {
  test('Переход в корзину и возврат на главную страницу', async ({ authPage, inventoryPage, cartPage }) => {
    await inventoryPage.addItemByIndex(0);
    await cartPage.openCart();
    await cartPage.expectItemCount(1);
    await cartPage.goBackToInventory();
    await cartPage.expectOnInventoryPage();
    await authPage.logout();
  });
});
