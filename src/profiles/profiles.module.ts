import { Module } from "@nestjs/common";
import { ProfilesController } from "./profiles.controller";
import { ProfilesService } from "./profiles.service";

@Module({
	// Sert à déclarer les différents composants du module
	providers: [ProfilesService],
	// Sert à déclarer les contrôleurs du module
	controllers: [ProfilesController],
})
export class ProfilesModule {}
