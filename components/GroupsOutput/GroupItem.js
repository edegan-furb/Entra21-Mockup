import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "../../constants/styles";
import { Ionicons, Foundation } from '@expo/vector-icons';
import { GroupsContext } from "../../store/groups-context";

function GroupItem({ id, title }) {
  const navigation = useNavigation();

  GroupsContext

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
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={[styles.textBase, styles.title]}>{title}</Text>
          </View>
          <View style={styles.infGroupsContainer}>
            <View style={styles.infGroups}>
              <Ionicons name="people" color={'#fff'} size={17} />
              <Text style={styles.infTitleGroup}>
                4
              </Text>
            </View>
            <View style={styles.infGroups}>
              <Foundation name="clipboard-pencil" color={'#fff'} size={17}/>
              <Text style={styles.infTitleGroup}>
                4
              </Text>
            </View>
          </View>
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
    height: 100,
    backgroundColor: Colors.primary800,
    justifyContent: "center",
    alignItems: "flex-start",
    marginVertical: 8,
    borderRadius: 5,
    elevation: 3,
    shadowColor: Colors.primary100,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  content: {
    paddingLeft: '10%'
  },
  titleContainer: {
    width: '50%',
    height: '55%',
  },
  textBase: {
    color: Colors.primary100,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infGroupsContainer: {
    width: '50%',
    flexDirection: "row",
  },
  infGroups: {
    width: '50%',
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  infTitleGroup: {
    color: '#fff',
    fontSize: 13
  }
});
