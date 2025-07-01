# **Testing Requirements**

All implementations must include thorough testing using Postman to ensure the quality and reliability of the APIs. The testing requirements are designed to cover all endpoints with both positive and negative scenarios, ensuring comprehensive coverage.

## **General Guidelines**

- **Use Postman Collections:** Organize your tests within Postman collections, categorizing them based on functionality (e.g., Authentication, Movies, Actors, Ratings).
- **Environment Variables:** Utilize Postman's environment variables to manage dynamic data such as JWT tokens and IDs. Avoid hardcoding sensitive information.
- **Random Data Generation:** Implement pre-request scripts to generate unique and random data for each test run, ensuring tests do not depend on existing database states.

## **Testing for REST APIs**

### **Postman Collection Structure**

- **Minimum:** **20 test cases**
  - **Endpoints to Test:** 
    - `POST /users/register`
    - `POST /users/login`
    - `GET /movies`
    - `GET /movies/{id}`
    - `POST /movies`
    - `PUT /movies/{id}`
    - `DELETE /movies/{id}`
    - `GET /movies/{id}/ratings`
    - `GET /actors`
    - `GET /ratings`

### **Test Cases Coverage**

For each REST endpoint, implement the following test cases:

#### **1. User Authentication Endpoints**

- **POST /users/register**
  - **Success:** Register a new user with valid data.
  - **Failure:** Attempt to register with an already existing email or missing required fields.

- **POST /users/login**
  - **Success:** Authenticate a user with valid credentials and obtain a JWT token.
  - **Failure:** Attempt to login with invalid credentials.

#### **2. Movie Endpoints**

- **GET /movies**
  - **Success:** Retrieve a list of all movies.
  - **Failure:** Retrieve movies with invalid query parameters.

- **GET /movies/{id}**
  - **Success:** Retrieve a specific movie by ID.
  - **Failure:** Retrieve a movie with a non-existent ID (404).

- **POST /movies** (**Requires authentication**)
  - **Success:** Add a new movie with valid data and authentication.
  - **Failure:** Add a new movie without authentication (401) or with invalid data (400).

- **PUT /movies/{id}** (**Requires authentication**)
  - **Success:** Update an existing movie with valid data and authentication.
  - **Failure:** Update a movie without authentication (401) or with invalid data (400).

- **DELETE /movies/{id}** (**Requires authentication**)
  - **Success:** Delete an existing movie with authentication.
  - **Failure:** Delete a movie without authentication (401) or with a non-existent ID (404).

- **GET /movies/{id}/ratings**
  - **Success:** Retrieve ratings for a specific movie.
  - **Failure:** Retrieve ratings for a non-existent movie (404).

#### **3. Actor and Rating Endpoints**

- **GET /actors**
  - **Success:** Retrieve all actors.
  - **Failure:** Retrieve actors with invalid query parameters (if applicable).

- **GET /ratings**
  - **Success:** Retrieve all ratings.
  - **Failure:** Retrieve ratings with invalid query parameters (if applicable).

### **Test Case Structure**

Each test case within the Postman collection **SHOULD** include:

- **Pre-request Scripts or Setup:**
  - **Random Data Generation:** Use Postman's scripting capabilities to generate unique and random data for each test run to avoid dependency on the database state.
    - Example: Generate unique email addresses for user registration.
    - Example: Use random strings or UUIDs for movie titles.
  - **Environment Variables:** Store temporary data such as JWT tokens using Postman's environment variables to ensure secure and isolated test executions.

- **Assertions:**
  - **Status Codes:** Verify response status codes (e.g., 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found).
  - **Headers:** Validate response headers (e.g., `Content-Type: application/json`).
  - **Body Content:** Check response body for correctness and completeness (e.g., required fields are present and correctly formatted).

- **Sequence Tests:**
  - Perform a series of requests where the output of one request is used in another (e.g., register a user, login to obtain a JWT token, add a movie using the token, retrieve the movie, update it, and then delete it).

- **Security Considerations:**
  - **Secure Storage:** Ensure that JWT tokens and passwords are handled securely within Postman by using environment variables and avoiding hardcoding them within test scripts or requests.