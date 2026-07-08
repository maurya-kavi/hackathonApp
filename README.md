# 🏆 Hackathon Project: Accessible Government Procedures & Legal Guidance

A comprehensive full-stack platform built to simplify and provide accessible guidance for government procedures and legal queries. The application utilizes a modular architecture, combining a React/Express core with an AI-driven Python document processing pipeline.

## 🚀 Project Overview

This repository contains the source code for our hackathon submission. It is divided into three main operational services:
* A responsive **Frontend** built with React.
* A robust **Server** backend built with Express.js.
* A dedicated **Python Service** handling document processing, background jobs via Inngest, and vector storage via Qdrant.

## 📁 Repository Structure

| Directory | Description | Tech Stack |
| :--- | :--- | :--- |
| **`/frontend`** | Client-side user interface and state management. | React, JavaScript, CSS |
| **`/server`** | Core backend API, routing, and business logic. | Node.js, Express.js |
| **`/python-service`**| Dedicated pipeline for processing documents and managing AI/vector search functionalities. | Python, Inngest, Qdrant |

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed on your machine:
* [Node.js](https://nodejs.org/) (v16 or higher)
* npm or yarn
* [Python 3.8+](https://www.python.org/)
* Access to a Qdrant instance (local or cloud)

## 💻 Local Setup & Installation

Since this project utilizes multiple services, you will need to set up and run each environment separately. 

### 1. Backend Server
Navigate to the server directory, install dependencies, and start the API:
```bash
cd server
npm install
# Set up your environment variables based on the required configuration
npm start
