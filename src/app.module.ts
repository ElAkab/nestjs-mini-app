import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProfilesModule } from "./profiles/profiles.module";

@Module({
	// Sert à déclarer les différents composants du module
	providers: [AppService],
	// Sert à déclarer les contrôleurs du module
	controllers: [AppController],
	// Sert à importer les autres modules
	imports: [ProfilesModule],
})
export class AppModule {}
