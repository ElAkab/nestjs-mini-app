import {
	Injectable,
	NotFoundException,
	BadRequestException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto.js";
import { UpdateUserDto } from "./dto/update-user.dto.js";
import { prisma } from "../lib/prisma.js";
import { ProfilesService } from "../profiles/profiles.service.js";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
	constructor(
		private readonly profilesService: ProfilesService,
		private readonly jwtService: JwtService, // Inject JwtService for future use
	) {}

	async create(createUserDto: CreateUserDto) {
		const { email, password } = createUserDto;

		const isUnique = await prisma.user.findUnique({
			where: { email },
		});

		if (isUnique) {
			throw new BadRequestException("Email already in use");
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				email,
				hashed_password: hashedPassword, // In a real app, hash the password before storing
			},
		});

		// Get the name by character part before the "@" in the email
		const username = email.split("@")[0];

		// Create a profile for the new user
		await this.profilesService.createProfile({
			username: username,
			userId: user.id,
		});

		const { hashed_password, ...userWithoutPassword } = user; // Exclude password from returned user object (smart way to do it 😎)
		return userWithoutPassword; // Return the created user without the password
	}

	async authenticate(createUserDto: CreateUserDto) {
		const { email, password } = createUserDto;

		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			throw new NotFoundException("User not found");
		}

		const isPasswordValid = await bcrypt.compare(
			password,
			user.hashed_password,
		);

		if (!isPasswordValid) {
			throw new NotFoundException("Invalid credentials");
		}

		// JWT Generation Logic. Create a payload with user info with : sub = subject as user id and email
		const payload = { sub: user.id, email: user.email };
		const token = await this.jwtService.signAsync(payload); // Generate JWT token. So the token will contain the user id and email. To get the user id later, we will do: const userId = payload.sub

		return token; // Return the JWT token
	}

	async findAll() {
		const users = await prisma.user.findMany();
		return users.map(({ hashed_password, ...user }) => user); // Exclude passwords from returned users (advanced way to do it 😎)
	}

	async findOne(id: number) {
		const user = await prisma.user.findUnique({
			where: {
				id: id,
			},
		});

		if (!user) {
			throw new NotFoundException(`User with id ${id} not found :/...`);
		}

		return { ...user, hashed_password: undefined }; // Exclude password from returned user object
	}

	async getMyProfile(res: any) {
		const token = res.req.cookies["token"];

		if (!token) {
			throw new NotFoundException("No token found");
		}

		// Verify the token and extract the payload
		const payload = await this.jwtService.verifyAsync(token);

		const userId = payload.sub;

		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
			include: {
				profile: true, // Include the profile relation
			},
		});

		if (!user) {
			throw new NotFoundException(`User with id ${userId} not found :/...`);
		}

		return { ...user, hashed_password: undefined }; // Exclude password from returned user object
	}

	async logout(id: number, token: string) {
		const user = await prisma.user.findUnique({
			where: {
				id: id,
			},
		});

		if (!user) {
			throw new NotFoundException(`User with id ${id} not found :/...`);
		}

		// In a real application, you would handle token invalidation here.
		// For example, by maintaining a token blacklist or changing a token version in the database.

		return `User with id ${id} has been logged out (token invalidation not implemented).`;
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	async remove(id: number) {
		// Supprimer d'abord le profil lié (s'il existe)
		await prisma.profile.deleteMany({
			where: {
				userId: id,
			},
		});

		// Ensuite supprimer l'utilisateur
		const deletion = await prisma.user.delete({
			where: {
				id: id,
			},
		});

		return deletion;
	}
}
