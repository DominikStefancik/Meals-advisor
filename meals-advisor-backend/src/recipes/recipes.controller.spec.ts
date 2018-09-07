import { Test, TestingModule } from "@nestjs/testing";
import { RecipesController } from "./recipes.controller";

describe("Recipes Controller", () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [RecipesController],
    }).compile();
  });
  it("should be defined", () => {
    const controller: RecipesController = module.get<RecipesController>(RecipesController);
    expect(controller).toBeDefined();
  });
});
