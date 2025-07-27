import type { NotTodoItem, InsertNotTodoItem, UserSettings, UpdateUserSettings, ReminderFeedback, InsertReminderFeedback } from "@shared/schema";

class StorageAdapter {
  private getItems(): NotTodoItem[] {
    const items = localStorage.getItem("notTodoItems");
    return items ? JSON.parse(items) : [];
  }

  private setItems(items: NotTodoItem[]): void {
    localStorage.setItem("notTodoItems", JSON.stringify(items));
  }

  async createItem(item: InsertNotTodoItem): Promise<NotTodoItem> {
    const items = this.getItems();
    const newItem: NotTodoItem = {
      id: Date.now(),
      text: item.text,
      createdAt: new Date(),
    };
    items.push(newItem);
    this.setItems(items);
    return newItem;
  }

  async getItems(): Promise<NotTodoItem[]> {
    return this.getItems();
  }

  async deleteItem(id: number): Promise<void> {
    const items = this.getItems();
    const filteredItems = items.filter(item => item.id !== id);
    this.setItems(filteredItems);
  }

  async getSettings(): Promise<UserSettings | null> {
    const settings = localStorage.getItem("userSettings");
    return settings ? JSON.parse(settings) : null;
  }

  async updateSettings(settings: UpdateUserSettings): Promise<UserSettings> {
    const existing = await this.getSettings();
    const updated: UserSettings = {
      id: existing?.id || 1,
      reminderInterval: settings.reminderInterval || existing?.reminderInterval || "8h",
      lastReminderSent: existing?.lastReminderSent || null,
      createdAt: existing?.createdAt || new Date(),
    };
    localStorage.setItem("userSettings", JSON.stringify(updated));
    return updated;
  }

  async createFeedback(feedback: InsertReminderFeedback): Promise<ReminderFeedback> {
    const feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
    const newFeedback: ReminderFeedback = {
      id: Date.now(),
      feedback: feedback.feedback,
      reminderTime: new Date(feedback.reminderTime),
      createdAt: new Date(),
    };
    feedbacks.push(newFeedback);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
    return newFeedback;
  }
}

export const storageAdapter = new StorageAdapter();
