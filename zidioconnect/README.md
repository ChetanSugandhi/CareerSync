# ZIDIOConnect

A platform connecting students with recruiters for job opportunities.

## Features

- User authentication (Student/Recruiter)
- Job listings
- Application management
- Profile management
- Dashboard for both students and recruiters

## Tech Stack

- Frontend: React, TypeScript, Material-UI
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/zidioconnect.git
cd zidioconnect
```

2. Install frontend dependencies
```bash
npm install
```

3. Install backend dependencies
```bash
cd backend
npm install
```

4. Set up environment variables

Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/zidioconnect
JWT_SECRET=your_jwt_secret_key_here
```

Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

5. Start the backend server
```bash
cd backend
npm run dev
```

6. Start the frontend development server
```bash
cd zidioconnect
npm start
```

## Project Structure

```
zidioconnect/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── jobs/
│   │   └── layout/
│   ├── context/
│   ├── services/
│   └── types/
└── backend/
    ├── models/
    ├── routes/
    ├── middleware/
    └── server.js
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
