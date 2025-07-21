import { test } from '../fixtures/AuthFixtures';
import { PASSWORD, USERS } from '../fixtures/userData';

const successfulUsers = USERS.filter(u => u.shouldSucceed);
const failedUsers = USERS.filter(u => !u.shouldSucceed);

test.describe('✅ Успешная авторизация', () => {
  for (const user of successfulUsers) {
    test(`Успешная авторизация для "${user.username}"`, async ({ authPage }) => {
      await authPage.login(user.username, PASSWORD);
      await authPage.expectLoginSuccess();
      await authPage.logout();
    });
  }
});

test.describe('❌ Ошибка авторизации', () => {
  for (const user of failedUsers) {
    test(`Неуспешная авторизация для "${user.username}"`, async ({ authPage }) => {
      await authPage.login(user.username, PASSWORD);
      await authPage.expectLoginFailure(user.expectedError);
    });
  }
});
