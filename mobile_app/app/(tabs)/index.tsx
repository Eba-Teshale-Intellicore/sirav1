import { HomeHeader } from "@/components/HomeHeader";
import { globalStyles } from "@/styles/global";
import { ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView
      style={globalStyles.container}
      showsVerticalScrollIndicator={false}
    >
      <HomeHeader />
    </ScrollView>
  );
}
