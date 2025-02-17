# MiddlewareTemplate

## Getting Started
Follow these steps to set up and run the project:

### 1. Configure the Port
Open `launch.ts` and set the desired port for the application.

### 2. Install Dependencies
Ensure you have all required dependencies installed by running:
```sh
npm install
```

### 3. Build the Project
Compile the project by running:
```sh
npm run build
```

### 4. Run the Application
Start the application with:
```sh
npm run start
```

## Environment Variables
Create a `.env` file inside the `config` directory and add the following variables:

```ini
TOKEN_SECRET=your-secret-token
ISSUER=your-issuer
AUDIENCE=your-audience
MONGODB=your-mongodb-uri
PRODUCTDB=your-productdb-uri
```

Ensure that all necessary environment variables are correctly set before running the application.

## Additional Notes
- Ensure Node.js and npm are installed on your system.
- Modify the `launch.ts` file to adjust settings as needed.
- Check logs for any errors or missing configurations if the application does not start correctly.

For further customization or troubleshooting, refer to the documentation or reach out to the project maintainers.

