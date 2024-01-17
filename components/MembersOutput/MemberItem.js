import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../../constants/styles";

function MemberItem({ email, username }) {
  return (
    <View style={styles.memberItem}>
      <View>
        <Text style={[styles.textBase, styles.title]}>{username}</Text>
        <Text style={[styles.textBase, styles.title]}>{email}</Text>
      </View>
    </View>
  );
}

export default MemberItem;

const styles = StyleSheet.create({
  memberItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.primary800,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: Colors.primary100,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: Colors.primary100,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
});
