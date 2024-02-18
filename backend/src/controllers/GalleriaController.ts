/* eslint-disable node/no-unpublished-import */
import {Router, Request, Response} from 'express';
import multer from 'multer';
import {GalleriaItem} from '../../../common/Model';
import {Store} from '../Store';
import path from 'path';
import * as EnvUtils from '../Env';

const router = Router();
const galleria = Store.getInstance().getGalleria();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, EnvUtils.EXPORT_DIRECTORY);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname);
  },
});

const upload = multer({storage: storage, limits: {fileSize: 1000000}});

/**
 * Upload file on the server.
 */
router.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (file) {
    const filePath = path.join(EnvUtils.EXPORT_DIRECTORY, file?.fieldname);
    const item: GalleriaItem = {index: galleria.items.length, path: filePath};

    Store.getInstance().getGalleria().items.push(item);
    res.sendStatus(200).send('File added in the list').end();
    return;
  }
  res.sendStatus(404).send('Request malformed').end();
});

/**
 * Delete file from the UI.
 */
router.delete('/galleria/:id', upload.single('file'), (req, res) => {
  const index = Number(req.params.id);

  const filterIndex = Store.getInstance()
    .getGalleria()
    .items.findIndex(item => item.index === index);

  if (filterIndex < 0) {
    res.sendStatus(404).send('Index not defined.').end();
  }
  Store.getInstance().deleteItem(index);
  res.sendStatus(404).send('Request malformed').end();
});

/**
 * Update Index form the UI.
 */
router.put('/galleria', upload.single('file'), (req, res) => {
  res.sendStatus(404).send('Index not defined.').end();
});

router.post('/', (req: Request, res: Response) => {
  res.status(201).send('HelloWorld').end();
});

export default router;
