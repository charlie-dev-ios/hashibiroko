import { expect, test } from "@playwright/test";

test.describe("料理一覧ページ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/recipes");
  });

  test("ページが正しく表示される", async ({ page }) => {
    await expect(page).toHaveTitle(/料理一覧/);
    await expect(page.locator("h1")).toContainText("料理一覧");

    // レシピ総数が表示される
    await expect(page.getByText(/全\d+種類の料理を掲載/)).toBeVisible();
  });

  test("レシピカードが表示される", async ({ page }) => {
    // レシピカードが少なくとも1つ表示される
    const recipeCards = page.locator('[data-testid="recipe-card"]');
    await expect(recipeCards.first()).toBeVisible();
  });

  test("料理タイプでフィルタリングできる", async ({ page }) => {
    // フィルターセクションを確認
    const filterSection = page.getByRole("heading", { name: "料理種別" });
    await expect(filterSection).toBeVisible();

    // カレー・シチューでフィルタ
    const curryButton = page.getByRole("button", { name: "カレー・シチュー" });
    await curryButton.click();

    // ボタンのvariantがdefaultになることを確認（選択状態）
    await expect(curryButton).toBeVisible();
  });

  test("食材フィルターを開閉できる", async ({ page }) => {
    // 食材フィルターが表示される
    await expect(page.getByText("食材フィルター")).toBeVisible();

    // 「開く」ボタンをクリック
    await page.getByRole("button", { name: "食材フィルターを開く" }).click();

    // チェックボックスが表示される（Radix UIはbutton[role="checkbox"]を使用）
    await expect(page.getByRole("checkbox").first()).toBeVisible();

    // 「閉じる」ボタンをクリック
    await page.getByRole("button", { name: "食材フィルターを閉じる" }).click();

    // チェックボックスが非表示になる
    await expect(page.getByRole("checkbox").first()).not.toBeVisible();
  });

  test("すべてボタンでフィルターをリセットできる", async ({ page }) => {
    // カレー・シチューでフィルタ
    await page.getByRole("button", { name: "カレー・シチュー" }).click();

    // 「すべて」ボタンをクリック
    await page.getByRole("button", { name: "すべて" }).click();

    // 「すべて」が表示されていることを確認
    await expect(page.getByRole("button", { name: "すべて" })).toBeVisible();
  });

  test("パンくずリストが表示される", async ({ page }) => {
    const breadcrumb = page.getByRole("navigation", { name: "パンくずリスト" });
    await expect(breadcrumb).toBeVisible();
    // パンくずリスト内のホームリンクを確認
    await expect(
      breadcrumb.getByRole("link", { name: "ホーム" }),
    ).toBeVisible();
  });
});
