import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ResponseController } from "./response/response.controller";

@Module({
	// Sert à déclarer les différents composants du module
	providers: [AppService],
	// Sert à déclarer les contrôleurs du module
	controllers: [AppController, ResponseController],
})
export class AppModule {}
