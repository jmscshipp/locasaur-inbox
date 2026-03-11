import InboxMessage from "@/src/components/InboxMessage";
import { getData, ParsedConvo, parseInbox } from "@/src/utils/parseInbox";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  RefreshControl,
} from "react-native";
import { StackParamList } from "./App";

export default function InboxScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [parsedData, setData] = useState<ParsedConvo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // adding artificial delay to show loading indicator
  const delay = () => new Promise((resolve) => setTimeout(resolve, 2000));

  const loadData = useCallback(async (isRefreshing: boolean = false) => {
    try {
      if (isRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      await Promise.all([getData(), delay()]); // artificial delay
      setData(parseInbox(await getData()));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      if (isRefreshing) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = useCallback(() => loadData(true), [loadData]);

  // adding header button to navigate to refresh test screen
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Refresh Test"
          onPress={() => navigation.navigate("RefreshTest")}
        />
      ),
    });
  }, [navigation]);

  // loading data for first time
  if (loading) return <ActivityIndicator />;

  return (
    <FlatList
      data={parsedData}
      keyExtractor={(item) => item.convoId.toString()}
      renderItem={({ item }) => (
        <InboxMessage
          convo={item}
          openMessaging={(convo: ParsedConvo) =>
            navigation.navigate("Messaging", { convo })
          }
        ></InboxMessage>
      )}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh} // pull to refresh data
        ></RefreshControl>
      }
    ></FlatList>
  );
}
