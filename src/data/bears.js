import bearWave from "../assets/bear/bear-wave.png";
import bearCalm from "../assets/bear/bear-calm.png";
import bearWrite from "../assets/bear/bear-write.png";
import bearThumbsUp from "../assets/bear/bear-thumbsup.png";
import bearPlan from "../assets/bear/bear-plan.png";
import bearIdea from "../assets/bear/bear-idea.png";
import bearHeart from "../assets/bear/bear-heart.png";
import bearProud from "../assets/bear/bear-proud.png";
import bearCoffee from "../assets/bear/bear-coffee.png";
import bearCurious from "../assets/bear/bear-curious.png";
import bearHug from "../assets/bear/bear-hug.png";
import bearHeadphones from "../assets/bear/bear-headphones.png";
import bearSleep from "../assets/bear/bear-sleep.png";
import bearClimb from "../assets/bear/bear-climb.png";

import uniFull from "../assets/outfits/bruno-uni.webp";
import uniThumb from "../assets/outfits/bruno-uni-thumb.webp";
import uniBust from "../assets/outfits/bruno-uni-bust.webp";
import uniFace from "../assets/outfits/bruno-uni-face.webp";
import streetFull from "../assets/outfits/bruno-street.webp";
import streetThumb from "../assets/outfits/bruno-street-thumb.webp";
import streetBust from "../assets/outfits/bruno-street-bust.webp";
import streetFace from "../assets/outfits/bruno-street-face.webp";
import punkFull from "../assets/outfits/bruno-punk.webp";
import punkThumb from "../assets/outfits/bruno-punk-thumb.webp";
import punkBust from "../assets/outfits/bruno-punk-bust.webp";
import punkFace from "../assets/outfits/bruno-punk-face.webp";
import cozyFull from "../assets/outfits/bruno-cozy.webp";
import cozyThumb from "../assets/outfits/bruno-cozy-thumb.webp";
import cozyBust from "../assets/outfits/bruno-cozy-bust.webp";
import cozyFace from "../assets/outfits/bruno-cozy-face.webp";
import officeFull from "../assets/outfits/bruno-office.webp";
import officeThumb from "../assets/outfits/bruno-office-thumb.webp";
import officeBust from "../assets/outfits/bruno-office-bust.webp";
import officeFace from "../assets/outfits/bruno-office-face.webp";
import clarksonFull from "../assets/outfits/clarkson.webp";
import clarksonThumb from "../assets/outfits/clarkson-thumb.webp";
import clarksonBust from "../assets/outfits/clarkson-bust.webp";
import clarksonFace from "../assets/outfits/clarkson-face.webp";

export const MOODS = {
  wave: bearWave,
  calm: bearCalm,
  write: bearWrite,
  thumbsup: bearThumbsUp,
  plan: bearPlan,
  idea: bearIdea,
  heart: bearHeart,
  proud: bearProud,
  coffee: bearCoffee,
  curious: bearCurious,
  hug: bearHug,
  headphones: bearHeadphones,
  sleep: bearSleep,
  climb: bearClimb,
};

export const OUTFITS = [
  { id: "uni", label: "University", full: uniFull, thumb: uniThumb, bust: uniBust, face: uniFace, alt: "a navy varsity sweater, chinos and trainers" },
  { id: "street", label: "Streetwear", full: streetFull, thumb: streetThumb, bust: streetBust, face: streetFace, alt: "a cap, an oversized green hoodie, cargo trousers and chunky trainers" },
  { id: "punk", label: "Berlin punk", full: punkFull, thumb: punkThumb, bust: punkBust, face: punkFace, alt: "a black leather biker jacket, a chain, black jeans and combat boots" },
  { id: "cozy", label: "Cosy", full: cozyFull, thumb: cozyThumb, bust: cozyBust, face: cozyFace, alt: "an open knitted cardigan, striped pyjamas and slippers" },
  { id: "office", label: "Office", full: officeFull, thumb: officeThumb, bust: officeBust, face: officeFace, alt: "a navy blazer, a light blue shirt, grey trousers and loafers" },
];

const CLARKSON_LOOK = {
  id: "clarkson",
  full: clarksonFull,
  thumb: clarksonThumb,
  bust: clarksonBust,
  face: clarksonFace,
  alt: "a tweed flat cap, a bow tie, a cream cardigan, corduroy trousers with braces and brogues",
};

export const BEARS = [
  { id: "bruno", name: "Bruno", thumb: uniThumb },
  { id: "clarkson", name: "Clarkson", thumb: clarksonThumb },
];

export function getBearLook(bearId, outfitId) {
  if (bearId === "clarkson") {
    return CLARKSON_LOOK;
  }
  return OUTFITS.find((o) => o.id === outfitId) || OUTFITS[0];
}

// The mood poses (waving, sleeping, thumbs up...) were drawn for Bruno in his university outfit.
// Any other bear or outfit uses its own picture for every mood, so the same character
// shows up on every screen.
export function getBearArt(bearId, outfitId) {
  const look = getBearLook(bearId, outfitId);
  if (look.id === "uni") {
    return { ...MOODS, posed: true };
  }
  const art = { posed: false };
  Object.keys(MOODS).forEach((mood) => {
    art[mood] = look.bust;
  });
  return art;
}
