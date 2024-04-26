import { z } from "zod";

export const postSchema = z.object({
    photo: z.string({
        required_error: "Photo is required",
    }),
    title: z.string({
        required_error: "Title is required!!!!!",
    }),
    description: z.string({
        required_error: "Description is required",
    }),
});

export type PostType = z.infer<typeof postSchema>;