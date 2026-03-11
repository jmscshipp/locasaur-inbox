import { StyleSheet, Text, View } from "react-native";
import { USER_NAME } from "../constants";

type ChatMessageProps = {
  contactName: string;
  messageContent: string;
  time: string;
};

export default function ChatMessage({
  contactName,
  messageContent,
  time,
}: ChatMessageProps) {
  return (
    <View style={contactName === USER_NAME ? styles.justifyRight : null}>
      <View style={styles.messageContainer}>
        <View style={styles.messageHeader}>
          <Text style={styles.grey}>{contactName}</Text>
          <Text style={styles.grey}>{time}</Text>
        </View>
        <View style={styles.messageBody}>
          <Text>{messageContent}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  justifyRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  grey: {
    color: "dimgrey",
  },
  messageContainer: {
    padding: 12,
    width: 250, // GO BACK AND MAKE WIDTH SCALE WITH TEXT?
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 4,
    color: "dimgrey",
  },
  messageBody: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 14,
    padding: 10,
  },
});
