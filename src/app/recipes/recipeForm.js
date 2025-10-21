'use client';

import { useState } from 'react';

export default function RecipeForm() {
  const [formData, setFormData] = useState({
    id: Date.now(),
    title: '',
    description: '',
    category: '',
    imageUrl: '',
    prepTime: '',
    cookTime: '',
    ingredients: '',
    steps: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ingredientsArray = formData.ingredients
      .split('\n')
      .filter(line => line.trim())
      .map((line) => ({ item: line, quantity: 1, unit: '' }));
    const stepsArray = formData.steps.split('\n').filter(line => line.trim());

    const newRecipe = {
      ...formData,
      ingredients: ingredientsArray,
      steps: stepsArray
    };

    try {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe)
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Recipe "${data.recipe.title}" added successfully!`);
        setFormData({
          id: Date.now(),
          title: '',
          description: '',
          category: '',
          imageUrl: '',
          prepTime: '',
          cookTime: '',
          ingredients: '',
          steps: ''
        });
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('Failed to add recipe');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-6 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-orange-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h1 className="text-4xl font-bold">Add New Recipe</h1>
            </div>
            <p className="text-orange-100 text-lg">Share your special recipe with the world</p>
          </div>

          {/* Form */}
          <div className="p-8 space-y-6">
            {/* Title */}
            <div className="relative">
              <label className="block text-orange-800 font-semibold mb-2 text-lg">Recipe Title</label>
              <input
                name="title"
                placeholder="e.g., Homemade Chocolate Cake"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-lg"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-orange-800 font-semibold mb-2 text-lg">Description</label>
              <textarea
                name="description"
                placeholder="Describe your recipe in a sentence or two..."
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors resize-none text-lg"
              />
            </div>

            {/* Category & Image URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-orange-800 font-semibold mb-2 text-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Category
                </label>
                <input
                  name="category"
                  placeholder="Main Course, Dessert, Salad..."
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-lg"
                />
              </div>

              <div>
                <label className="block text-orange-800 font-semibold mb-2 text-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Image URL
                </label>
                <input
                  name="imageUrl"
                  placeholder="https://..."
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-lg"
                />
              </div>
            </div>

            {/* Prep & Cook Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-orange-800 font-semibold mb-2 text-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Prep Time
                </label>
                <input
                  name="prepTime"
                  placeholder="15 minutes"
                  value={formData.prepTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-lg"
                />
              </div>

              <div>
                <label className="block text-orange-800 font-semibold mb-2 text-lg flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Cook Time
                </label>
                <input
                  name="cookTime"
                  placeholder="30 minutes"
                  value={formData.cookTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-lg"
                />
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <label className="block text-orange-800 font-semibold mb-2 text-lg">Ingredients</label>
              <p className="text-sm text-orange-600 mb-2">One ingredient per line</p>
              <textarea
                name="ingredients"
                placeholder="2 cups flour&#10;1 cup sugar&#10;3 eggs&#10;..."
                value={formData.ingredients}
                onChange={handleChange}
                rows="6"
                className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors resize-none text-lg font-mono"
              />
            </div>

            {/* Steps */}
            <div>
              <label className="block text-orange-800 font-semibold mb-2 text-lg">Preparation Steps</label>
              <p className="text-sm text-orange-600 mb-2">One step per line</p>
              <textarea
                name="steps"
                placeholder="Mix dry ingredients&#10;Add eggs&#10;Bake at 350°F&#10;..."
                value={formData.steps}
                onChange={handleChange}
                rows="8"
                className="w-full px-4 py-3 border-2 border-orange-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors resize-none text-lg font-mono"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-xl"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Recipe
            </button>

            {/* Message */}
            {message && (
              <div className={`p-4 rounded-xl text-center font-semibold text-lg animate-fadeIn ${
                message.includes('Error') || message.includes('Failed')
                  ? 'bg-red-100 text-red-700 border-2 border-red-300'
                  : 'bg-green-100 text-green-700 border-2 border-green-300'
              }`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}