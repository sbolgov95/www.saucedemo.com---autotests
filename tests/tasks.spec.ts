import { test, expect } from '@playwright/test';

test.describe('Добавление задач', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
  });

  test('Add new task: First task with space', async ({ page }) => {
    //Steps
    const taskName = "First task"
    const taskInputSelector = page.getByRole('textbox', { name: 'What needs to be done?' });
    const todoTitleSelector = page.getByTestId('todo-title');

    await taskInputSelector.fill(taskName);
    await taskInputSelector.press('Enter');
    //Result
    await expect(todoTitleSelector).toBeVisible();
    await expect(todoTitleSelector).toHaveText(taskName);
  });

  test('Add new task: Task', async ({ page }) => {
    //Steps
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Task');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
    //Result
    await expect(page.getByTestId('todo-title')).toBeVisible();
    await expect(page.getByTestId('todo-title')).toHaveText('Task');
  });
});