import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { FlatList } from "react-native";
import ChatMessage from "../src/components/ChatMessage";
import { StackParamList } from "./App";

export default function MessagingScreen() {
  const { convo } = useRoute<RouteProp<StackParamList, "Messaging">>().params;
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: convo.contactName });
  }, [navigation, convo.contactName]);

  return (
    <FlatList
      data={convo.messages}
      keyExtractor={(item) => item.messageId.toString()}
      renderItem={({ item }) => (
        <ChatMessage
          contactName={item.sender}
          messageContent={item.message}
          time={item.time}
        ></ChatMessage>
      )}
    ></FlatList>
  );
}
