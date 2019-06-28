import { messages } from "sdk";

export const required = (value?: string) => (value ? undefined : messages.REQUIRED);
