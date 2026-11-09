# myschoolproject

## COS 106: Introduction to Web Technologies &mdash; Practical Term Project (20 Marks)
### Project Title: Responsive Student Academic Portfolio & Management Platform

**Student Information:**
- **Full Name:** MAHMUD BASHIR OLASUNKANMI
- **Matriculation Number:** 2025/C/CYB/1339
- **Student ID:** 301895886
- **Department:** Department of Cybersecurity
- **Faculty:** School of Computing and Applied Sciences
- **Institution:** MIVA Open University, Abuja, Nigeria
- **Email:** `m.bashir5886@miva.edu.ng`
- **Phone:** `+234 807 241 0373`
- **Grade Target:** 20 / 20 Marks

---

## 🌟 Project Overview
This project is a multi-page, responsive academic portfolio and interactive student management system engineered using pure **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6+)**. The design strictly adheres to the official color palette and branding of the **MIVA Open University Student Portal** (Primary Navy: `#0F2C59`, Crimson Red: `#C0262D`, Crisp White: `#FFFFFF`).

---

## 📂 Multi-Page Architecture

1. **Homepage (`index.html`)**:
   - Official portrait photograph of student (`assets/images/mahmud-profile.jpg`)
   - Welcome message and student academic identity
   - Responsive sticky navigation bar with mobile hamburger drawer and Dark/Light mode switcher
   - Brief professional biography highlighting cybersecurity passion
   - Academic KPI highlights: Target GPA 4.85/5.00, Enrolled Status, Registered 100L courses
   - Featured projects teaser cards and quick links

2. **About Me Page (`about.html`)**:
   - Detailed educational background at MIVA Open University
   - **Semantic Coursework `<table>`** listing all registered 100-Level 1st Semester courses (COS 106, CYB 101, COS 101, MTH 101, PHY 101, GST 101, GST 103) with credit units, course classification, and target grades
   - 3-Phase Career Aspirations Roadmap (Ethical Hacking & Cloud Security Architecture)
   - Categorized technical skills with animated progress bars (Web Development, Cybersecurity, Programming)
   - Extracurricular hobbies (CTFs, Mobile Flutter Design, Chess, Football)
   - **Multimedia Requirement:** Embedded `<audio controls>` voice note introduction (`assets/media/intro-audio.wav`) and responsive `<video controls>` presentation clip (`assets/media/demo-video.mp4`)

3. **Projects Page (`projects.html`)**:
   - 4 Applied computing and cybersecurity projects:
     1. *Terra Mobile Authentication & Security Portal* (Flutter & Dart with real mobile UI screenshot)
     2. *Network Vulnerability Scanner & Port Auditor* (Python socket programming)
     3. *COS 106 Student Portfolio & Planner* (Semantic HTML5, CSS Grid/Flexbox, JavaScript)
     4. *Phishing Threat Simulator & Awareness Lab* (Heuristic threat detection)
   - Dynamic category filter buttons (*All*, *Cybersecurity*, *Mobile Applications*, *Web Development*)
   - Interactive modal simulation showcasing live console logs and execution specs

4. **Academic Planner Page (`planner.html`)**:
   - Fully interactive task management system implemented in vanilla JavaScript
   - Dynamic Add Task form (Task Title, Course Code dropdown, Due Date picker, Priority selector)
   - Mark tasks completed / toggle status with dynamic strike-through styling
   - Delete task functionality with confirmation
   - Filter tabs (*All*, *Pending*, *Completed*)
   - Real-time task metrics (Total Scheduled, Completed, Pending Deadlines, and Dynamic Progress Bar)
   - `localStorage` persistence: Tasks remain saved even after refreshing or closing the browser!
   - Reset sample tasks button for instant testing

5. **Contact Page (`contact.html`)**:
   - Official student contact channels card (Abuja Campus, Email, Phone, Office Hours)
   - Form with Full Name, Email Address, Phone Number, and Message
   - **Strict Client-side JavaScript Validation:**
     - Checks that no field is empty
     - Validates email format using standard RFC regular expression
     - Strictly enforces that phone numbers contain **only digits** (`/^[0-9]+$/`)
   - Animated submission confirmation modal

6. **Assessment PDF Report (`report.html`)**:
   - Ready-to-print academic submission document formatted for A4 PDF export
   - Contains student metadata, compliance matrix, architecture, and code listings

---

## 🚀 How to Run Locally

1. Open the project folder `CSC 106` in your code editor or file manager.
2. Double-click `index.html` to open it in any modern browser (Google Chrome, Microsoft Edge, Firefox, or Safari).
3. No build tools or installations are required—everything runs natively!

---

## 🌐 How to Host on GitHub Pages (Free)

1. Create a new repository on your GitHub account (e.g., `cos106-portfolio`).
2. Open terminal in `c:\Users\HP\Desktop\CSC 106` and run:
   ```bash
   git init
   git add .
   git commit -m "COS 106 Term Project - Mahmud Bashir Olasunkanmi"
   git branch -M main
   git remote add origin https://github.com/<your-username>/cos106-portfolio.git
   git push -u origin main
   ```
3. On GitHub, navigate to **Settings** &rarr; **Pages**.
4. Under **Branch**, select `main` and `/root`, then click **Save**.
5. Your website will be live in 60 seconds at:  
   `https://<your-username>.github.io/cos106-portfolio/`

---

## ⚡ How to Host on Render (Free Static Site)

1. Log in to [dashboard.render.com](https://dashboard.render.com/).
2. Click **New +** &rarr; select **Static Site**.
3. Connect your GitHub repository: `Muhamzy-ui/myschoolproject`.
4. Configure the settings (or let Render auto-detect `render.yaml`):
   - **Name:** `myschoolproject` (or any custom name)
   - **Branch:** `main`
   - **Build Command:** *(leave blank)*
   - **Publish Directory:** `.` *(or leave blank)*
5. Click **Create Static Site**.
6. Render deploys your site in under 30 seconds with a free SSL certificate:  
   `https://myschoolproject.onrender.com`

---

## 📄 How to Export Submission PDF for LMS

1. Open `report.html` in your browser.
2. Press `Ctrl + P` (or `Cmd + P` on Mac).
3. Select **Destination: Save as PDF**.
4. Set **Margins: Default** and enable **Background graphics**.
5. Click **Save** to generate the PDF file for submission on the MIVA LMS portal.
