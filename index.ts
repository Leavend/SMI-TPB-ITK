import "reflect-metadata";
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// import DbInitialize from './src/database/init';
// import UserRouter from './src/routers/user-router';
// import RoleRouter from './src/routers/role-router';

const envFile = process.env.NODE_ENV === 'local' ? '.env.local' : process.env.NODE_ENV === 'development' ? '.env.dev' : '.env.local';
dotenv.config({ path: envFile });

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((err: TypeError, req: Request, res: Response, next: NextFunction) => {
  try {
    if (err) {
      return res.status(500).json({ status: false, message: (err as TypeError).message });
    }
  } catch (e) {}
});

// app.use('/api/v1/users', UserRouter);
// app.use('/api/v1/roles', RoleRouter);

app.get('/', (req : Request, res : Response) => {
  res.send(`Welcome to ${process.env.APP_NAME}`);
});

const PORT = process.env.PORT || 3030;

// const Bootstrap = async function () {
//   try {
//     await DbInitialize();
//     app.listen(PORT, () => {
//       console.log('Connection has been established successfully. Server is running on port '+ PORT);
//     });
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// };

// Bootstrap();
