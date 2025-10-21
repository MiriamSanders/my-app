import React from "react";
import { Clock, ChefHat, Users } from "lucide-react";

export default async function Page({ params }) {
  const { id } = params;

  // 👇 Fetch data from your backend
  const res = await fetch(`http://localhost:3000/api/recipes/${id}`, {
    cache: "no-store", // ensures fresh data on each request
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recipe");
  }

  const recipe = await res.json();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Hero Image */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-white px-4 py-2 rounded-full text-sm font-semibold text-orange-600 shadow-lg">
              {recipe.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {recipe.title}
          </h1>
          <p className="text-lg text-gray-600 mb-6">{recipe.description}</p>

          {/* Time Info */}
          <div className="flex gap-6 mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <div>
                <div className="text-sm text-gray-500">Prep Time</div>
                <div className="font-semibold text-gray-900">
                  {recipe.prepTime}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-orange-500" />
              <div>
                <div className="text-sm text-gray-500">Cook Time</div>
                <div className="font-semibold text-gray-900">
                  {recipe.cookTime}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-500" />
              <div>
                <div className="text-sm text-gray-500">Servings</div>
                <div className="font-semibold text-gray-900">
                  {recipe.servings || "4 people"}
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Ingredients */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
                Ingredients
              </h2>
              <div className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-orange-50 transition-colors"
                  >
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">
                      {ingredient.quantity
                        ? `${ingredient.quantity} ${ingredient.unit || ""} `
                        : ""}
                      {ingredient.item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Steps */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
                Instructions
              </h2>
              <div className="space-y-4">
                {recipe.steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
