import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../../constants/styles"; 
import { useTheme } from "../../store/theme-context";

export default function AddButton({ title, onPress, button }) {

    const { colors } = useTheme();

    return(
        <View style={styles.addButtonContainer}>
            <Pressable 
                style={({ pressed }) => pressed ? [styles.addButton, styles.pressed, {backgroundColor: colors.primary900}] : [styles.addButton, button]} 
                android_ripple={{ color: Colors.primary950 }}
                onPress={onPress}
            >
                <Ionicons
                    name="add-outline"
                    size={20}
                    color={Colors.primary900}
                />
                <Text style={styles.addButtonText}>{title}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    addButtonContainer:{
        width: '40%',
        height: '60%',
    },    
    addButton: {
        width: '80%',
        height: '100%',
        borderRadius: 12,
        backgroundColor: Colors.primary50,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: Colors.primary900,
        elevation: 4,
        shadowColor: Colors.primary950,
        shadowRadius: 5,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .3,
    },
    addButtonText: {
        fontFamily: "open-sans-bold",
        fontSize: 12,
        color: Colors.primary900,
    },
    pressed: {
        opacity: 0.5,
    }
})