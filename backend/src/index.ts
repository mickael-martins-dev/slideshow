import express, {Request, Response} from 'express';
import router from './controllers/GalleriaController';
import fs from 'fs';
import * as EnvUtils from './Env';

const server = express();

// Initialize the directory
if (!fs.existsSync(EnvUtils.EXPORT_DIRECTORY)) {
  fs.mkdirSync(EnvUtils.EXPORT_DIRECTORY);
}

server.use('/api', router); // Add this line to mount the Task API routes

server.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

server.listen(EnvUtils.PORT, () => {
  console.log(`Server running at http://localhost:${EnvUtils.PORT}`);
});
