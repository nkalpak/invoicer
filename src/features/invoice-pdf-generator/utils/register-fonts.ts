import { Font } from "@react-pdf/renderer";
// @ts-ignore
import FiraSansRegular from "../../../assets/fonts/FiraSans-Regular.ttf";
// @ts-ignore
import FiraSansMedium from "../../../assets/fonts/FiraSans-Medium.ttf";
// @ts-ignore
import FiraSansBold from "../../../assets/fonts/FiraSans-Bold.ttf";

export function registerFonts() {
  Font.register({
    family: "Fira Sans",
    fonts: [
      { src: FiraSansRegular },
      { src: FiraSansMedium, fontWeight: 500 },
      { src: FiraSansBold, fontWeight: 700 },
    ],
  });
}
