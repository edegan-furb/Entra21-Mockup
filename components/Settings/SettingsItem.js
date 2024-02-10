import { Text, StyleSheet, Pressable} from "react-native";
import { useState } from "react";
import { Colors } from "../../constants/styles";
import { Ionicons } from '@expo/vector-icons';
import { Switch } from "react-native-switch";
import { useTheme } from "../../store/theme-context";

export default function SettingsItem({ text, nameIcon, swich, activeText, inActiveText, onPress }) {

    const [icon, setIcon] = useState(false);
    const { colors, toggleTheme } = useTheme();

    return(
        <Pressable 
            style={({ pressed }) => pressed && swich ?
                [styles.contentItem, styles.pressed, {borderBottomWidth: 1, borderColor: colors.border500}]
                :
                [styles.contentItem, {borderBottomWidth: 1, borderColor: colors.border500}]
            }
            onPress={onPress}
        >
            <Ionicons 
                name={nameIcon} 
                size={23} 
                color={colors.text900} 
                style={styles.icon} 
            />
            <Text style={[styles.nameItem, {color: colors.text900}]}>{text}</Text>
            {!swich && ( 
                <Switch
                    activeText={activeText}
                    inActiveText={inActiveText}
                    value={icon}
                    onValueChange={(valor) => {
                        setIcon(valor)
                        toggleTheme()
                    }}
                    backgroundActive={colors.swich950}
                    circleActiveColor={colors.swich200}
                    backgroundInactive={colors.swich500}
                    circleInActiveColor={colors.swich200}
                    circleSize={25}
                    barHeight={30}
                    switchWidthMultiplier={3} 
                />
            )}
            
        </Pressable>  
    );
}

const styles = StyleSheet.create({
    contentItem: {
        flexDirection: "row",
        width: '100%',
        height: '30%',
        alignItems: "center",
        justifyContent: 'flex-start',
        shadowColor: Colors.primary950,
        shadowRadius: 6,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: .3,
    },
    icon: {
        width: '15%',
    },
    nameItem: {
        width: '60%',
        fontSize: 17
    },
    pressed: {
        opacity: 0.6
    },
})