import { Router } from 'express';
import { createEvent, listEvents, updateEvent, deleteEvent } from '../controllers/event.controller';
import { ensureAuth } from '../middlewares/ensureAuth';

const router = Router();

router.get('/', ensureAuth, listEvents);
router.post('/', ensureAuth, createEvent);
router.put('/:id', ensureAuth, updateEvent); 
router.delete('/:id', ensureAuth, deleteEvent); 

export default router;
