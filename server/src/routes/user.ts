import express from 'express';
import authProtect from '../middleware/authProtect';
import { changeStatus, getAllUsers } from '../controllers/user';

const router = express.Router();

router.use(authProtect);

router.get('/',getAllUsers);
router.put('/status',changeStatus);

export default router;
