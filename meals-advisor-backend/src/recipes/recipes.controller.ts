import { Controller, Get, Param } from "@nestjs/common";
import { RecipesService } from "./recipes.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { RecipesMapperService } from "./recipes-mapper.service";

@Controller("recipes")
export class RecipesController {
  constructor(private readonly recipesService: RecipesService,
              private readonly recipesMapperService: RecipesMapperService) {}

  @Get()
  getAllRecipes(): Observable<any[]> {
    return this.recipesService.findAll()
      .pipe(
        map(response => response.data
              .map(recipe => this.recipesMapperService.mapRecipeFromDigiMeals(recipe))));
  }

  @Get(":id")
  getRecipe(@Param() params): Observable<any> {
    return this.recipesService.find(params.id)
      .pipe(map(response => response.data));
  }
}
