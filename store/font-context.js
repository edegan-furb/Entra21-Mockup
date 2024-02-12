import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useState } from "react";

export default function Fonts() {

    const [isReady, setIsReady] = useState(false);
    
    SplashScreen.preventAutoHideAsync();
    useEffect(() => {
        async function prepare() {
        try {
            await Font.loadAsync({
            "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
            "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
            });
        } catch (e) {
            console.warn(e);
        } finally {
            setIsReady(true);
        }
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (isReady) {
        await SplashScreen.hideAsync();
        }
    }, [isReady]);

    if (!isReady) {
        return null;
    }

    return onLayoutRootView;
}