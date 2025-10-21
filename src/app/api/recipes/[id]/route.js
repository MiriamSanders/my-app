import db from '../../../../../db.json';

export async function GET(req, { params }) {
    const recipe = db.recipes.find(r => r.id.toString() === params.id);
    console.log(recipe);
    if (!recipe) return new Response(JSON.stringify({ message: 'Recipe not found' }), { status: 404 });

    return new Response(JSON.stringify(recipe), { status: 200 });
}