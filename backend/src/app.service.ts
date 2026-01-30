import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
	private hellos: string[] = [];

	getHello(): string {
		return "Hello MDFK !";
	}
}
