import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "../../constants/styles";
import { useTheme } from '../../store/theme-context'; // Adj
import { Ionicons, Foundation } from '@expo/vector-icons';
import GroupDonut from './GroupDonut';

function GroupItem({ id, title, }) {

  const { colors } = useTheme();
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
      <View style={[styles.groupItem, { backgroundColor: colors.primary800, }]}>
        <View style={styles.content}>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={[styles.textBase, styles.title, {color: colors.primary100}]}>{title}</Text>
            </View>
            <View style={styles.infGroupsContainer}>
              <View style={styles.infGroups}>
                <Ionicons name="people" color={colors.primary100} size={17} />
                <Text style={[styles.infTitleGroup, {color: colors.primary100}]}>
                 4
                </Text>
              </View>
              <View style={styles.infGroups}>
                <Foundation name="clipboard-pencil" color={colors.primary100} size={17}/>
                <Text style={[styles.infTitleGroup, {color: colors.primary100}]}>
                  4
               </Text>
              </View>  
            </View>
          </View>
          <View style={styles.graphiContainer}>
            <Text style={[styles.graphiTextInf, {color: colors.primary100}]}>Concluido</Text>
            <GroupDonut concludedTasks={80} />
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
    height: 105,
    backgroundColor: Colors.primary950,
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: 'row',
    marginVertical: 8,
    borderRadius: 5,
    elevation: 4,
    shadowColor: Colors.primary950,
    shadowRadius: 2,
    shadowOffset: { width: 4, height: 5 },
    shadowOpacity: .3,
  },
  content: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  container: {
    paddingLeft: '10%',
    width: '55%',
    alignItems: "center",
    justifyContent: "center"
  },
  titleContainer: {
    width: '100%',
    height: '45%',
  },
  textBase: {
    //color: Colors.primary100,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infGroupsContainer: {
    width: '100%',
    flexDirection: "row",
    justifyContent: "space-between",
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
  },
  graphiContainer: {
    width: '45%',
    alignItems: "center",
    justifyContent: "center"
  },
  graphiTextInf: {
    color: Colors.primary100,
    paddingVertical: 5,
    fontSize: 11
  }
});
