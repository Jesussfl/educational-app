import React from "react";
import { View, Image, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { LessonButton, Button } from "@components";
import { Colors } from "@utils/Theme";
import { Key } from "iconsax-react-native";
import { calculateLeftPosition } from "../utils/calculateLessonsPosition";
import * as Animatable from "react-native-animatable";
import { Svg, Line } from "react-native-svg";
import CompletedGift from "../../../../assets/giftCompleted.png";
import UnlockedGift from "../../../../assets/giftUnlocked.png";
import LockedGift from "../../../../assets/Gift.png";
import { useLessonModal } from "@stores/lesson-modal";
import { findFirstUnlockedLessonIndex, checkIfLessonCompleted, checkIfLessonLocked, checkIfLessonUnlocked } from "../utils/renderLessons.helper";
const Lessons = ({ lessons, lessonsCompleted, isFirstLessonCurrent, isLastSection }) => {
  const firstUnlockedLessonIndex = findFirstUnlockedLessonIndex(lessons, lessonsCompleted);
  const { addLessonId, addLessonStatus, onOpen, addIsLastLesson, addLessonType } = useLessonModal((state) => state);

  return (
    <View style={styles.container}>
      {lessons.map((lesson, index) => {
        const isLessonCompleted = checkIfLessonCompleted(lesson, lessonsCompleted);
        const isLessonUnlocked = checkIfLessonUnlocked(index, firstUnlockedLessonIndex, isFirstLessonCurrent);
        const isLessonLocked = checkIfLessonLocked(index, firstUnlockedLessonIndex, isLessonCompleted);
        const isLessonAGift = lesson.attributes.type === "gift";
        const isExam = lesson.attributes.type === "exam";
        const isLastLesson = index === lessons.length - 1 && isLastSection;
        if (isLessonAGift) {
          let source;
          if (isLessonCompleted) {
            source = Image.resolveAssetSource(CompletedGift).uri;
          } else if (isLessonUnlocked) {
            source = Image.resolveAssetSource(UnlockedGift).uri;
          } else {
            source = Image.resolveAssetSource(LockedGift).uri;
          }
          return (
            <View style={{ alignItems: "center" }} key={lesson.id}>
              <Svg width="100" height="180" style={{ marginBottom: -36, marginTop: -106 }}>
                <Line x1="50%" y1="0" x2="50%" y2="100%" stroke={Colors.gray_50} strokeWidth="80" />
                <Line x1="50%" y1="0" x2="50%" y2="100%" stroke={Colors.gray_200} strokeWidth="15" />
              </Svg>
              <Animatable.View animation={isLessonCompleted ? null : "pulse"} easing="ease-out" iterationCount="infinite">
                <TouchableWithoutFeedback
                  onPress={() => {
                    if (isLessonCompleted) {
                      return;
                    }

                    addLessonType("gift");
                    addLessonId(lesson.id);
                    addLessonStatus("completed");
                  }}
                >
                  <Image source={{ uri: source }} style={styles.giftImage} />
                </TouchableWithoutFeedback>
              </Animatable.View>
            </View>
          );
        }
        if (isExam) {
          return (
            <BottomContainer
              onPress={() => {
                addLessonType("exam");
                addLessonId(lesson.id);
                if (isLastLesson) {
                  addIsLastLesson(true);
                  console.log("last lesson");
                }

                onOpen();
              }}
              key={lesson.id}
            />
          );
        }
        return (
          <View key={lesson.id}>
            {isLessonUnlocked ? (
              <UnlockedLesson index={index} isLessonLocked={isLessonLocked} isLessonCompleted={isLessonCompleted} lesson={lesson} />
            ) : (
              <LockedOrCompletedLesson index={index} isLessonLocked={isLessonLocked} isLessonCompleted={isLessonCompleted} lesson={lesson} />
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 28,
    alignItems: "center",
    flexDirection: "column-reverse",
  },
  giftImage: {
    width: 150,
    height: 150,
    marginVertical: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 16,
    alignSelf: "center",
  },
});
export default Lessons;

function UnlockedLesson({ index, lesson }) {
  const { addLessonId, onOpen } = useLessonModal((state) => state);

  return (
    <>
      <Svg width="100" height="180" style={{ marginBottom: -36, marginTop: -106 }}>
        <Line x1="55%" y1="0" x2="55%" y2="100%" stroke={Colors.gray_50} strokeWidth="80" />
        <Line x1="55%" y1="0" x2="55%" y2="100%" stroke={Colors.gray_200} strokeWidth="15" />
      </Svg>

      <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
        <View style={styles.unlockedLessonContainer}>
          <LessonButton
            left={calculateLeftPosition(index)}
            onPress={() => {
              addLessonId(lesson.id);
              onOpen();
            }}
            scale={0.9}
          />
        </View>
      </Animatable.View>
    </>
  );
}

function LockedOrCompletedLesson({ index, isLessonLocked, isLessonCompleted, lesson }) {
  const { addLessonId, addLessonStatus, onOpen } = useLessonModal((state) => state);

  return (
    <>
      <Svg width="100" height="160" style={{ marginBottom: -36, marginTop: -106 }}>
        <Line x1="55%" y1="0" x2="55%" y2="100%" stroke={Colors.gray_50} strokeWidth="80" />
        <Line x1="55%" y1="0" x2="55%" y2="100%" stroke={isLessonCompleted ? Colors.success_500 : Colors.gray_200} strokeWidth="15" />
      </Svg>
      <LessonButton
        isCompleted={isLessonCompleted}
        isLocked={isLessonLocked}
        left={calculateLeftPosition(index)}
        onPress={() => {
          if (!isLessonLocked) {
            addLessonId(lesson.id);
            addLessonStatus("completed");
            onOpen();
          }
        }}
        scale={isLessonCompleted ? 0.96 : 0.9}
      />
    </>
  );
}

function BottomContainer({ onPress }) {
  return (
    <View style={styles.bottomContainer}>
      <Image source={require("../../../../assets/Door.png")} style={styles.image} />
      <Button text="Siguiente Sección" variant="secondary" rightIcon={<Key size={20} variant="Bold" color={Colors.gray_300} />} onPress={onPress} />
    </View>
  );
}
