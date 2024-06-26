import { StyleSheet, Text, View } from "react-native";
import React from "react";
import UserStats from "../../World/components/UserStats";
import { ArrowRight, TickCircle, InfoCircle, HeartSlash } from "iconsax-react-native";
import { Button } from "@components";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@utils/Theme";
import { useExercises } from "@stores/useExerciseStore";
import { useNavigation } from "@react-navigation/native";
import { calculateTimeSpent } from "../helpers";
import { useExerciseActions } from "../hooks/useExerciseActions";
import * as Speech from "expo-speech";

const BottomActions = ({ checkAnswer, isLastExercise, exerciseType, lessonId }) => {
  const { exercises, isAnswerCorrect, nextExercise, userAnswer, startTime, mistakes, isCheckingAnswer, correctAnswer } = useExercises();
  const { profit } = useExerciseActions();

  const navigation = useNavigation();

  if (exerciseType === "theory") {
    return (
      <>
        <View style={styles.buttonContainer}>
          <UserStats statusToShow={"lives"} style={{ padding: 2, borderRadius: 6, backgroundColor: "#fff", transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }} />

          <Button
            text="Continuar"
            variant="primary"
            rightIcon={<ArrowRight size={24} color={"#fff"} variant="Bold" />}
            style={{ flex: 1 }}
            onPress={() => {
              Speech.stop();
              if (!isLastExercise) {
                nextExercise();
                return;
              }

              navigation.navigate("Congrats", {
                lessonId,
                elapsedTime: calculateTimeSpent(startTime),
                errorCount: mistakes.length,
                errorExercises: mistakes,
                profit,
                correctAnswers: exercises.length - mistakes.length,
              });
            }}
          />
        </View>
      </>
    );
  }
  return (
    <>
      {isAnswerCorrect != null ? (
        <View style={styles.answeredContainer}>
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            {isAnswerCorrect ? (
              <TickCircle size={28} color={Colors.success_500} variant="Bold" />
            ) : (
              <HeartSlash size={28} color={Colors.error_500} variant="Bold" />
            )}
            <Text
              style={{
                color: Colors.gray_500,
                fontSize: 20,
                fontFamily: "Sora-Bold",
              }}
            >
              {isAnswerCorrect ? "Bien Hecho!" : "Incorrecto!"}
            </Text>
          </View>
          {!isAnswerCorrect && (
            <Text
              style={{
                color: Colors.gray_500,
                fontSize: 14,
                fontFamily: "Sora-SemiBold",
              }}
            >
              La respuesta era: {correctAnswer}
            </Text>
          )}
          <Button
            text="Continuar"
            variant={isAnswerCorrect ? "success" : "wrong"}
            disabled={isCheckingAnswer}
            rightIcon={isAnswerCorrect ? <ArrowRight size={24} color={"#fff"} variant="Bold" /> : <InfoCircle size={24} color={"#fff"} variant="Bold" />}
            onPress={
              !isLastExercise
                ? () => {
                    Speech.stop();

                    nextExercise();
                  }
                : () => {
                    Speech.stop();

                    navigation.navigate("Congrats", {
                      lessonId,
                      elapsedTime: calculateTimeSpent(startTime),
                      errorCount: mistakes.length,
                      errorExercises: mistakes,
                      profit,
                      correctAnswers: exercises.length - mistakes.length,
                    });
                  }
            }
          />
        </View>
      ) : (
        <View>
          <View style={styles.buttonContainer}>
            <UserStats statusToShow={"lives"} style={{ padding: 2, borderRadius: 6, backgroundColor: "#fff", transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }} />

            <Button
              text="Comprobar"
              variant="primary"
              disabled={userAnswer == null || userAnswer.length === 0 || isCheckingAnswer}
              rightIcon={<ArrowRight size={24} color={"#fff"} variant="Bold" />}
              style={{ flex: 1 }}
              onPress={() => {
                Speech.stop();

                checkAnswer();
              }}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default BottomActions;
const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: StatusBar.currentHeight || 24,
  },

  topBar: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 16,
    gap: 16,
  },
  buttonContainer: {
    // borderTopWidth: 2,
    // borderColor: Colors.gray_200,
    gap: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  successBar: {
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  answeredContainer: {
    padding: 16,
    backgroundColor: "#fff",
    gap: 16,
    borderTopWidth: 2,
    borderColor: Colors.gray_200,
  },
});
