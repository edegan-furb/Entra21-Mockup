import React from 'react';
import { Text } from 'react-native';
import { useTheme } from './theme-context';

const TranslatedText = ({ enText, ptText, style, numberOfLines }) => {
    const { language } = useTheme(); // Use o hook useTheme para acessar o estado do idioma

    // Crie um objeto de tradução com os textos correspondentes para cada idioma
    const translations = {
        en: enText,
        pt: ptText,
    };

    return <Text style={style} numberOfLines={numberOfLines}>{translations[language]}</Text>; // Exiba o texto correspondente ao idioma selecionado
};

export default TranslatedText;