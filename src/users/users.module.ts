import { Module } from "@nestjs/common";
import { UsersService } from "./users.service.js";
import { UsersController } from "./users.controller.js";
import { ProfilesService } from "../profiles/profiles.service.js";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants.js";

@Module({
	// This imports the JwtModule and configures it with a secret and token expiration time
	imports: [
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: "1h" },
		}),
	],
	controllers: [UsersController],
	providers: [UsersService, ProfilesService],
})
export class UsersModule {}
