import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

import z from "zod"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient();

export const dynamic = 'force-static'

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    const signInSchema = z.object({
        email: z.string().email(),
        password: z.string(),
    });

    const { email, password } = signInSchema.parse(request.body);

    try {
        const user = await prisma.user.findUnique({ where: { email }});

        if(!user){
            return response.status(401).json({ error: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return response.status(401).json({ error: "Invalid credentials" });
        }

        response.status(200).json({ id: user.id });

    } catch(error){
        response.status(500).json({ error: "Internal server error" });
    }
}