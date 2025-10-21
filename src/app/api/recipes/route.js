import { NextResponse } from 'next/server';
import recipesData from '../../../../db.json';

export async function GET() {
  const simplifiedRecipes = recipesData.recipes.map(r => ({
    id: r.id,
    title: r.title,
    imageUrl: r.imageUrl,
    cookTime: r.cookTime,
  }));

  return NextResponse.json(simplifiedRecipes);
}
