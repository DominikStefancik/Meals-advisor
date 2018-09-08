import { Injectable, HttpService } from "@nestjs/common";
import { Observable } from "rxjs";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import { readFileSync } from "fs";
import { join } from "path";

const DIGI_MEALS_RECIPES = "http://open-api.digimeals.com/recipes";

@Injectable()
export class RecipesService {
  recipesDict: any;

  constructor(private readonly httpService: HttpService) {}

  findAll(): Observable<AxiosResponse<any[]>> {
    return this.httpService.get(DIGI_MEALS_RECIPES);
  }

  find(id: string): Observable<AxiosResponse<any>> {
    return this.httpService.get(`${DIGI_MEALS_RECIPES}/${id}`);
  }

  getIngredients(id: string): Observable<AxiosResponse<any[]>> {
    return this.httpService.get(`${DIGI_MEALS_RECIPES}/${id}`)
    .pipe(map(response => response.data),
          map(recipe => {
          const ingredients = recipe.ingredientsArr.map(ingredient => ingredient.name);

          return ingredients;
        }));
  }

  getCuisineAndThemes(id: string) {
    if (!this.recipesDict) {
      this.initRecipeDictionary();
    }

    const recipe = this.recipesDict[id];

    return {
      cuisine: recipe["Cuisine"],
      themes: recipe["Themes (incomplete)"],
    };
  }

  private initRecipeDictionary() {
    const recipesArray = JSON.parse(
      readFileSync(join(__dirname, "../../data/recipes.json"), { encoding: "utf-8"}),
    );

    this.recipesDict = {};
    recipesArray.forEach(element => {
      this.recipesDict[element.Id] = element;
    });
  }
}