import { messages } from "sdk/constants";

export const required = (value?: string) => (value ? undefined : messages.REQUIRED);
