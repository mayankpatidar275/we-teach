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

## Project Screenshots

Here are some screenshots showcasing different features of the WeTeach platform:

### Browse

![Browse](public/demo-assets/browse.png)

### Course Setup

![Course Setup](public/demo-assets/course-setup.png)

### Courses

![Courses](public/demo-assets/courses.png)

### Dashboard

![Dashboard](public/demo-assets/dashboard.png)

### Chapters

![Chapters](public/demo-assets/chapters.png)

### Analytics

![Analytics](public/demo-assets/analytics.png)

### Fun Zone

![Fun Zone](public/demo-assets/fun-zone.png)

### Runner Game

![Runner Game](public/demo-assets/runner-game.png)

### Stripe Payment

![Stripe Payment](public/demo-assets/stripe-payment.png)

### Authentication

![Stripe Payment](public/demo-assets/login.png)

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
     NEXT_PUBLIC_PLATFORM=vps
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

## Build and Push Docker Images

1. **Build the images:**

   ```bash
   docker compose build
   ```

2. **Tag and push the we-teach_we-teach image:**

   ```bash
   docker tag we-teach_we-teach:latest mkpatidar/we-teach:latest
   docker push mkpatidar/we-teach:latest
   ```

3. **Tag and push the we-teach_keyboard-drum image:**

   ```bash
   docker tag we-teach_keyboard-drum:latest mkpatidar/keyboard-drum:latest
   docker push mkpatidar/keyboard-drum:latest
   ```

4. **Tag and push the we-teach_bubble-game image:**

   ```bash
   docker tag we-teach_bubble-game:latest mkpatidar/bubble-game:latest
   docker push mkpatidar/bubble-game:latest
   ```

5. **Tag and push the we-teach_runner-game image:**

   ```bash
   docker tag we-teach_runner-game:latest mkpatidar/runner-game:latest
   docker push mkpatidar/runner-game:latest
   ```

6. **Tag and push the we-teach_api-gateway image:**
   ```bash
   docker tag we-teach_api-gateway:latest mkpatidar/api-gateway:latest
   docker push mkpatidar/api-gateway:latest
   ```

## Contributing

We welcome contributions! Please fork the repository and create a pull request with your changes.
