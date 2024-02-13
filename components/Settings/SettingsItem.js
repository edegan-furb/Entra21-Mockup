import { Text, StyleSheet, Pressable} from "react-native";
import { useState, useEffect } from "react";
import { Colors } from "../../constants/styles";
import { Ionicons } from '@expo/vector-icons';
import { Switch } from "react-native-switch";
import { useTheme } from "../../store/theme-context";

export default function SettingsItem({ text, nameIcon, swich, swichLanguage, activeText, inActiveText, onPress, swichTheme }) {

    const [icon, setIcon] = useState(false);
    const { colors, toggleTheme, theme } = useTheme();

    // Define o estado inicial do switch com base no tema atual
    const [switchValue, setSwitchValue] = useState(theme === 'dark');

    // Atualiza o estado do switch quando o tema muda
    useEffect(() => {
        setSwitchValue(theme === 'dark');
    }, [theme]);

    // Função para lidar com a mudança do switch
    const handleSwitchChange = () => {
        setSwitchValue(previousValue => !previousValue);
        toggleTheme();
    };

    return(
        <Pressable 
            style={({ pressed }) => pressed && !swich ?
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
            {swichTheme && ( 
                <Switch
                    activeText={activeText}
                    inActiveText={inActiveText}
                    value={switchValue}
                    onValueChange={handleSwitchChange}
                    backgroundActive={colors.swich950}
                    circleActiveColor={colors.swich200}
                    backgroundInactive={colors.swich500}
                    circleInActiveColor={colors.swich200}
                    circleSize={25}
                    barHeight={30}
                    switchWidthMultiplier={3}
                />
            )}
            {swichLanguage && ( 
                <Switch
                    activeText={activeText}
                    inActiveText={inActiveText}
                    value={icon}
                    onValueChange={(valor) => setIcon(valor)}
                    backgroundActive={colors.swich500}
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
        fontSize: 17,
    },
    pressed: {
        opacity: 0.6
    },
})