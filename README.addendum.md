## CRUD Features Added

After the initial setup, I implemented a basic in-memory CRUD system for user profiles. Here’s a quick rundown of the features and some gotchas I encountered:

### Profile Model & Validation
- Created a `ProfileDto` class with validation decorators using `class-validator`.
- Added rules for username (3-20 chars), age (18-100), and an optional bio (max 200 chars).
- Used UUIDs for profile IDs, generated server-side.

### Service Layer
- Built an `AppService` with methods to create, read, update, and delete profiles.
- Ensured that the `id` field is always generated and never overwritten during updates (important for data integrity!).
- Used exceptions (`NotFoundException`, `HttpException`) for error handling.

### Controller Layer
- Set up RESTful endpoints for all CRUD operations under `/profiles`.
- Used `@Body()` and `@Param()` decorators for proper request handling and validation.
- For updates, switched to a dedicated `UpdateProfileDto` (using `PartialType`) so PATCH/PUT requests can update only the fields you want—no more validation errors on partial updates!

### Example cURL Commands

```bash
# Create a profile
curl -X POST http://localhost:3000/profiles \
  -H "Content-Type: application/json" \
  -d '{"username":"Garry","age":28,"bio":"Adventurer from Wonderland"}'

# Update a profile (partial update supported)
curl -X PUT http://localhost:3000/profiles/<id> \
  -H "Content-Type: application/json" \
  -d '{"username":"Jonny"}'

# Delete a profile
curl -X DELETE http://localhost:3000/profiles/<id>
```

### Lessons Learned
- Always use the correct route prefix (e.g., `/profiles/:id`), or you’ll get a 404.
- For partial updates, use a dedicated DTO with `PartialType`—it saves a lot of debugging time.
- Never trust the client to set IDs; always generate them server-side.

I’m getting more comfortable with NestJS’s structure and validation system. Next up: maybe persistence with a real database?
