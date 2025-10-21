'use client';
import { useState } from 'react';
import RecipeForm from './recipeForm';


export default function AddRecipeButton() {
    const [showForm, setShowForm] = useState(false);

    return (
        <>
            <button onClick={() => {
                setShowForm(!showForm);
            }}>Add Recipe         {showForm ? 'Hide Form' : 'Add New Recipe'}
            </button>
            {showForm && <RecipeForm/>}
        </>
    )
}