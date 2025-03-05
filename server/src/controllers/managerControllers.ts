import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getManager = async (req: Request, res: Response): Promise<void> => {
    try{
    const { cognitoId } = req.params
    const tenant = await prisma.tenant.findUnique({
        where: { cognitoId},
        
    })
    if (tenant) {
        res.json(tenant)
    } else {
       res.status(404).json({ message: "Manager not found" })
    }
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving tenant: ${error.message}` });
  }
}

export const createManager = async (req: Request, res: Response): Promise<void> => {
    try{
    const { cognitoId, name, email, phoneNumber } = req.body
    const manager = await prisma.manager.create({
        data: {
            cognitoId,
            name,
            email,
            phoneNumber
        }
    })
    if (manager) {
        res.json(manager)
    } else {
       res.status(404).json({ message: "Manager not found" })
    }
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving manager: ${error.message}` });
  }
}
           