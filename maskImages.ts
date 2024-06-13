import { Page, Locator } from "@playwright/test";

/**
 * Preventing false positives by masking images
 *
 * @param {Page} page - The Playwright page object
 * @returns             Locators for all images on the page
 */
export const maskImages = async (page: Page): Promise<Locator[]> => {
    return await page.locator('img').all();
};
