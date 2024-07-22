# WeTeach

## About

WeTeach is a comprehensive online learning and fun platform. The platform includes features such as user authentication, course progress tracking, chapter completion, and various tools for course creation, editing, publishing, browsing, filtering, and purchasing. Additionally, the project encompasses a "FunZone" for interactive games, implemented as separate microservices and served by an Nginx reverse proxy.

## Features

- **Authentication**: Implemented user authentication using NextAuth.js.
- **Course Management**: Features for course creation, editing, and publishing, including a text editor for course descriptions and drag-and-drop functionality for chapter reordering.
- **Progress Tracking**: Tracks user progress and chapter completion.
- **Course Browsing**: Allows users to browse and filter courses.
- **Purchasing**: Integrated Stripe for secure payment processing.
- **Media Management**: Supports attachments and HLS playback for video content using Mux.
- **Analytics**: Created dashboards and course analytics for publishers.

## FunZone

FunZone is a dedicated section for interactive games, implemented as separate microservices and served by an Nginx reverse proxy. The games included are:

- **Runner Game**
- **Keyboard Drum**
- **Bubble Game**

## Tools & Technologies

- **Microservices Architecture**
- **Docker**: Containerized the application for easy deployment and scalability.
- **Nginx API Gateway**: Managed API routing.
- **Google Cloud Platform**: Hosted the complete project.
- **Next.js**: Used for the frontend framework.
- **NextAuth.js**: Implemented authentication.
- **Typescript**: Used for type safety and code reliability.
- **VanillaJS**: Utilized for game development.
- **Shadcn**: Used for designing and styling the UI.
- **Tailwind CSS**: Applied for utility-first CSS framework.
- **Stripe**: Integrated for payment processing.
- **Mux**: Used for video hosting and HLS playback.
- **Prisma**: Implemented as the ORM for database management.
- **MySQL**: Used as the database.
- **Axios**: Utilized for HTTP client.

## Setup and Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mayankpatidar275/we-teach.git
   cd we-teach
   ```

2. **Environment Setup:**

   - Create a `.env` file and populate it with necessary environment variables.
   - Example:
     ```env
     DATABASE_URL=""
     UPLOADTHING_SECRET=
     UPLOADTHING_APP_ID=
     MUX_TOKEN_ID=
     MUX_TOKEN_SECRET=
     STRIPE_API_KEY=
     NEXT_PUBLIC_APP_URL=
     STRIPE_WEBHOOK_SECRET=
     NEXT_PUBLIC_PUBLISHER_ID=
     NEXT_PUBLIC_PUBLISHER_EMAIL=
     NEXTAUTH_SECRET=
     AUTH_TRUST_HOST=
     NEXTAUTH_URL=
     NEXTAUTH_URL_INTERNAL=
     ```

3. **Docker Setup if you want to containerize teh app (Optional):**

   ```bash
   docker-compose up --build
   ```

4. **Run the application:**
   ```bash
   npm install
   npm run dev
   ```

## Contributing

We welcome contributions! Please fork the repository and create a pull request with your changes.
