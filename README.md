# Products Solution

This solution consists of a frontend Angular application and a backend Node.js Express service.

## Running with Docker (Recommended)

The preferable way to run the solution is using Docker:

1. Ensure Docker are installed on current machine.
2. Navigate to the root directory of current project where the `docker-compose.yml` file is located.
3. **Run the command**:
   ```sh
   docker-compose up --build
   ```
4. This will build and start both the frontend and backend services.

5. Open the browser and navigate to `http://localhost:4200` to access the whole solution.

## Important Notes

- If the API version from the source has been changed, please increase the api version values,
- such as PRODUCT_DETAILS_API_VERSION and PRODUCTS_API_VERSION in backend/.env.

## Manual Setup

If Docker is not an option, we can manually run the frontend and backend services:

### Running the Backend

1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm start
   ```
4. The backend server should now be running on `http://localhost:3000`.

### Running the Frontend

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Angular application:
   ```sh
   ng serve
   ```
4. Open the browser and navigate to `http://localhost:4200` to access the frontend application.

## Requirements

- **Node.js**: Ensure current machine has Node.js installed (version 12.20.0 for Angular v13 or higher).
