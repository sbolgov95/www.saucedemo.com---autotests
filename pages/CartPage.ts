import { Page, Locator, expect } from '@playwright/test';

const INVENTORY_URL = 'https://www.saucedemo.com/inventory.html';

export class CartPage {
    readonly page: Page;
    readonly cartLink: Locator;
    readonly cartBadge: Locator;
    readonly cartItems: Locator;
    readonly backButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartItems = page.locator('.cart_item');
        this.backButton = page.locator('[data-test="continue-shopping"]');
    }

    async openCart() {
        await this.cartLink.click();
    }

    async expectCartCount(count: number) {
        await expect(this.cartBadge).toHaveText(String(count));
    }

    async expectItemCount(count: number) {
        await expect(this.cartItems).toHaveCount(count);
    }

    async goBackToInventory() {
        await this.backButton.click();
    }

    async expectOnInventoryPage() {
        await expect(this.page).toHaveURL(INVENTORY_URL);
    }
}