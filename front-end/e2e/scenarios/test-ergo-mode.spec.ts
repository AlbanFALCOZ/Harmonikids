import { test, expect } from '@playwright/test';
import { ErgoModeFixture } from 'src/app/navbar/navbar.fixture';

test.describe('Mode Ergo Tests', () => {
  let ergoModeFixture: ErgoModeFixture;

  test.beforeEach(async ({ page }) => {
    ergoModeFixture = new ErgoModeFixture(page);
    await page.goto('http://localhost:4200');
    await page.waitForLoadState('domcontentloaded');
  });

  test('should activate mode Ergo with correct password', async ({ page }) => {
    await ergoModeFixture.activateErgoMode('admin');
    const isActivated = await ergoModeFixture.isErgoModeActivated();
    expect(isActivated).toBe(true);
  });

  test('should not activate mode Ergo with incorrect password', async ({ page }) => {
    await ergoModeFixture.activateErgoMode('wrongpassword');
    const isDeactivated = await ergoModeFixture.isErgoModeDeactivated();
    expect(isDeactivated).toBe(true);
  });

  test('should deactivate mode Ergo', async ({ page }) => {
    await ergoModeFixture.activateErgoMode('admin');
    await ergoModeFixture.deactivateErgoMode();
    const isDeactivated = await ergoModeFixture.isErgoModeDeactivated();
    expect(isDeactivated).toBe(true);
  });
});
