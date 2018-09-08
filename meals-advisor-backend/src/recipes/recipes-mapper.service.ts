import { Injectable } from "@nestjs/common";
import { RecipesService } from "./recipes.service";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class RecipesMapperService {
  constructor(private readonly recipesService: RecipesService) {}

  mapRecipeFromDigiMeals(recipe: any): any {
    const newRecipe = {
      id: recipe.id,
      name: recipe.name,
      mainImageUrl: "https://api.digimeals.com" + recipe.mainImageUrl,
      cuisines: [],
      themes: [],
      ingredients: [],
    };

    const ingredients = this.recipesService.getIngredients(recipe.id)
      .subscribe(ingredientsData => {
        newRecipe.ingredients = ingredientsData.data;
      });

    newRecipe.cuisines = this.recipesService.getCuisines(recipe.id);
    newRecipe.themes = this.recipesService.getThemes(recipe.id);

    return newRecipe;
  }
}