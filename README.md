# NEETBuddy Platform

NEETBuddy is an enterprise-grade NEET preparation and practice platform inspired by Trackprep, featuring rich student telemetry, AI/algorithmic mistake notebooks (Improvement Book), full-length NTA-style mock exam engines, autonomous PDF question ingestion pipeline, and Supabase cloud synchronization.

## 🚀 Key Features

- **NTA-Style Test Engine**: Real exam simulation with timer, question grid navigation, review status markers, and instant post-test analytics.
- **Improvement Book & Mistake Tracker**: Automated tracking of incorrect or flagged questions with step-by-step solutions and concept revision.
- **Autonomous PDF Ingestion Pipeline**: Ingest PDF question papers, parse questions, options, and explanations into canonical JSON database format.
- **Student Performance Analytics**: Real-time subject-wise and topic-wise accuracy, speed analysis, and score projections.
- **Supabase Cloud Sync Ready**: Built-in adapter for cloud persistence and multi-device synchronization.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, Multer, `pdf-parse`
- **Frontend**: Vanilla JavaScript (ES6+), Modern Modular CSS, HTML5
- **Database / Storage**: Canonical local JSON repository (`db.js`) + Supabase Cloud Client integration

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/toolifyx9-oss/NeetBuddy.git
   cd NeetBuddy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```
   For development mode with live watch:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:4000
   ```

## 📄 License

ISC License.
