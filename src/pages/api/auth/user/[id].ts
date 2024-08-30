import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { id } = req.query;

    if (typeof id !== 'string') {
        return res.status(400).json({ error: "Invalid ID" });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if(user){
            res.status(200).json( 
                { 
                    id: user.id,
                    name: user.name, 
                    email: user.email, 
                    createdAt: user.createdAt,
                    profilePhotoUrl: user.profilePhotoUrl
                } 
            );
        } else{
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}
