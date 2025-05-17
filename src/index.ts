import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import teamRoutes from './routes/team.routes';
import eventRoutes from './routes/event.routes';



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/teams', teamRoutes);
app.use('/events', eventRoutes);

app.get('/', (req, res) => {
  res.send('TeamBoard API rodando!');
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});