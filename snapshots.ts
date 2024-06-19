import { expect, Page, Locator } from "@playwright/test";

/**
 * Take a screenshot of a module by clipping to its bounding box (relative to scroll position).
 *
 * @param page - The Playwright page object
 * @param module - Locator for the module element
 */
export const moduleSnapshot = async (page: Page, module: Locator): Promise<void> => {
    const handle = await module.elementHandle();
    const box = await handle?.boundingBox();
    const images = await module.locator('img').all();

    if (box) {
        await expect(page).toHaveScreenshot({
            mask: images,
            fullPage: true,
            clip: {
                x: box.x + await page.evaluate(() => window.scrollX),
                y: box.y + await page.evaluate(() => window.scrollY),
                width: box.width,
                height: box.height
            }
        });
    } else {
        throw new Error('Element bounding box could not be retrieved');
    }
};s
