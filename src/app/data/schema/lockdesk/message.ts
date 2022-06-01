export class Message {
  code: string;
  message: string;
  messages: string[];
  constructor(code: string, message: string, messages: string[]) {
    this.code = code;
    this.message = message;
    this.messages = messages;
  }
}
