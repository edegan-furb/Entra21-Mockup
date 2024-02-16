import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "../../Context/theme-context";
import { Colors } from "../../constants/styles";

export default function AddButton({ title, onPress, button }) {

    const { colors } = useTheme();

    return(
        <View style={styles.addButtonContainer}>
            <Pressable 
                style={({ pressed }) => pressed ? 
                    [styles.addButton, styles.pressed, {backgroundColor: colors.btnAdd50}] 
                    : 
                    [styles.addButton, button, {backgroundColor: colors.btnAdd50}]
                } 
                android_ripple={{ color: colors.btnAdd50 }}
                onPress={onPress}
            >
                <Ionicons
                    name="add-outline"
                    size={20}
                    color={colors.icons800}
                />
                <Text style={[styles.addButtonText, {color: colors.text100}]}>{title}</Text>
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
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: Colors.primary900,
        elevation: 4,
        shadowColor: Colors.primary900,
        shadowRadius: 5,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .3,
    },
    addButtonText: {
        fontFamily: "open-sans-bold",
        fontSize: 12,
    },
    pressed: {
        opacity: 0.5,
    }
})