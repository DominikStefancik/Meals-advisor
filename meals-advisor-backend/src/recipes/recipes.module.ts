import { Module, HttpModule } from "@nestjs/common";
import { RecipesController } from "./recipes.controller";
import { RecipesService } from "recipes/recipes.service";
import { RecipesMapperService } from "./recipes-mapper.service";

@Module({
  imports: [HttpModule],
  controllers: [RecipesController],
  providers: [RecipesService, RecipesMapperService],
})
export class RecipesModule {}