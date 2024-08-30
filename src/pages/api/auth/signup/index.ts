import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

import z from "zod"

import bcrypt from "bcryptjs"

const prisma = new PrismaClient();

export async function POST(request: NextApiRequest, response: NextApiResponse){
    const createUserSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string()
    })

    const { name, email, password } = createUserSchema.parse(request.body);

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        response.status(201).json({ message: "User created successfully", id: newUser.id });

    } catch(error){
        response.status(400).json({ error: "Failed to create user" });
    }
}
