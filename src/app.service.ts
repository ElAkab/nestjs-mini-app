import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
	// todo 1 : Create data container
	// todo 2 : Add methods to manipulate data container (CRUD)
	getHello(): string {
		return "Hello World!";
	}
}
