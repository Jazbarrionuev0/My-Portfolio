# Portfolio content recovery inventory

This repository contains public project content independently of the old database. The static project pages are the source of truth for their write-ups; `src/utils/projects.ts` provides the homepage card metadata. The homepage now displays these cards alongside any published Neon posts, without inserting inferred records into Neon. The years below are displayed on the pages; categories come from the existing card metadata or, for Face Recognition and Crossword Puzzle, the project content. They are not verified copies of old database fields.

## Recovered from source

| Project route | Year | Category | Recoverable content |
| --- | --- | --- | --- |
| `/projects/GAN` | 2024 | Deep Learning | Write-up, reading-time label, code/figures, local images |
| `/projects/restaurant-managament` | 2024 | Web Development | Write-up, reading-time label, local images |
| `/projects/face-recognition` | 2024 | Computer vision | Write-up, reading-time label, code, GitHub link; no usable local cover |
| `/projects/crossword-puzzle` | 2023 | Web Development | Write-up, screenshots; no reading-time label |
| `/projects/snake-game` | 2024 | Computer vision | Write-up, reading-time label, screenshots; an unused test video is recoverable from Git history |
| `/projects/handwritten-recognition` | 2024 | Computer vision | Write-up, reading-time label, local images |
| `/projects/algorithm` | 2023 | Other | Detailed write-up, reading-time label, code, links |
| `/projects/bash-scripts-menu` | 2022 | Other | Detailed write-up, reading-time label, code, GitHub link |
| `/projects/QR-menu` | 2022 | Web Development | Short write-up, reading-time label, GIF and screenshots |
| `/projects/data-analysis` | 2022 | Data science | Detailed write-up, reading-time label, code, charts, links |
| `/projects/multimodal-chat` | 2025 | NLP | Write-up, reading-time label, videos, cover image, links |

The routes `/projects/chatbots`, `/projects/whispering-tales`, `/projects/Celebrity-classifier`, `/projects/Movies-subgenre`, and `/projects/sign-detection` contain only sparse placeholders. They are not promoted as complete homepage cards. Some commented-out card descriptions in `src/utils/projects.ts` provide clues, but not a full write-up.

## Not recoverable from the schema or current source

The exact old `posts`, `categories`, `tags`, and `user_settings` rows are not present in this repository. In particular, do not infer old row IDs, publication timestamps, draft status, view counts, featured flags, or original Tiptap JSON from the static pages. Do not assume the static project pages were ever identical to database posts.

Before creating replacement Neon records, check for a VPS disk snapshot, Postgres dump, provider backup, or old deployment export. If none exists, use the static pages as the published project content and create new database posts only for content that needs the blog editor. Keep local media under `public/`; Cloudinary is configured for new uploads and is not required for these existing assets.
