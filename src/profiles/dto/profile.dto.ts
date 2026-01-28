import {
	IsString,
	IsNumber,
	IsBoolean,
	Length,
	Min,
	Max,
	IsEmail,
} from "class-validator";
import { UUID } from "crypto";

// Rules for ProfileDto validation :
// - username : string, 3-20 characters
// - age : number, min 18, max 100
// - bio : string, optional, max 200 characters

class ProfileDto {
	id?: UUID;

	@IsString()
	@Length(3, 20)
	username: string;

	@IsNumber()
	@Min(18)
	@Max(100)
	age: number;

	@IsEmail() // optional email field with validation
	@Length(0, 100)
	email: string;

	@IsString()
	@Length(8, 50)
	password: string; // optional password field

	@IsString()
	@Length(0, 200)
	bio?: string;

	@IsBoolean()
	vaccinated?: boolean;
}

export { ProfileDto };
