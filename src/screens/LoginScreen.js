import { useContext, useState } from "react";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { login } from "../util/firebase/auth";
import { Alert } from "react-native";
import { AuthContext } from "../Context/auth-context";
import { useTheme } from "../Context/theme-context";

function LoginScreen() {
  const { language } = useTheme();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  const authCtx = useContext(AuthContext);
  
  const messageLogging = language === 'en' ? 'Logging you in...' : 'Fazendo login...';
  const authFailedText = language === 'en' ? 'Authentication failed' : 'Falha na autenticação';
  const authFailedSubText = language === 'en' ? 
    'Could not log you in. Please check your credentials or try again later' : 
    'Não foi possível fazer login. Verifique suas credenciais ou tente novamente mais tarde'
  ;
  
  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        authFailedText,
        authFailedSubText
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={messageLogging} />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
