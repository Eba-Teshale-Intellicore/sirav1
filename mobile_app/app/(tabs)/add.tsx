import AddPage from "@/components/AddPage";
import { globalStyles } from "@/styles/global";
import { ScrollView } from "react-native";

export default function Add() {
  return (
    <ScrollView
      style={globalStyles.container}
      showsVerticalScrollIndicator={false}
    >
      <AddPage />
    </ScrollView>
  );
}
