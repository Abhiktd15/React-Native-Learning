import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// @snippet start schema
export default defineSchema({
    todos: defineTable({
        text: v.string(),
        isCompleted: v.boolean(),
    }),
});