export const PASSWORD = 'secret_sauce';

export const USERS = [
  { username: 'standard_user', shouldSucceed: true },
  { username: 'locked_out_user', shouldSucceed: false, expectedError: 'Epic sadface: Sorry, this user has been locked out.' },
  { username: 'problem_user', shouldSucceed: true },
  { username: 'performance_glitch_user', shouldSucceed: true },
  { username: 'error_user', shouldSucceed: true },
  { username: 'visual_user', shouldSucceed: true }
];