import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    // קריאת הנתיב לקובץ
const filePath = path.join(process.cwd(), 'db.json');
    // קריאת הקובץ הקיים
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileData);
    const recipes = data.recipes || [];

    // שליפת הנתונים מהבקשה
    const { id, title, description, category, imageUrl, prepTime, cookTime, ingredients, steps } = await req.json();

    // יצירת אובייקט חדש
    const newRecipe = {
      id,
      title,
      description,
      category,
      imageUrl,
      prepTime,
      cookTime,
      ingredients,
      steps
    };

    // הוספה למערך
    recipes.push(newRecipe);

    // כתיבה חזרה לקובץ
    fs.writeFileSync(filePath, JSON.stringify({ recipes }, null, 2), 'utf-8');

    // החזרת תשובה
    return new Response(JSON.stringify({
  message: 'Recipe added successfully!',
  recipe: newRecipe
}), {
  status: 201,
  headers: { 'Content-Type': 'application/json' }
});

  } catch (error) {
    console.error("Error writing to db.json:", error);
    return new Response(JSON.stringify({ error: 'Failed to add recipe' }), {
  status: 500,
  headers: { 'Content-Type': 'application/json' }
});
  }
}
