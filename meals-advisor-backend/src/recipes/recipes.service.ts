import { Injectable, HttpService } from "@nestjs/common";
import { Observable } from "rxjs";
import { AxiosResponse } from "axios";

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
}