# Flat Sharing Application

## Live Site

You can visit the live site [here](https://flat-sharing-application-client.vercel.app/).

## Description

A web application to facilitate flat sharing, allowing users to post, search, and request to share flats.

## Requirements

- Node.js
- PostgreSQL
- Prisma

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/NS-Sheam/flat-sharing-app-client-next-js.git
   cd flat-sharing-application-client
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the root directory and add the following:

   ```env
   NEXT_PUBLIC_IMAGE_HOSTING_URL=https://api.imgbb.com/1/upload?key=your_api_key
   NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
   ```

4. **Set Up the Database:**
   Ensure PostgreSQL is running and run the Prisma migrations:

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Generate Prisma Client:**

   ```bash
   npx prisma generate
   ```

6. **Run the Development Server:**

   ```bash
   npm run dev
   ```

7. **Open the Application:**
   Navigate to `http://localhost:3000` in your web browser.

## Folder Structure

## Features

- **Home Page:** Contains a hero section, search bar, flat lists, testimonials, tips, and footer.
- **Authentication:** Login and Registration forms.
- **User Profile:** Allows users to view and edit their profile, change password, view their flat posts, and requests.
- **Post Flat:** Form for users to share their flats.
- **Flat Details:** Detailed information about each flat.
- **Flat Share Request:** Form for requesting to share a flat.
- **Admin Dashboard:** Manage users and flats.
- **User Dashboard:** Manage and Edit flats.

# Technologies Used

- Next.js
- React
- Redux
- React Hook Form
- Zod
- Axios
- JWT Decode
- Material-UI
- Tailwind CSS
- Sonner
- TypeScript
