// Copy and paste these mutations in the GraphQL playground at http://localhost:4000/graphql

// Sample Post 1
mutation {
  createPost(
    title: "Getting Started with GraphQL"
    content: "GraphQL is a powerful query language for APIs that was developed by Facebook. It provides a more efficient, powerful, and flexible alternative to REST. In this post, we'll explore the basics of GraphQL and how it can improve your API development workflow.

Key benefits of GraphQL:
1. Single endpoint for all operations
2. Clients can request exactly what they need
3. Strong typing system
4. Real-time updates with subscriptions

Let's dive into how to implement GraphQL in your next project!"
    author: "John Doe"
  ) {
    id
    title
    author
  }
}

// Sample Post 2
mutation {
  createPost(
    title: "Building Modern Web Applications with Next.js"
    content: "Next.js has revolutionized the way we build React applications. With its powerful features like server-side rendering, static site generation, and API routes, it's become the go-to framework for many developers.

In this comprehensive guide, we'll cover:
- Setting up a Next.js project
- Understanding the file-based routing system
- Implementing server-side rendering
- Optimizing performance
- Deploying your application

Whether you're a beginner or an experienced developer, Next.js has something to offer for everyone."
    author: "Jane Smith"
  ) {
    id
    title
    author
  }
}

// Sample Post 3
mutation {
  createPost(
    title: "The Power of MongoDB and Mongoose"
    content: "MongoDB is a popular NoSQL database that stores data in flexible, JSON-like documents. When combined with Mongoose, it becomes a powerful tool for building Node.js applications.

In this tutorial, we'll explore:
- Setting up MongoDB
- Creating schemas with Mongoose
- Performing CRUD operations
- Implementing relationships
- Best practices for data modeling

MongoDB's flexibility and Mongoose's schema validation make them a perfect pair for modern web applications."
    author: "Alex Johnson"
  ) {
    id
    title
    author
  }
}

// Sample Post 4
mutation {
  createPost(
    title: "Styling with Tailwind CSS"
    content: "Tailwind CSS is a utility-first CSS framework that has gained immense popularity in the web development community. It allows you to build custom designs without leaving your HTML.

Key features we'll cover:
- Setting up Tailwind CSS
- Understanding utility classes
- Creating responsive designs
- Customizing the configuration
- Best practices for maintainability

Learn how to create beautiful, responsive designs with minimal CSS code using Tailwind CSS."
    author: "Sarah Wilson"
  ) {
    id
    title
    author
  }
}

// Sample Post 5
mutation {
  createPost(
    title: "Full-Stack Development with MERN Stack"
    content: "The MERN stack (MongoDB, Express.js, React, Node.js) is a popular choice for building full-stack JavaScript applications. In this comprehensive guide, we'll explore how to build a complete application using these technologies.

Topics covered:
- Setting up the development environment
- Building a RESTful API with Express
- Creating a React frontend
- Connecting to MongoDB
- Implementing authentication
- Deploying the application

Follow along as we build a real-world application from scratch!"
    author: "Mike Brown"
  ) {
    id
    title
    author
  }
} 