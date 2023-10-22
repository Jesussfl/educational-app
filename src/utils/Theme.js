const Colors = {
  primary_25: "#F3F4F6",
  primary_50: "#F6E9FB",
  primary_100: "#F1DCF9",
  primary_200: "#E4BEF4",
  primary_300: "#DBA8F0",
  primary_400: "#FFCC33",
  primary_500: "#E5AC00",
  primary_600: "#D7930E",
  primary_700: "#B88014",
  primary_800: "#7E29A3",
  primary_900: "#6E248E",
  gray_25: "#F3F4F6",
  gray_50: "#E2E4E9",
  gray_100: "#CBCED7",
  gray_200: "#BABECA",
  gray_300: "#868CA2",
  gray_400: "#646B82",
  gray_500: "#494E5F",
  gray_600: "#3E4250",
  gray_700: "#31343F",
  gray_800: "#262831",
  gray_900: "#191A1F",
  error_25: "#FFFBFA",
  error_50: "#FEF3F2",
  error_100: "#FEE4E2",
  error_200: "#FECDCA",
  error_300: "#FDA29B",
  error_400: "#F97066",
  error_500: "#F04438",
  error_600: "#D92D20",
  error_700: "#B42318",
  error_800: "#912018",
  error_900: "#7A271A",
  warning_25: "#FFFCF5",
  warning_50: "#FFFAEB",
  warning_100: "#FEF0C7",
  warning_200: "#FEDF89",
  warning_300: "#FEC84B",
  warning_400: "#FDB022",
  warning_500: "#F79009",
  warning_600: "#DC6803",
  warning_700: "#B54708",
  warning_800: "#93370D",
  warning_900: "#792E0D",
  success_25: "#F6FEF9",
  success_50: "#ECFDF3",
  success_100: "#D1FADF",
  success_200: "#A6F4C5",
  success_300: "#6CE9A6",
  success_400: "#32D583",
  success_500: "#12B76A",
  success_600: "#039855",
  success_700: "#027A48",
  success_800: "#05603A",
  success_900: "#054F31",
};
const SemanticColors = {
  app: {
    bg_normal: Colors.gray_25,
    bg_subdued: Colors.gray_50,
  },
  bg: {
    primary_normal: Colors.primary_500,
    primary_active: Colors.primary_600,
    primary_disabled: Colors.gray_100,
    card_inverse: Colors.gray_50,
  },
  elevation: {
    primary_normal: Colors.primary_600,
    primary_active: Colors.primary_700,
    primary_disabled: Colors.gray_100,
    secondary_normal: Colors.gray_200,
  },
  text: {
    normal: Colors.gray_600,
    subdued_normal: Colors.gray_500,
    primary_active: Colors.primary_500,
  },
};
export { Colors, SemanticColors };
