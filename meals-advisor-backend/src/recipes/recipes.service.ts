import { Injectable, HttpService } from "@nestjs/common";
import { Observable } from "rxjs";
import { AxiosResponse } from "axios";
import { map } from "rxjs/operators";

const DIGI_MEALS_RECIPES = "http://open-api.digimeals.com/recipes";

@Injectable()
export class RecipesService {
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
}