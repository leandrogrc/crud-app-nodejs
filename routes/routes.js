import express from 'express';
import { getUsers, getUser, newUser, updateUser, deleteUser} from '../controllers/users.js'

const router = express.Router();

router.get('/api', getUsers);
router.post('/api', newUser);
router.get('/api/:id', getUser);
router.patch('/api/:id', updateUser);
router.delete('/api/:id', deleteUser);

export default router;