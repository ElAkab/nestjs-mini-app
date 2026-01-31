import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Res,
} from "@nestjs/common";
import { UsersService } from "./users.service.js";
import { CreateUserDto } from "./dto/create-user.dto.js";
import { UpdateUserDto } from "./dto/update-user.dto.js";
import { Response } from "express";

// @UsePipes(new ValidationPipe()) // Apply validation pipe at the controller level
@Controller("api/users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post("/signup")
	async create(@Body() createUserDto: CreateUserDto) {
		// the body should contain user data (email, password)
		const user = await this.usersService.create(createUserDto);

		return user;
	}

	@Post("/login")
	async authenticate(
		@Body() createUserDto: CreateUserDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const token = await this.usersService.authenticate(createUserDto);

		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
			sameSite: "strict", // Defend against CSRF
			path: "/", // Cookie valid for entire site
		});

		return { message: "Login successful" };
	}

	@Get()
	async findAll() {
		return await this.usersService.findAll();
	}

	@Get(":id")
	async findOne(@Param("id") id: string) {
		return await this.usersService.findOne(+id);
	}

	@Get("me")
	async getMyProfile(@Res({ passthrough: true }) res: Response) {
		return await this.usersService.getMyProfile(res);
	}

	@Patch(":id")
	async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
		return await this.usersService.update(+id, updateUserDto);
	}

	@Delete(":id")
	async remove(@Param("id") id: string) {
		return await this.usersService.remove(+id);
	}
}
