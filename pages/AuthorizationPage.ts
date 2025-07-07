import { Page, Locator, expect } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com/';

export class AuthorizationPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly menuButton: Locator;
  readonly inventoryContainer: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async goto() {
    await this.page.goto(BASE_URL);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginSuccess() {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html', { timeout: 15000 });
    await expect(this.menuButton).toBeVisible({ timeout: 5000 });
    await expect(this.inventoryContainer).toBeVisible();
  }

  async expectLoginFailure(expectedError?: string) {
    await expect(this.errorMessage).toBeVisible();
    if (expectedError) {
      await expect(this.errorMessage).toHaveText(expectedError);
    }
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}