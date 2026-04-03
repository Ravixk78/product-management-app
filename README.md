# Product Management App

A professional web application designed to manage a product catalog efficiently. This tool allows users to track inventory with a clean and modern user interface, providing a streamlined experience for core management tasks.

### Tech Stack

- Framework: Next.js (App Router)
- Library: React
- Styling: Tailwind CSS
- Persistence: Browser localStorage

### Features

- Add products with name, price, description, and image URL
- View a responsive grid of all stored products
- Search and filter products by name or description
- Edit existing product details with real-time updates
- Delete products from the inventory catalog

### Getting Started

To run this project locally, follow these steps:

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000 in your browser to view the application.

### Project Structure (Brief)

- app: Contains the main page, global styles, and layout configuration.
- components: Reusable UI elements including the product form, list, and individual cards.
- utils: Helper functions for managing data persistence within the browser storage.

### Assumptions and Improvements

- Technical Assumption: All data is stored in the browser's localStorage for simplicity and immediate persistence without a backend.
- Limitation: No external backend or database is used, meaning data is local to the specific browser and device.
- Future Improvements:
  - Integration with a persistent database (e.g., PostgreSQL or MongoDB)
  - Implementation of a REST or GraphQL API
  - User authentication and role-based access control
  - Advanced image upload support instead of URL-only links

### Author

[Dev_By<Ravindu>]