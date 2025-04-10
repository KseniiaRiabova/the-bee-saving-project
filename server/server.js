const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';
dotenv.config({ path: path.resolve(__dirname, envFile) });

const dbConnection = require('./config/dbConnection');
const { errorHandler } = require('./middleware/errorHandler');
const dashboardRoutes = require('./routes/dashboardRoutes');
const userRoutes = require('./routes/userRoutes');
const requestRoutes = require('./routes/requestRoutes');

dbConnection();

app.use(express.json());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

// const determineOrigin = (origin, callback) => {
//   const allowedOrigins = [
//     'https://the-bee-saving-project.onrender.com',
//     'http://localhost:5173',
//   ];
//   if (allowedOrigins.includes(origin) || !origin) {
//     callback(null, origin);
//   } else {
//     callback(new Error('Not allowed by CORS'));
//   }
// };

// app.use(
//   cors({
//     origin: determineOrigin,
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     allowedHeaders:
//       'Origin,X-Requested-With,Content-Type,Accept,Authorization, Set-Cookie, Cookie',
//   })
// );
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/user', userRoutes);
app.use('/api/requests', requestRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(
    `Server is running on ${
      process.env.BACKEND_URL || `http://localhost:${PORT}`
    }`
  );
});
