# My NestJS Project

This is a simple NestJS application created as part of a learning exercise.

## =========== Backend ===========

## NestJS Setup

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

## Authentication Module

To work on authentication features, I created a `users` module with its own controller and service. At first (before adding JWT), I implemented a simple user registration and login functionalities, ensuring that passwords are securely hashed before storage.

## Storage

This project is basically made to learn NestJS from scratch. But while I’m at it, I might as well learn to use a well-known ORM properly. So I carefully followed [Prisma’s official documentation](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres) to use it with [PostgreSQL](https://www.postgresql.org/) _(an approach I’ve explored recently)_. Before Prisma, I implemented a Pipe to validate UUID formats in the profile module. However, after introducing Prisma to handle database interactions, I removed this custom validation since Prisma now manages the ID generation with auto-increment.

I set up the database schema, generated the Prisma client, and integrated it into the NestJS services for both profiles and users. This allows for persistent storage of data, moving beyond the initial in-memory implementation.

> I know, i could use [TypeORM](https://typeorm.io/) with NestJS but i wanted to try Prisma this time. It looks pretty straightforward to use and has good documentation.

## Relationships between Profiles and Users

To establish a relationship between profiles and users, I modified the Prisma schema to include a foreign key in the `Profile` model that references the `User` model. This way, each profile is associated with a specific user.

I handled the relationship in the service layer by ensuring that when a user is created, a corresponding profile (with default values) is also created and linked via the foreign key.

> _I needed to pass some Profile DTOs as optional parameters during user creation to facilitate this linkage._

## JWT Integration

After setting up the basic user authentication, I integrated JWT (JSON Web Tokens) to generate tokens upon successful login.

After struggling a bit with the setup, I managed to configure the `JwtModule` in the `UsersModule`, ensuring that the secret key is securely loaded from environment variables using the `ConfigModule`.
_Thanks to AI for this step (shame on me)._

## ========== Frontend ===========

I decided to create a simple frontend using React to interact with the NestJS backend. The frontend allows users to register, log in, and manage their profiles through a user-friendly interface. I set up the React project with necessary components and pages, configured routing, configured Tailwind CSS for styling, and implemented API calls to the NestJS backend for authentication and profile management.

> Note: The Tailwind CSS intellisense didn't work properly at first. After some research, I found out that needed to update `settings.json` file at the root of the frontend project solved the issue for me. ![`settings.json` : property 'className' added](image.png)

## React form handling

For handling forms in the React frontend, I used the `react-hook-form` library. It provides a simple and efficient way to manage form state and validation. I created reusable input components and integrated them with `react-hook-form` to handle user registration and login forms. This setup allows for easy validation and submission of form data to the backend API.

## Helpful Resources
- [A Human’s Guide to Nest JS — 101](https://medium.com/@tejasparmar1826/a-humans-guide-to-nest-js-101-fa0e93a51f63)