import { Module } from "@nestjs/common";
import { ProfilesController } from "./profiles.controller.js";
import { ProfilesService } from "./profiles.service.js";

@Module({
	// Sert à déclarer les différents composants du module
	providers: [ProfilesService],
	// Sert à déclarer les contrôleurs du module
	controllers: [ProfilesController],
})
export class ProfilesModule {}
