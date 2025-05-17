import { Router } from 'express';
import { createTeam, updateTeam, getMyTeam } from '../controllers/team.controller';
import { ensureAuth } from '../middlewares/ensureAuth';

const router = Router();

router.post('/', ensureAuth, createTeam);
router.put('/', ensureAuth, updateTeam);
router.get('/', ensureAuth, getMyTeam);

export default router;
