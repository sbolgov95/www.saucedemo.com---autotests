import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly inventoryItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('button:has-text("Add to cart")');
    }

    async addItemByIndex(index: number) {
        await this.inventoryItems.nth(index).click();
    }

    async addItemsByIndexes(indexes: number[]) {
        for (const index of indexes) {
            await this.addItemByIndex(index);
        }
    }
}