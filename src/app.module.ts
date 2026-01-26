import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
	// Sert à déclarer les différents composants du module
	providers: [AppService],
	// Sert à déclarer les contrôleurs du module
	controllers: [AppController],
})
export class AppModule {}
