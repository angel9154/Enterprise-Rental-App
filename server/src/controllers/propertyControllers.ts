import { Request, Response } from 'express';

import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const getProperties = async (req: Request, res: Response): Promise<void> => {
    try{
   const {
    favoriteIds,
    priceMin,
    priceMax,
    beds,
    baths,
    propertyType,
    squareFeetMin,
    squareFeetMax,
    amenities,
    availableFrom,
    latitude,
    longitude
   } = req.query;

   let whereConditions: Prisma.Sql[] = [];

   if(favoriteIds) {
    const favoriteIdsArray = (favoriteIds as string).split(",").map(Number);
    whereConditions.push(
        Prisma.sql `p.id In (${Prisma.join(favoriteIdsArray)})`
       )
   }

   if(priceMin) {
    whereConditions.push(
        Prisma.sql `p."pricePerMonth" >= ${Number(priceMin)}`
       )
   }

   if(priceMax) {
    whereConditions.push(
        Prisma.sql `p."pricePerMonth" <= ${Number(priceMax)}`
       )
   }

   if(beds && beds !== "any") {
    whereConditions.push(
        Prisma.sql `p.beds >= ${Number(beds)}`
       )
   }

   if(squareFeetMin) {
    whereConditions.push(
        Prisma.sql `p.squareFeetMin >= ${Number(squareFeetMin)}`
       )
   }
 

   if(squareFeetMax) {
    whereConditions.push(
        Prisma.sql `p.squareFeet <= ${Number(squareFeetMax)}`
       )
   }

   if(propertyType && propertyType !== "any") {
    whereConditions.push(
        Prisma.sql `p.propertyType = ${Number(propertyType)}::"PropertyType"`
       )
   }

   if(amenities && amenities !== "any") {
    const amenitiesArray = (amenities as string).split(",").map(Number);
    whereConditions.push(
        Prisma.sql `p.amenities @> ${amenitiesArray}`
       )
   }

  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving properties: ${error.message}` });
  }
}

