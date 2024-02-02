import { View, Text, StyleSheet, Pressable} from "react-native";
import { useState } from "react";
import { Colors } from "../../constants/styles";
import { Ionicons } from '@expo/vector-icons';
import { Switch } from "react-native-switch";


export default function SettingsItem({ text, nameIcon, swich, activeText, inActiveText, onPress }) {

    const [icon, setIcon] = useState(true);
    
    return(
        <Pressable 
            style={({ pressed }) => pressed && swich ? [styles.contentItem, styles.pressed] : styles.contentItem}
            onPress={onPress}
        >
            <Ionicons 
                name={nameIcon} 
                size={23} 
                color={Colors.primary950} 
                style={styles.icon} 
            />
            <Text style={styles.nameItem}>{text}</Text>
            {!swich && ( 
                <Switch
                activeText={activeText}
                inActiveText={inActiveText}
                value={icon}
                onValueChange={(valor) => setIcon(valor)}
                backgroundActive={Colors.primary500}
                circleActiveColor={Colors.primary200}
                backgroundInactive={Colors.primary950}
                circleInActiveColor={Colors.primary200}
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
        borderBottomWidth: 1,
        borderColor: '#000',
    },
    icon: {
        width: '15%',
    },
    nameItem: {
        width: '60%',
        fontSize: 17
    },
    pressed: {
        opacity: 0.7,
    },
})