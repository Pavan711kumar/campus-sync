# CampusSync AI 🎓

CampusSync AI is a comprehensive, AI-powered college collaboration platform designed to seamlessly connect students, faculty, and administrators. It serves as a centralized hub for all campus activities, ranging from academic collaboration to everyday campus life.

## 🌟 Key Features

### 👨‍🎓 Student Dashboard
- **Collaboration Hub**: Find and request to join academic and commercial projects. AI recommends projects based on your skills and interests.
- **Academic Tracker**: Keep track of your attendance, internal marks, and semester results.
- **Smart Faculty Connect**: Easily schedule appointments with faculty members. AI helps recommend the best faculty for mentorship based on your purpose.
- **Equipment Rental**: Reserve lab equipment and electronic components.
- **Ride Sharing**: Share rides across campus or home to reduce travel costs and carbon footprint.
- **Errands Marketplace**: Post and accept campus errands for rewards.
- **Rental Marketplace**: Find rooms, PGs, laptops, and more.
- **Volunteering & Events**: Discover community service opportunities and earn certificates.
- **Academic Forum**: Ask questions and share knowledge with peers.

### 👨‍🏫 Faculty Dashboard
- **Student Appointments**: Manage incoming meeting requests. Approve or decline them with a click.
- **Faculty Scheduler**: Update your current availability status (Available, In Class, In Meeting, etc.) in real-time.
- **Feedback Analytics**: View detailed analytics and graphs of student feedback to improve teaching methods.
- **Faculty Portfolio**: Showcase your academic achievements, publications, and current courses.

## 🛠️ Technology Stack
- **Frontend**: [Next.js (App Router)](https://nextjs.org/) & React
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/) components
- **Backend/Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore) & Firebase Authentication
- **State Management**: React Context API (`RequestsContext`, `FacultyContext`, `AuthContext`, `ThemeContext`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Firebase Project configured

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Pavan711kumar/campus-sync.git
   cd campus-sync
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Firebase credentials:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   NEXT_PUBLIC_DEMO_MODE=false
   ```
   *(Note: Set `NEXT_PUBLIC_DEMO_MODE=true` to run the app using local dummy data without connecting to Firebase).*

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Recent Updates
- Implemented global state management (`RequestsContext`) for students to track requests (Projects, Equipment, Rides, Errands, Rentals, Appointments, Volunteering).
- Upgraded the Faculty Dashboard to handle dynamic interactivity (`FacultyContext`) for Appointment approvals and Scheduler status updates.
- Ensured 100% type safety and zero linting errors across the Next.js app.

## 📄 License
This project is licensed under the MIT License.
