import { View, Text, StyleSheet, Pressable, SafeAreaView, ScrollView} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "../../store/theme-context";

export default function AboutText({ onPress }) {

  const { colors } = useTheme();
  const textColor = {color: colors.text50};

  return (
    <SafeAreaView style={[styles.modalContainer, {backgroundColor: colors.background50}]}>
      <Pressable onPress={onPress} style={styles.iconContent}>
        <Ionicons name="close" size={30} color={colors.text50}/>
      </Pressable>
      <View>
        <View style={styles.textContainer}>
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <Text style={[styles.mainTitle, textColor]}>TaskSync</Text>
            <Text style={[styles.subTitle, textColor]}>About</Text>
            <Text style={[styles.text, textColor]}>
              O foco principal do aplicativo que desenvolvemos é organizar e delegar tarefas aos membros de equipes. 
              A inspiração para esta ideia surgiu depois de presenciarmos em primeira mão a importância de ter uma 
              equipe organizada e com uma compreensão clara das responsabilidades de cada membro. Nossa escolha é um reflexo
              direto dos meses de trabalho em equipe que investimos na construção deste aplicativo. Essa experiência realçou 
              a necessidade de uma ferramenta capaz de simplificar o gerenciamento de tarefas. Assim, nosso aplicativo nasceu
              não apenas como uma solução para nossos próprios desafios, mas também como uma resposta às necessidades comuns de muitas outras equipes.
            </Text>
            <Text style={[styles.text, textColor]}>
              Nosso aplicativo incorpora uma variedade de funcionalidades. 
              Entre elas, destacam-se:
            </Text>
            <Text style={[styles.textInf, textColor]}>
              1: Atualizações em Tempo Real: Uma das características mais importantes do nosso aplicativo é a capacidade de atualizar qualquer alteração
              feita em grupos, tarefas ou na composição da equipe é imediatamente refletida para todos os membros, garantindo que todos estejam sempre informados 
              sobre as últimas mudanças e atualizações. {'\n'}{'\n'}
              2: Autenticação: O aplicativo certifica-se que apenas usuários autorizados tenham acesso ao aplicativo e garantindo que cada membro da equipe tenha acesso 
              às informações e funcionalidades adequadas ao seu nível de permissão. {'\n'}{'\n'}
              3: Gestão de grupos: Os usuários podem facilmente criar e modificar grupos. {'\n'}{'\n'}
              4: Gestão de tarefas: O aplicativo permite facilmente criar ou modificar tarefas dentro de grupos. Isso inclui definição de prazo, atribuição de responsável, atualização de status entre outros. {'\n'}
              5: Administração de membros: Adicionar ou remover membros de grupos é um processo ágil. {'\n'}{'\n'}
              6: Permissões para membros: O aplicativo oferece um sistema de permissão, permitindo que os administradores escolham o que cada membro poderá acessar. {'\n'}{'\n'}
            </Text>
            <Text style={[styles.text, textColor]}>
              No desenvolvimento do nosso aplicativo, utilizamos uma combinação de tecnologias para garantir eficiência e uma experiência de usuário excepcional. As principais tecnologias incluem:
            </Text>
            <Text style={[styles.textInf, textColor]}>
              1: React Native: Framework principal para o desenvolvimento do aplicativo. Nos permitiu criar um aplicativo móvel tanto em dispositivos Android quanto iOS. O React Native foi essencial por 
              causa de sua eficiência e pela capacidade de integrar perfeitamente com componentes nativos.{'\n'}{'\n'}
              2: Firebase Authentication: Esta plataforma oferece um sistema para autenticação de usuários, suportando uma variedade de provedores. Assim simplificando o processo de login, 
              como também aumentando a segurança do aplicativo.{'\n'}{'\n'}
              3: Cloud Firestore: É o nosso banco de dados escolhido devido à sua flexibilidade e escalabilidade. Foi ideal para o desenvolvimento mobile, permitindo o armazenamento e a 
              sincronização de dados em tempo real entre os usuários.{'\n'}{'\n'}
              4: Expo: Implementamos o Expo para agilizar o desenvolvimento e o teste do aplicativo. Esta plataforma facilitou a criação do aplicativo, que funciona tanto em dispositivos
              móveis quanto na web. O Expo foi uma escolha excelente para desenvolvimento rápido e eficiente, permitindo-nos focar mais na experiência do usuário.{'\n'}{'\n'}
              5: React Navigation: Para a navegação dentro do aplicativo, adotamos o React Navigation. Este foi um componente essencial para proporcionar uma navegação fluida e intuitiva, para 
              uma boa experiência do usuário.{'\n'}{'\n'}
            </Text>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1
  },
  iconContent: {
    paddingLeft: 10
  },
  textContainer: {
    padding: 20,  
  },
  mainTitle: {
    fontSize: 35,
    padding: 15,
    textAlign: "center",
    fontFamily: 'open-sans-bold'
  },
  subTitle: {
    fontSize: 20,
    padding: 10,
    fontFamily: 'open-sans-bold'
  },
  text: {
    fontSize: 15,
    padding: 10,
    textAlign: "justify"
  },
  textInf: {
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 30,
    textAlign: "justify"
  }
  
})