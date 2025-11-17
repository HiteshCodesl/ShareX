import z from "zod";
export const songSchema = z.object({
    streamId: z.number(),
    youtubeId: z.string(),
});
//# sourceMappingURL=songTypes.js.map