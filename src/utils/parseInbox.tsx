import { USER_NAME } from "../constants";

// types for the initial format of the JSON file
export type RawData = {
  inbox: RawMessage[][];
};

export type RawMessage = {
  name: string;
  message: string;
  seen: string[];
  timestamp: number;
};

// types for the inbox once it's parsed
export type ParsedConvo = {
  convoId: number;
  contactName: string;
  messages: ParsedMessage[];
  lastMessageIndex: number;
};

export type ParsedMessage = {
  messageId: number; // this is for use with keyextractor in messaging screen
  sender: string;
  message: string;
  isRead: boolean;
  time: string;
};

export async function getData() {
  const url = "https://khaan.backend.locasaur.com/inbox/sample";

  const response = await fetch(url);
  const result: RawData = await response.json();
  return result;
}

export const parseInbox = (data: RawData): ParsedConvo[] => {
  // format data into parsed convos type
  let parsedConvos: ParsedConvo[] = data.inbox.map((conversation, index) => ({
    // assigning contact name by including all convo participants except user
    contactName: conversation
      .map((convo) => convo.name)
      .filter((name) => name !== USER_NAME)
      .join(", "),
    convoId: index,
    // sort by timestamp before mapping to ParsedMessage
    messages: conversation
      .sort((a, b) => {
        return a.timestamp - b.timestamp;
      })
      .map((message, index) => ({
        messageId: index,
        sender: message.name,
        message: message.message,
        isRead: message.seen.includes(USER_NAME),
        time: new Date(message.timestamp).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        }),
      })),
    // find most recent convo by message timestamp
    lastMessageIndex: conversation.reduce<number>(
      (latestIndex, message, currentIndex) => {
        return message.timestamp > conversation[latestIndex].timestamp
          ? currentIndex
          : latestIndex;
      },
      0,
    ),
  }));

  // sorting convos chronologically
  return parsedConvos.sort((a, b) => {
    return (
      data.inbox[b.convoId][b.lastMessageIndex].timestamp -
      data.inbox[a.convoId][a.lastMessageIndex].timestamp
    );
  });
};
