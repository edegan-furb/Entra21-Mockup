import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/styles";
import GroupsList from "./GroupsList";

function GroupsOutput({ groups, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (groups.length > 0) {
    content = <GroupsList groups={groups} />;
  }

  return <View style={styles.container}>{content}</View>;
}

export default GroupsOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: Colors.primary100,
  },
  infoText: {
    color: Colors.primary800,
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
