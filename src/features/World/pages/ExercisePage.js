import { StyleSheet, View, Text } from "react-native";
import React from "react";

import { CloseCircle } from "iconsax-react-native";
import { Colors } from "../../../utils/Theme";
import Spinner from "react-native-loading-spinner-overlay";
import ProgressBar from "../components/ProgressBar";
import useExerciseManagement from "../hooks/useExerciseManagement";
const ExercisePage = () => {
   const { isLoading, renderExercise, percentage, isEmpty, closeExercise } = useExerciseManagement();
   if (isLoading) {
      return <Spinner visible={isLoading} />;
   }

   return (
      <View style={styles.pageContainer}>
         <View style={styles.topBar}>
            <CloseCircle size={32} color={Colors.gray_300} onPress={() => closeExercise()} />
            {isEmpty ? null : <ProgressBar percentage={`${percentage}%`} />}
         </View>
         {isEmpty ? <Text>Vacio</Text> : renderExercise()}
      </View>
   );
};

export default ExercisePage;

const styles = StyleSheet.create({
   pageContainer: { justifyContent: "space-between", flex: 1 },
   topBar: { alignItems: "center", justifyContent: "center", flexDirection: "row", padding: 24, gap: 16 },
});
