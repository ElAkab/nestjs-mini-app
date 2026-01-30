import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service.js";
import { CreateUserDto } from "./dto/create-user.dto.js";
import { UpdateUserDto } from "./dto/update-user.dto.js";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post("/signup")
	create(@Body() createUserDto: CreateUserDto) {
		// the body should contain user data (email, password)
		const user = this.usersService.create(createUserDto);

		return user;
	}

	@Post("/login")
	authenticate(@Body() createUserDto: CreateUserDto) {
		const user = this.usersService.authenticate(createUserDto);

		return user;
	}

	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.usersService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(+id, updateUserDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.usersService.remove(+id);
	}
}
