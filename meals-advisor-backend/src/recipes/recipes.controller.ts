import { Controller, Get, Param } from "@nestjs/common";
import { RecipesService } from "./recipes.service";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

@Controller("recipes")
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  getAllRecipes(): Observable<any[]> {
    return this.recipesService.findAll()
      .pipe(map(response => response.data));
  }

  @Get(":id")
  getRecipe(@Param() params): Observable<any> {
    return this.recipesService.find(params.id)
      .pipe(map(response => response.data));
  }
}
