import { test } from '@playwright/test';
import { AuthorizationPage } from '../pages/AuthorizationPage';

const PASSWORD = 'secret_sauce';

const USERS = [
  { username: 'standard_user', shouldSucceed: true },
  { username: 'locked_out_user', shouldSucceed: false, expectedError: 'Epic sadface: Sorry, this user has been locked out.' },
  { username: 'problem_user', shouldSucceed: true },
  { username: 'performance_glitch_user', shouldSucceed: true },
  { username: 'error_user', shouldSucceed: true },
  { username: 'visual_user', shouldSucceed: true }
];

const successfulUsers = USERS.filter(u => u.shouldSucceed);
const failedUsers = USERS.filter(u => !u.shouldSucceed);

let authPage: AuthorizationPage;

test.beforeEach(async ({ page }) => {
  authPage = new AuthorizationPage(page);
  await authPage.goto();
});

// ✅ Успешная авторизация
test.describe('✅ Успешная авторизация', () => {
  for (const user of successfulUsers) {
    test(`Успешная авторизация для "${user.username}"`, async () => {
      await authPage.login(user.username, PASSWORD);
      await authPage.expectLoginSuccess();
      await authPage.logout();
    });
  }
});

// ❌ Ошибка авторизации
test.describe('❌ Ошибка авторизации', () => {
  for (const user of failedUsers) {
    test(`Неуспешная авторизация для "${user.username}"`, async () => {
      await authPage.login(user.username, PASSWORD);
      await authPage.expectLoginFailure(user.expectedError);
    });
  }
});