# Live Crowds 🇱🇰

**Check the crowd before you visit. Make every journey better.**

Live Crowds is a responsive web application for exploring crowd levels at popular tourist destinations across Sri Lanka. Visitors can view estimated crowd information, check in with their group when they arrive, and check out when they leave.

<p align="center">
  <a href="https://livecrowds.vercel.app/"><strong>🌐 View Live Demo</strong></a>
  ·
  <a href="https://github.com/janinduAlWis/Live-Crowds"><strong>💻 Source Code</strong></a>
</p>

---

## ✨ Features

- **Explore Destinations** – Browse 13 Sri Lankan destinations grouped into Popular, Nature, and Beaches categories.
- **Crowd-Level Indicators** – View estimated visitor counts, location capacity, and visual crowd status.
- **Group Check-In** – Check in individually or enter the number of people in your group.
- **Check-Out Tracking** – Check out from a destination to update its displayed visitor count.
- **Automatic Check-Out** – Active check-in sessions expire automatically after two hours.
- **Session Persistence** – Crowd data and active check-in sessions are saved using browser Local Storage.
- **Light and Dark Themes** – Switch between light and dark appearance.
- **Responsive Interface** – Browse destination cards on different screen sizes.

## 🗺️ Destinations

| Category | Example Destinations |
|---|---|
| Popular | Sigiriya, Galle Fort, Ella, Temple of the Sacred Tooth Relic, Yala National Park |
| Nature | Ella Rock, Little Adam's Peak, Horton Plains, World's End |
| Beaches | Unawatuna, Mirissa, Arugam Bay, Bentota |

## 🛠️ Tech Stack

- **Frontend:** React 19, JavaScript, HTML, CSS
- **Build Tool:** Vite
- **Icons:** Lucide React
- **Browser Storage:** Local Storage

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/janinduAlWis/Live-Crowds.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Live-Crowds
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in your terminal (usually `http://localhost:5173`).

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 📌 How Crowd Tracking Works

1. The application loads its list of destinations and configured capacities.
2. On the first visit, it generates initial sample crowd counts.
3. When a visitor checks in, their selected group size is added to the destination's count.
4. When they check out, their group size is subtracted.
5. Active sessions automatically expire after two hours.

### Crowd Status

- **Quiet:** Below 50% capacity.
- **Moderate:** 50% to below 80% capacity.
- **Very Crowded:** 80% capacity or above.

## ⚠️ Demo Data Notice

This version uses simulated initial crowd counts and browser Local Storage. It does not currently use a shared backend or real-time data feed.

Check-in updates are stored in the visitor's own browser and are not synchronised between different users or devices. Crowd figures should therefore be treated as demonstration estimates, not verified live visitor counts.

## 🚀 Future Improvements

- Integrate a backend database to share crowd updates between users.
- Introduce real-time synchronisation of visitor counts.
- Add maps and destination directions.
- Provide analytics and historical crowd trends.
- Improve validation and session management.

## 👨‍💻 Developer

**Janindu Alwis**  
Frontend Developer · BICT (Hons) Undergraduate

- GitHub: [@janinduAlWis](https://github.com/janinduAlWis)
- LinkedIn: [janindu-alwis](https://www.linkedin.com/in/janindu-alwis)

---

<p align="center">
  Built to make exploring Sri Lanka smarter. 🇱🇰
</p>
