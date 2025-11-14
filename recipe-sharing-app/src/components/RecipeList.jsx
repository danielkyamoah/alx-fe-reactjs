import { Link } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";
import DeleteRecipeButton from "./DeleteRecipeButton";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add one to get started!</p>
      ) : (
        <div style={{ display: "grid", gap: "1rem" }}>
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              style={{
                border: "1px solid #ddd",
                padding: "1rem",
                borderRadius: "4px",
              }}
            >
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <Link
                  to={`/recipe/${recipe.id}`}
                  style={{ color: "#0066cc", textDecoration: "none" }}
                >
                  View Details
                </Link>
                <DeleteRecipeButton id={recipe.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
