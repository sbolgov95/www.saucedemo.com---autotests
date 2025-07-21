import { test as base, expect } from '@playwright/test';
import { AuthorizationPage } from '../pages/AuthorizationPage';

type Fixtures = {
    authPage: AuthorizationPage;
};

export const test = base.extend<Fixtures>({
    authPage: async ({ page }, use) => {
        const authPage = new AuthorizationPage(page);
        await authPage.goto();
        await authPage.login('standard_user', 'secret_sauce');
        await authPage.expectLoginSuccess();
        await use(authPage);
    },
});

export { expect };