import { test } from '../Fixtures/AuthFixtures';

import { PASSWORD, USERS } from '../Fixtures/UserData';

const successfulUsers = USERS.filter(u => u.shouldSucceed);
const failedUsers = USERS.filter(u => !u.shouldSucceed);

// ✅ Успешная авторизация
test.describe('✅ Успешная авторизация', () => {
  for (const user of successfulUsers) {
    test(`Успешная авторизация для "${user.username}"`, async ({ authPage }) => {
      await authPage.login(user.username, PASSWORD);
      await authPage.expectLoginSuccess();
      await authPage.logout();
    });
  }
});

// ❌ Ошибка авторизации
test.describe('❌ Ошибка авторизации', () => {
  for (const user of failedUsers) {
    test(`Неуспешная авторизация для "${user.username}"`, async ({ authPage }) => {
      await authPage.login(user.username, PASSWORD);
      await authPage.expectLoginFailure(user.expectedError);
    });
  }
});