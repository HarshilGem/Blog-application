# Blog Project

A full-stack blog application with a Next.js frontend and a Node.js/Express/GraphQL/MongoDB backend. Users can view blog posts, and admins can create, upload images, and delete posts.

---

## Features
- Modern Next.js frontend with Tailwind CSS
- GraphQL API backend with Express and MongoDB
- Image upload and display for blog posts
- Admin page for creating and deleting posts
- Responsive and attractive UI

---

## Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn]
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/your-blog-repo.git
cd your-blog-repo
```

### 2. Install Dependencies
#### Backend
```bash
cd blog-app/backend
npm install
```
#### Frontend
```bash
cd ../frontend
npm install
```

---

### 3. Set Up Environment Variables
#### Backend
Create a `.env` file in `blog-app/backend`:
```
MONGODB_URI=mongodb://localhost:27017/blog-app
PORT=4000
```

#### Frontend
Create a `.env.local` file in `blog-app/frontend`:
```
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_GRAPHQL_URI=http://localhost:4000/graphql
```

---

### 4. Run the Application
#### Start MongoDB
Make sure your MongoDB server is running locally or update the URI for Atlas.

#### Start Backend
```bash
cd blog-app/backend
npm run dev
```

#### Start Frontend
Open a new terminal:
```bash
cd blog-app/frontend
npm run dev
```

- Backend: [http://localhost:4000/graphql](http://localhost:4000/graphql)
- Frontend: [http://localhost:3000](http://localhost:3000)

---

## Usage
- Visit the home page to view all blog posts.
- Click "Read More" to view post details.
- Click "Admin" in the navbar or the call-to-action button to access the admin page.
- On the admin page, you can:
  - Create a new post (with image upload)
  - Delete existing posts

---

## Folder Structure
```
blog-app/
  backend/      # Express/GraphQL/MongoDB backend
  frontend/     # Next.js frontend
```

---

## Notes
- Uploaded images are stored in `frontend/public/uploads` and served by the backend.
- Dates are stored in `YYYY-MM-DD` format as strings.
- You can customize styles using Tailwind CSS.

---

## Troubleshooting
- If you see CORS or network errors, check that both servers are running and environment variables are correct.
- If images do not display, ensure the backend is serving `/uploads` and the image path is correct.
- For any database issues, check your MongoDB connection string and server status.

---

## License
MIT 