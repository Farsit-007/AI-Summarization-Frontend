import { z } from "zod";
export const registrationSchema = z.object({
    name : z.string().min(2,"Must be Name"),
    email : z.string().email("Invalid email"),
    password : z.string().min(5,"Must be at least 5 character"),
})