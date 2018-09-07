import { Module, HttpModule } from "@nestjs/common";
import { RecipesController } from "./recipes.controller";
import { RecipesService } from "recipes/recipes.service";

@Module({
  imports: [HttpModule],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}