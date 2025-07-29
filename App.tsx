import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Home from "./widgets/Home/index";

export default function App() {

   return (
    <SafeAreaProvider>
      <SafeAreaView>

        <Home/>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}