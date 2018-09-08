import { Injectable, HttpService } from "@nestjs/common";
import { Observable } from "rxjs";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";
import { readFileSync } from "fs";
import { join } from "path";

const DIGI_MEALS_RECIPES = "http://open-api.digimeals.com/recipes";
const RECIPE_ID_KEY = "Id";
const CUISINE_ID_KEY = "ID";
const CUISINE_PARENTID_KEY = "parentID";
const CUISINE_ENGLISH_NAME_KEY = "EN_GB";

@Injectable()
export class RecipesService {
  recipesDict: any;
  cuisinesParentsDict: any;

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

  getCuisines(id: string) {
    if (!this.recipesDict) {
      this.initRecipeDictionary();
    }

    if (!this.cuisinesParentsDict) {
      this.initCuisinesParentsDict();
    }

    let cuisines = [];
    const recipe = this.recipesDict[id];
    const mainCuisine = recipe["Cuisine"];
    if (mainCuisine) {
      cuisines.push(mainCuisine);
      cuisines = cuisines.concat(this.cuisinesParentsDict[mainCuisine]);
    }

    return cuisines;
  }

  getThemes(id: string): string[] {
    if (!this.recipesDict) {
      this.initRecipeDictionary();
    }

    const themes = [];
    const recipe = this.recipesDict[id];
    themes.push(recipe["Themes (incomplete)"]);

    return themes;
  }

  private initRecipeDictionary() {
    const recipesArray = JSON.parse(
      readFileSync(join(__dirname, "../../data/recipes.json"), { encoding: "utf-8"}),
    );

    this.recipesDict = {};
    recipesArray.forEach(element => {
      this.recipesDict[element[RECIPE_ID_KEY]] = element;
    });
  }

  private initCuisinesParentsDict() {
    const cuisinesArray = JSON.parse(
      readFileSync(join(__dirname, "../../data/cuisine_tags_hierarchy.json"), { encoding: "utf-8"}),
    );

    this.cuisinesParentsDict = {};
    const cusinesIdAndName = {};
    cuisinesArray.forEach(element => {
      cusinesIdAndName[element[CUISINE_ID_KEY]] = element[CUISINE_ENGLISH_NAME_KEY];
      this.cuisinesParentsDict[element[CUISINE_ENGLISH_NAME_KEY]] = [];
    });

    cuisinesArray.forEach(element => {
      if (element[CUISINE_PARENTID_KEY] !== "") {
        this.cuisinesParentsDict[element[CUISINE_ENGLISH_NAME_KEY]].push(
          cusinesIdAndName[element[CUISINE_PARENTID_KEY]]
        );
      }
    });
  }
}