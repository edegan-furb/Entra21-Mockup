import { useContext, useState } from "react";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { createUser } from "../util/firebase/auth";
import { AuthContext } from "../Context/auth-context";
import { Alert } from "react-native";
import { useTheme } from "../Context/theme-context";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { language } = useTheme();

  const authCtx = useContext(AuthContext);
  
  const messageCreating = language === 'en' ? 'Creating user...' : 'Criando usuário...';
  const authenticateText = language === 'en' ? 'Authentication failed' : 'Falha na autenticação';
  const authenticateSubText = language === 'en' ? 
    'Could not create user. Please check your input and try again later' : 
    'Não foi possível criar o usuário. Verifique sua entrada e tente novamente mais tarde'
  ;

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        authenticateText,
        authenticateSubText
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={messageCreating} />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
