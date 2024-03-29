import { create } from "zustand";

const initialState = {
  isOpen: false,
  lessonId: null,
  lessonType: null,
  lessonStatus: null,
  isLastLesson: false,
  lessonDescription: null,
  sectionIndex: null,
  currentCoords: null,
  sectionCoords: null,
  ref: null,
};

export const useLessonStore = create((set) => {
  return {
    ...initialState,

    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),

    addIsLastLesson: (isLastLesson) => set({ isLastLesson }),
    removeIsLastLesson: () => set({ isLastLesson: false }),

    addLessonId: (lessonId) => set({ lessonId }),
    removeLessonId: () => set({ lessonId: null }),

    addLessonType: (lessonType) => set({ lessonType }),
    removeLessonType: () => set({ lessonType: null }),

    addLessonStatus: (lessonStatus) => set({ lessonStatus }),
    removeLessonStatus: () => set({ lessonStatus: null }),

    addLessonDescription: (lessonDescription) => set({ lessonDescription }),
    removeLessonDescription: () => set({ lessonDescription: null }),

    addSectionIndex: (sectionIndex) => set({ sectionIndex }),
    addRef: (ref) => set({ ref }),
    removeRef: () => set({ ref: null }),

    addCurrentCoords: (currentCoords) => set({ currentCoords }),
    addSectionCoords: (sectionCoords) => set({ sectionCoords }),
    removeCurrentCoords: () => set({ currentCoords: null }),
    reset: () => {
      set(initialState);
    },
  };
});
