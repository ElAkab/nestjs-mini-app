# My NestJS Project

This is a simple NestJS application created as part of a learning exercise.

## Configuration

I could clone the official starter repository from NestJS to learn it but I want to build it from scratch to understand better how it works.

So i followed [some steps](https://dev.to/micalevisk/5-steps-to-create-a-bare-minimum-nestjs-app-from-scratch-5c3b)

## Issues that I faced

- When I created the `AppService` class, I forgot to add the `@Injectable()` decorator, which caused NestJS to throw an error when trying to inject the service into the controller. Adding the decorator resolved the issue.
- In the `AppModule`, I initially forgot to include the `AppController` in the `controllers` array. This oversight led to a 404 error when trying to access the root route. Adding the controller to the module fixed the problem ([thanks to Google](https://www.google.com)).

> - To configure the tsconfig.json file (_that is scaring me a bit_), I used **_AI_** to help me set it up correctly for a NestJS project. _BUT_ it generated some wrong settings. Like **"target": "ES2024"** that is not supported by NodeJS yet (for me). I had to change it to **"target": "ES2020"** to make it work.

I got the app running successfully after fixing these issues !

## CRUD Features Added

After the initial setup, I implemented a basic in-memory CRUD system for user profiles. Here’s a quick rundown of the features and some gotchas I encountered:

### Profile Model & Validation

- Created a `ProfileDto` class with validation decorators using `class-validator`.
- Added rules for username (3-20 chars), age (18-100), and an optional bio (max 200 chars).
- Used UUIDs for profile IDs, generated server-side.

### Service Layer

- Built an `AppService` with methods to create, read, update, and delete profiles.
- Ensured that the `id` field is always generated and never overwritten during updates (important for data integrity).
- Used exceptions (`NotFoundException`, `HttpException`) for error handling (i'm know there is more to learn here).

### Controller Layer

- Set up RESTful endpoints for all CRUD operations under `/profiles`.
- Used `@Body()` and `@Param()` decorators for proper request handling and validation.
- For updates, switched to a dedicated `UpdateProfileDto` (using `PartialType`) so PATCH/PUT requests can update only the fields you want—no more validation errors on partial updates!

### cURL Commands

I could test the CRUD operations using a `requests.rest` file but i wanted to practice cURL commands in the terminal as well. I created a folder named `crud-operations-commands` with the appropriate commands.

I also left some comments in the files to explain what each part does.

## Restructuring architecture

After completing the CRUD features, I decided to restructure the project architecture to follow best practices and improve maintainability. To achieve this, I simply nested my profile-related files into a dedicated `profiles` module. Then, i replaced all the `App` default files (from the initial setup) into the root of `src` folder.

After that, I needed to :

- Rename some classes and files to reflect their new purpose
- Update imports paths accordingly
- Update the `profiles.module.ts` to include the controller and service
- Finally, update the `app.module.ts` to import the `ProfilesModule` (at this point, i quickly realized the potential of modules in NestJS for organizing code)

This restructuring not only made the codebase cleaner but also set a solid foundation for future scalability as more features are added.
