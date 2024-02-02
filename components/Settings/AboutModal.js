import { View, Text, StyleSheet, Pressable, Modal} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";

export default function AboutText() {

  const [modalVisible, setModalVisible] = useState(false);

  return (
      <Modal 
      animationType="slide"
      transparent={true}
      visible={modalVisible}
    >
      <View style={styles.modalContainer}>
        <Pressable onPress={() => setModalVisible(false)} style={styles.iconContent}>
          <Ionicons name="close" size={30} color={Colors.neutral900}/>
        </Pressable>
        <View>
          <Text style={styles.title}>TaskSync</Text>
          <Text style={styles.title}>About</Text>
          <Text style={styles.text}>O foco principal do aplicativo que desenvolvemos é organizar e delegar tarefas aos membros de equipes. A inspiração para esta ideia surgiu depois de presenciarmos em primeira mão a importância de ter uma equipe organizada e com uma compreensão clara das responsabilidades de cada membro. Nossa escolha é um reflexo direto dos meses de trabalho em equipe que investimos na construção deste aplicativo. Essa experiência realçou a necessidade de uma ferramenta capaz de simplificar o gerenciamento de tarefas. Assim, nosso aplicativo nasceu não apenas como uma solução para nossos próprios desafios, mas também como uma resposta às necessidades comuns de muitas outras equipes.</Text>
          <Text>Nosso aplicativo incorpora uma variedade de funcionalidades. 
            Entre elas, destacam-se:
          </Text>
          <Text>Atualizações em Tempo Real: Uma das características mais importantes do nosso aplicativo é a capacidade de atualizar qualquer alteração feita em grupos, tarefas ou na composição da equipe é imediatamente refletida para todos os membros, garantindo que todos estejam sempre informados sobre as últimas mudanças e atualizações.

            Autenticação: O aplicativo certifica-se que apenas usuários autorizados tenham acesso ao aplicativo e garantindo que cada membro da equipe tenha acesso às informações e funcionalidades adequadas ao seu nível de permissão.

            Gestão de grupos: Os usuários podem facilmente criar e modificar grupos.

            Gestão de tarefas: O aplicativo permite facilmente criar ou modificar tarefas dentro de grupos. Isso inclui definição de prazo, atribuição de responsável, atualização de status entre outros.

            Administração de membros: Adicionar ou remover membros de grupos é um processo ágil.

            Permissões para membros: O aplicativo oferece um sistema de permissão, permitindo que os administradores escolham o que cada membro poderá acessar.
          </Text>
        </View>
      </View>
    </Modal>

  )
}

const styles = StyleSheet.create({
  modalContainer: {

  }
})