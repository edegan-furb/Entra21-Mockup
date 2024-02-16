import { StyleSheet, Text, View } from "react-native";

//import { Colors } from "../../constants/styles";
import GroupsList from "./GroupsList";
import { useTheme } from '../../context/theme-context'; // Adjust the import path

function GroupsOutput({ groups, fallbackText }) {

  const { colors } = useTheme();

  let content = <Text style={[styles.infoText, { color: colors.primary800 }]}>{fallbackText}</Text>;

  if (groups.length > 0) {
    content = <GroupsList groups={groups} />;
  }

  return <View style={[styles.container, { backgroundColor: colors.primary100 }]}>{content}</View>;
}

export default GroupsOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    //backgroundColor: Colors.primary100,
  },
  infoText: {
    //color: Colors.primary800,
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
