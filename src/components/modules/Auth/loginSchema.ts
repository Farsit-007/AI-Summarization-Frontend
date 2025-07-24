import { z } from "zod";
export const loginSchema = z.object({
    email : z.string().email("Invalid email"),
    password : z.string().min(5,"Must be at least 5 character"),
})