import { getAllRecipes } from '@/lib/data/recipes';
import RecipesPageContent from '@/components/recipes/recipes-page-content';
import Breadcrumb from '@/components/navigation/breadcrumb';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '料理一覧 | ポケモンスリープ攻略サイト',
  description: 'ポケモンスリープの料理レシピ一覧。エナジーや必要食材から最適な料理を見つけましょう。',
};

export default async function RecipesPage() {
  const recipes = await getAllRecipes();

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: '料理情報' }]} />

      <h1 className="text-4xl font-bold mb-8">料理一覧</h1>

      <RecipesPageContent initialRecipes={recipes} />
    </div>
  );
}
