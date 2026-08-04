import { HomeHeader } from "@/components/HomeHeader";
import { globalStyles } from "@/styles/global";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={globalStyles.container}>
      <HomeHeader />
    </View>
  );
}
