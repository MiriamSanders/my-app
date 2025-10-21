'use client';

import React from 'react';

// Recipe Card Component
const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          {recipe.title}
        </h3>
        
        <div className="flex items-center gap-2 text-gray-600">
          {/* <Clock size={18} /> */}
          <span className="text-sm font-medium">{recipe.cookTime}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;