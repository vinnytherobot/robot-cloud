import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import z from "zod";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const createUserSchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string()
        });

        try {
            // Validação dos dados usando Zod
            const { name, email, password } = createUserSchema.parse(req.body);

            // Hash da senha
            const hashedPassword = await bcrypt.hash(password, 10);

            // Criação do novo usuário no banco de dados
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword
                }
            });

            // Resposta de sucesso
            res.status(201).json({ message: "User created successfully", id: newUser.id });
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(400).json({ error: "Failed to create user" });
        } finally {
            await prisma.$disconnect(); // Fechando a conexão com o banco de dados
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
