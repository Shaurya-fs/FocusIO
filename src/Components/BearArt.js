import { createContext, useContext } from "react";
import { getBearArt } from "../data/bears";

// The pictures of the bear the person picked. Every screen reads them from here,
// so changing the bear or outfit in Settings changes it everywhere at once.
export const BearArtContext = createContext(getBearArt("bruno", "uni"));

export function useBearArt() {
  return useContext(BearArtContext);
}
