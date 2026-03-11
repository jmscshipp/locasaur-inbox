import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ParsedConvo, ParsedMessage } from "../utils/parseInbox";

type InboxMessageProps = {
  convo: ParsedConvo;
  // callback to open messaging screen
  openMessaging: (convo: ParsedConvo) => void;
};

export default function InboxMessage({
  convo,
  openMessaging,
}: InboxMessageProps) {
  const [isRead, setIsRead] = useState(
    convo.messages[convo.lastMessageIndex].isRead,
  );
  const mostRecentMessage: ParsedMessage =
    convo.messages[convo.lastMessageIndex];

  function OpenMessage() {
    setIsRead(true);
    openMessaging(convo);
  }

  return (
    <TouchableOpacity
      style={styles.messageContainer}
      onPress={() => OpenMessage()}
    >
      <View style={styles.messageHeader}>
        <Text style={styles.sender}>{convo.contactName}</Text>
        <Text style={styles.grey}>{mostRecentMessage.time}</Text>
      </View>
      <View style={styles.messageBody}>
        <Text style={styles.grey}>
          {mostRecentMessage.sender + ": " + mostRecentMessage.message}
        </Text>
        {!isRead && <View style={styles.unreadIcon}></View>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  grey: {
    color: "dimgrey",
  },
  messageContainer: {
    backgroundColor: "white",
    padding: 12,
  },
  messageHeader: {
    flex: 1 / 4,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 4,
  },
  sender: {
    fontSize: 16,
  },
  messageBody: {
    flex: 3 / 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    fontSize: 12,
    paddingVertical: 10,
    paddingRight: 10, // spacing out the unread icon a bit
  },
  unreadIcon: {
    width: 8,
    height: 8,
    backgroundColor: "cornflowerblue",
    borderRadius: "50%",
  },
});
