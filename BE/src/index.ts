import express from 'express';
import { DBconnection } from './config/db'; 
import registerRoutes from './routes/registerRoutes';
import cors from 'cors';
import teamRoutes from './routes/teamRoutes';
import competitionsRoutes from './routes/competitionsRoutes';
import administrativeRoutes from './routes/administrativeRoutes';
import finalisRoutes from './routes/finalisRoutes';




const app = express();
const port = 3987;

app.use(cors());

app.use(express.json());


app.use('/api/register', registerRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/competitions', competitionsRoutes);
app.use('/api/administrative', administrativeRoutes);
app.use('/api/finalis', finalisRoutes);

const checkDBConnection = async () => {
  try {
    const connection = await DBconnection.getConnection();
    console.log('nyambung ke MYSQL anjay :) ' + connection.threadId);
    connection.release(); 
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); 
  }
};


const startServer = async () => {
  await checkDBConnection();  
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};

startServer();
