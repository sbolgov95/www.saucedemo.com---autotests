import { test as base, expect } from '@playwright/test';
import { AuthorizationPage } from '../pages/AuthorizationPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

export const test = base.extend<{
  authPage: AuthorizationPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
}>({
  authPage: async ({ page }, use) => {
    const authPage = new AuthorizationPage(page);
    await authPage.goto();
    await authPage.login('standard_user', 'secret_sauce');
    await authPage.expectLoginSuccess();
    await use(authPage);
  },
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  }
});

export { expect };