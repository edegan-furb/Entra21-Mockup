import { View, StyleSheet } from "react-native";
import { Colors } from "../constants/styles";
import AddMemberForm from "../components/AddMembers/AddMemberForm";

function AddMembersScreen({ navigation }) {

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler() {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <AddMemberForm onCancel={cancelHandler} onSubmit={confirmHandler}/>
        </View>
    );
}


export default AddMembersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: Colors.primary800,
    },
});
