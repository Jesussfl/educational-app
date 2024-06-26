import React from "react";
import { CompletionExercise, SimpleSelectionExercise } from "../components";
import TheoryExercise from "../components/theory-exercise";
import { calculateTimeSpent } from "./calculateTimeSpent";
import { useExercises } from "@stores/useExerciseStore";
import PairsExercise from "../components/pairs-exercise";
import MemoryExercise from "../components/memory-exercise";
const EXERCISE_TYPES = {
  simpleSelection: (content, key) => {
    return <SimpleSelectionExercise content={content} key={key} />;
  },
  completion: (content, key) => {
    return <CompletionExercise content={content} key={key} />;
  },
  theory: (content, key) => {
    return <TheoryExercise content={content} key={key} />;
  },
  pairs: (content, key) => {
    return <PairsExercise content={content} key={key} />;
  },
  memory: (content, key) => {
    return <MemoryExercise content={content} key={key} />;
  },
};
export const renderExercise = (currentExercise) => {
  if (!currentExercise) {
    return null;
  }

  const exerciseType = currentExercise.attributes.type;
  const exerciseId = currentExercise.id;
  return EXERCISE_TYPES[exerciseType](currentExercise.attributes.content, exerciseId);
};
