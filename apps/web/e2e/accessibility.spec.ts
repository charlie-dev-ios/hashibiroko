import { expect, test } from "@playwright/test";

test.describe("アクセシビリティ", () => {
  test("ホームページに適切な見出し構造がある", async ({ page }) => {
    await page.goto("/");

    // h1が1つだけ存在する
    const h1Elements = page.locator("h1");
    await expect(h1Elements).toHaveCount(1);

    // メインコンテンツが存在する
    await expect(page.locator("main")).toBeVisible();
  });

  test("料理ページに適切な見出し構造がある", async ({ page }) => {
    await page.goto("/recipes");

    // h1が1つだけ存在する
    const h1Elements = page.locator("h1");
    await expect(h1Elements).toHaveCount(1);
  });

  test("画像に代替テキストがある", async ({ page }) => {
    await page.goto("/recipes");

    // 画像要素を取得
    const images = page.locator("img");
    const count = await images.count();

    for (let i = 0; i < Math.min(count, 10); i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute("alt");
      // altが存在するか、decorative (空文字) であることを確認
      expect(alt).not.toBeNull();
    }
  });

  test("フォーカスが視認できる", async ({ page }) => {
    await page.goto("/");

    // タブキーでフォーカス移動
    await page.keyboard.press("Tab");

    // フォーカスされた要素が存在する
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toBeVisible();
  });

  test("言語属性が設定されている", async ({ page }) => {
    await page.goto("/");

    const htmlLang = await page.locator("html").getAttribute("lang");
    expect(htmlLang).toBe("ja");
  });
});
