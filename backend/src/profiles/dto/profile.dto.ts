import {
	IsString,
	IsNumber,
	IsBoolean,
	Length,
	Min,
	Max,
	IsOptional,
} from "class-validator";

// ProfileDto : infos publiques ou personnalisées de l'utilisateur
export class ProfileDto {
	// @IsOptional()
	// @IsString()
	// id?: string;

	// @IsString()
	// userId!: string; // référence vers l'utilisateur (clé étrangère)

	@IsString()
	@Length(3, 20)
	username!: string;

	@IsNumber()
	@Min(18)
	@Max(100)
	age?: number;

	@IsString()
	@Length(0, 200)
	@IsOptional()
	bio?: string;

	@IsBoolean()
	@IsOptional()
	vaccinated?: boolean;

	@IsNumber()
	userId!: number;
}
