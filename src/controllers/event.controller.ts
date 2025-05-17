import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createEvent(req: Request, res: Response) {
  const user = req.user!;
  const { title, type, date, description } = req.body;

  if (user.role !== 'manager') {
    return res.status(403).json({ error: 'Only managers can create events' });
  }

  const userData = await prisma.user.findUnique({ where: { id: user.id } });

  if (!userData?.teamId) {
    return res.status(400).json({ error: 'User is not on a club' });
  }

  const event = await prisma.event.create({
    data: {
      title,
      type,
      date: new Date(date),
      description,
      teamId: userData.teamId
    }
  });

  return res.status(201).json({ event });
}

export async function listEvents(req: Request, res: Response) {
  const user = req.user!;

  const userData = await prisma.user.findUnique({ where: { id: user.id } });

  if (!userData?.teamId) {
    return res.status(400).json({ error: 'User is not on a club' });
  }

  const events = await prisma.event.findMany({
    where: { teamId: userData.teamId },
    orderBy: { date: 'asc' }
  });

  return res.json({ events });
}

export async function updateEvent(req: Request, res: Response) {
  const user = req.user!;
  const { id } = req.params;
  const { title, type, date, description } = req.body;

  if (user.role !== 'manager') {
    return res.status(403).json({ error: 'Only managers can edit events' });
  }

  const updated = await prisma.event.update({
    where: { id },
    data: { title, type, date: new Date(date), description },
  });

  return res.json(updated);
}

export async function deleteEvent(req: Request, res: Response) {
  const user = req.user!;
  const { id } = req.params;

  if (user.role !== 'manager') {
    return res.status(403).json({ error: 'Only managers can delete events' });
  }

  await prisma.event.delete({
    where: { id },
  });

  return res.status(204).send();
}