import AddPage from "@/components/AddPage";
import { globalStyles } from "@/styles/global";
import { ScrollView } from "react-native";
import { LoginPage } from "@/components/LoginPage";

export default function Add() {
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <AddPage />;
  // return (
  //   <ScrollView
  //     style={globalStyles.container}
  //     showsVerticalScrollIndicator={false}
  //   >
  //     <AddPage />
  //   </ScrollView>
  // );
}
