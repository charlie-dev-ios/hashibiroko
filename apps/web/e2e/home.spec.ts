import { expect, test } from "@playwright/test";

test.describe("ホームページ", () => {
  test("ページタイトルが正しく表示される", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/ポケモンスリープ攻略/);
    await expect(page.locator("h1")).toContainText(
      "ポケモンスリープ攻略サイト",
    );
  });

  test("ナビゲーションメニューが表示される", async ({ page }) => {
    await page.goto("/");

    // ナビゲーションカードが表示されることを確認
    await expect(page.getByRole("link", { name: /料理/ })).toBeVisible();
  });

  test("ヘッダーのロゴからホームに遷移できる", async ({ page }) => {
    await page.goto("/recipes");

    await page.getByRole("link", { name: "ポケモンスリープ攻略" }).click();

    await expect(page).toHaveURL("/");
  });
});
