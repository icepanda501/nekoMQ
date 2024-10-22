![Orange Cat Logo](./assets/nekoMQ.webp)

# 🐈 NekoMQ Message Queue Framework

**NekoMQ** is a lightweight and flexible **Message Queue framework** designed to connect seamlessly with a wide range of databases. Whether you're using **PostgreSQL, MySQL, MongoDB, SQLite, Redis**, or other storage systems, NekoMQ ensures reliable message delivery and smooth integration.

This project is built as a **Node.js library**, making it easy to integrate into modern JavaScript/TypeScript applications.

## ✨ Features

- 📦 **Database-Agnostic**: Supports popular databases like PostgreSQL, MySQL, MongoDB, SQLite, Redis, and more.
- ⚡ **Lightweight & Fast**: Minimal overhead for high performance in any environment.
- 🔌 **Flexible Integration**: Easy to set up and configure in Node.js applications.
- 🔄 **Message Reliability**: Ensures message delivery and ordering across systems.
- 🔧 **Open Source**: Designed for the community with a focus on transparency and collaboration.

## 🚀 Getting Started

```bash
npm install neko-mq
```

## Basic Usage:

```javascript
const NekoMQ = require("neko-mq");

const queue = new NekoMQ({
  database: "postgresql", // Choose your DB (mysql, mongodb, redis, etc.)
  connectionString: "your-database-connection-string",
});

queue.send("my-queue", { message: "Hello from NekoMQ!" });
```

📚 Documentation
Explore the full documentation to learn more about setup, configuration, and advanced features.

# My Open Source Message Queue System

Welcome to the Message Queue System! This open-source project

# FOR CONTRIBUTOR

We are going to create Message Queue library base on PostGreSQL, MongoDB, MySQL and others database.

Now we just start Repository and find idea to make it happen, If you have some idea you can disscusion with us on Github Issues in this repo.

Thank you.

# Milestone

- [ ] Milestone 1: PostgreSQL Support
