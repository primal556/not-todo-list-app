import { z } from "zod";

export const insertNotTodoItemSchema = z.object({
  text: z.string().min(1, "Item text is required").max(100, "Item text must be 100 characters or less"),
});

export const insertUserSettingsSchema = z.object({
  reminderInterval: z.enum(["2h", "4h", "8h", "10h", "12h", "24h"]).default("8h"),
});

export const updateUserSettingsSchema = insertUserSettingsSchema.partial();

export const insertReminderFeedbackSchema = z.object({
  feedback: z.enum(["success", "struggle"]),
  reminderTime: z.string().or(z.date()).transform((val) => new Date(val)),
});

export type NotTodoItem = {
  id: number;
  text: string;
  createdAt: Date;
};

export type InsertNotTodoItem = z.infer<typeof insertNotTodoItemSchema>;
export type UserSettings = {
  id: number;
  reminderInterval: "2h" | "4h" | "8h" | "10h" | "12h" | "24h";
  lastReminderSent: Date | null;
  createdAt: Date;
};
export type InsertUserSettings = z.infer<typeof insertUserSettingsSchema>;
export type UpdateUserSettings = z.infer<typeof updateUserSettingsSchema>;
export type ReminderFeedback = {
  id: number;
  feedback: "success" | "struggle";
  reminderTime: Date;
  createdAt: Date;
};
export type InsertReminderFeedback = z.infer<typeof insertReminderFeedbackSchema>;
