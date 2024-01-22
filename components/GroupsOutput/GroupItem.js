import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "../../constants/styles";

function GroupItem({ id, title }) {
  const navigation = useNavigation();

  function groupPressHandler() {
    navigation.navigate("GroupScreen", {
      groupId: id,
    });
  }

  return (
    <Pressable
      onPress={groupPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.groupItem}>
        <View>
          <Text style={[styles.textBase, styles.title]}>{title}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default GroupItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  groupItem: {
    width: '100%',
    height: 80,
    marginVertical: 8,
    backgroundColor: Colors.primary800,
    justifyContent: "space-between",
    borderRadius: 9,
    elevation: 3,
    shadowColor: Colors.primary100,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    justifyContent: "center"
  },
  textBase: {
    color: Colors.primary100,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
    marginLeft: 15
  },
});
