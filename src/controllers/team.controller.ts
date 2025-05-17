import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createTeam(req: Request, res: Response) {
  const { name } = req.body;
  const user = req.user!; 

  if (user.role !== 'manager') {
    return res.status(403).json({ error: 'Only managers can create teams' });
  }

  const team = await prisma.team.create({
    data: {
      name,
      users: {
        connect: { id: user.id }
      }
    }
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { teamId: team.id }
  });

  return res.status(201).json({ team });
}

export async function updateTeam(req: Request, res: Response) {
  const user = req.user!;
  const { name } = req.body;

  if (user.role !== 'manager') {
    return res.status(403).json({ error: 'Only managers can update team' });
  }

  const userData = await prisma.user.findUnique({
    where: { id: user.id },
    include: { team: true }
  });

  if (!userData?.teamId) {
    return res.status(400).json({ error: 'User is not on a club' });
  }

  const updatedTeam = await prisma.team.update({
    where: { id: userData.teamId },
    data: { name }
  });

  return res.json({ team: updatedTeam });
}

export async function getMyTeam(req: Request, res: Response) {
  const user = req.user!;

  const userData = await prisma.user.findUnique({
    where: { id: user.id },
    include: { team: true }
  });

  if (!userData?.team) {
    return res.status(404).json({ error: 'You does not belong to a team' });
  }

  return res.json({ team: userData.team });
}

