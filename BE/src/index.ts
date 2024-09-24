import express from 'express';
import { DBconnection } from './config/db';
import registerRoutes from './routes/registerRoutes';
import teamRoutes from './routes/teamRoutes';
import competitionsRoutes from './routes/competitionsRoutes';
import administrativeRoutes from './routes/administrativeRoutes';
import finalisRoutes from './routes/finalisRoutes';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORTJORS; // Use port from .env or default

// Security: Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Log HTTP requests using Morgan
app.use(morgan('dev'));

// Parse incoming JSON requests
app.use(express.json());

// Route configurations
app.use('/api/register', registerRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/competitions', competitionsRoutes);
app.use('/api/administrative', administrativeRoutes);
app.use('/api/finalis', finalisRoutes);

// Check DB connection
const checkDBConnection = async () => {
  try {
    const connection = await DBconnection.getConnection();
    console.log('Connected to MySQL database. Connection ID:', connection.threadId);
    connection.release();
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the process if the DB connection fails
  }
};

// Centralized error handling middleware
import { Request, Response, NextFunction } from 'express';

// Centralized error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: err.message || 'Something went wrong!'
  });
});


// 404 Error handling
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

// Start the server
const startServer = async () => {
  await checkDBConnection(); // Check database connection before starting the server
  app.listen(3987, () => {
    console.log(`Server running at http://localhost:${3987}`);
  });
};

startServer();
