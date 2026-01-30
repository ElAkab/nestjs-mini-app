import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { ProfilesModule } from "./profiles/profiles.module.js";
import { UsersModule } from "./users/users.module.js";
import { JwtModule } from "@nestjs/jwt";

@Module({
	// Sert à déclarer les différents composants du module
	providers: [AppService],
	// Sert à déclarer les contrôleurs du module
	controllers: [AppController],
	// Sert à importer les autres modules
	imports: [
		ConfigModule.forRoot(), // Load .env file and make variables available
		ProfilesModule,
		UsersModule,
	],
})
export class AppModule {}
