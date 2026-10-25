# Jazmin Barrionuevo - Personal Portfolio

## 🌐 Live Website

Visit my portfolio at [www.jazminbarrionuevo.tech](https://www.jazminbarrionuevo.com)

## To Do

- [] add option to create a link in the editor
- [] links to github per project?
- []

## 📝 Overview

This repository contains the source code for my personal portfolio website. The website showcases my skills, projects, and professional experiences as a software developer with a focus on frontend development and artificial intelligence.

## Database and media setup

Use `.env.example` as a guide when editing your existing `.env`. Keep `.env` out of Git.

- `DATABASE_URL`: Neon's pooled PostgreSQL URL (the hostname includes `-pooler`). The running app uses this connection.
- `DIRECT_URL`: the same Neon database's direct URL (without `-pooler`). Prisma migrations use this connection.
- `CLOUDINARY_URL`: the Cloudinary product environment's `cloudinary://` URL. Alternatively, set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.
- `ADMIN_PASSWORD` and `JWT_SECRET`: admin login credentials; choose new values for a new deployment.

For a pooled Neon URL, get the matching direct URL from the Neon dashboard (or remove `-pooler` from the hostname while leaving the database, credentials, and SSL options unchanged). If the URL you already have is direct, use it for `DIRECT_URL` and get its pooled counterpart for `DATABASE_URL`. Do not point either URL at the retired VPS.

After configuring a **new, empty** Neon database, run `npx prisma migrate deploy` to create the tables, then `npm run dev`. Existing migrations recreate the structure; they do not restore old rows. Do not run `prisma migrate reset` against a database containing data.

New admin image and video uploads go to the `portfolio-jami` asset folder in Cloudinary. The uploader returns HTTPS URLs, which the blog editor stores in PostgreSQL. New Cloudinary accounts use dynamic folders; if your product environment uses legacy fixed folders, set `CLOUDINARY_FOLDER_MODE="fixed"`. The current server action accepts files up to 100 MB; the hosting platform may enforce a lower request size, especially for videos.

### What can be recovered from this repository

The committed `public/` directory contains static portfolio images and videos, and the project pages contain their text. Prisma's schema and migrations describe the old `posts`, `tags`, `categories`, and `settings` tables, but contain no records. Blog article bodies were stored in `posts.contentJson`, `contentHtml`, and `contentText`; their cover image URLs were stored in `image` and `featuredImage`, while embedded media URLs were inside the article content. New uploads use Cloudinary; unrecovered legacy images have been removed from rendered pages.

Old database dumps, host backups, or private media copies may still contain missing content. Git history contains an older `public/game.jpg`. If the old database is recoverable, restore it into Neon and move any recovered media to Cloudinary before updating their saved URLs.

## 🧰 Tech Stack

This portfolio was built with:

- **Frontend Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **TypeScript**: For type safety
- **Database**: Neon PostgreSQL with Prisma
- **Media**: Cloudinary uploads and local static assets

## 🏗️ Project Structure

The portfolio consists of several key sections:

- **About Me**: Brief introduction about myself as a software developer
- **Projects**: Showcase of my work categorized by type
- **Skills**: Technical skills organized by domain
- **Work Experience**: Overview of my professional journey

## 🚀 Features

- Responsive design that works on all devices
- Project filtering by category (Web Development, Data Science, Computer Vision, etc.)
- Detailed project pages with descriptions, technologies used, and links
- Clean and modern UI with custom animations

## 🗂️ Project Categories

My portfolio showcases projects in various domains including:

- **Web Development**: Websites, web applications, and QR menu systems
- **Computer Vision**: Sign language detection, handwritten recognition
- **Deep Learning**: Generative Adversarial Networks
- **Data Science**: Data analysis and visualization projects
- **NLP**: Chatbots for various applications

## 🛠️ Technical Skills

My expertise spans across:

- **Programming Languages**: JavaScript, TypeScript, Python, Bash
- **Web Development**: React, Next.js, Node.js, HTML, SCSS, Tailwind CSS
- **AI & Machine Learning**: TensorFlow, OpenCV, Scikit-learn, NumPy, Matplotlib
- **Databases**: MySQL, PostgreSQL, SQL Server
- **DevOps**: Docker, Kubernetes, AWS
- **Project Management**: SCRUM, Jira
- **Testing**: Pytest

## 📱 Contact

Feel free to reach out to me through:

- [GitHub](https://github.com/Jazbarrionuev0)
- [LinkedIn](https://www.linkedin.com/in/jazmin-barrionuevo)
- Website: [www.jazminbarrionuevo.tech](https://www.jazminbarrionuevo.tech)

## 📄 License

This project is open source and available under the MIT License.
