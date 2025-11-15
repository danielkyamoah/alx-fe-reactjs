import { create } from 'zustand'

export const useRecipeStore = create(set => ({
  recipes: [],
  // Search & filter state
  searchTerm: '',
  filteredRecipes: [],

  // Actions
  addRecipe: (newRecipe) => set(state => ({ recipes: [...state.recipes, newRecipe] })),
  deleteRecipe: (id) => set(state => ({ recipes: state.recipes.filter(recipe => recipe.id !== id) })),
  updateRecipe: (id, updatedRecipe) => set(state => ({
    recipes: state.recipes.map(recipe => recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe)
  })),
  setRecipes: (recipes) => set({ recipes }),

  setSearchTerm: (term) => set(state => ({
    searchTerm: term,
    filteredRecipes: state.recipes.filter(r => (r.title || '').toLowerCase().includes((term || '').toLowerCase()))
  })),

  filterRecipes: () => set(state => ({
    filteredRecipes: state.recipes.filter(r => (r.title || '').toLowerCase().includes((state.searchTerm || '').toLowerCase()))
  })),

}));
