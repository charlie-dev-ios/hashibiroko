import { expect, test } from "@playwright/test";

test.describe("ナビゲーション", () => {
  test("ホームから料理ページに遷移できる", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: /料理/ }).click();

    await expect(page).toHaveURL("/recipes");
    await expect(page.locator("h1")).toContainText("料理一覧");
  });

  test("パンくずリストでホームに戻れる", async ({ page }) => {
    await page.goto("/recipes");
    await page.waitForLoadState("networkidle");

    // パンくずリスト内のホームリンクをクリック
    await page
      .getByRole("navigation", { name: "パンくずリスト" })
      .getByRole("link", { name: "ホーム" })
      .click();

    await expect(page).toHaveURL("/");
  });
});

test.describe("モバイルナビゲーション", () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test("モバイルメニューが動作する", async ({ page }) => {
    await page.goto("/");

    // モバイルメニューボタンをクリック
    const menuButton = page.getByRole("button", { name: /メニュー|menu/i });
    if (await menuButton.isVisible()) {
      await menuButton.click();

      // メニューが開く
      await expect(page.getByRole("navigation")).toBeVisible();
    }
  });
});

test.describe("レスポンシブデザイン", () => {
  const viewports = [
    { name: "モバイル", width: 375, height: 667 },
    { name: "タブレット", width: 768, height: 1024 },
    { name: "デスクトップ", width: 1280, height: 720 },
  ];

  for (const viewport of viewports) {
    test(`${viewport.name}でホームページが正しく表示される`, async ({
      page,
    }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("/");

      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("header")).toBeVisible();
    });
  }
});
