/**
 * Pure tween math for the mobile journey carousel. Kept free of Embla and DOM
 * types so the mapping can be exercised in isolation.
 */

const TWEEN = {
  scale: 0.14,
  translateY: 10,
  /**
   * Percentage of its own width a neighbour is pulled toward the centre. Not in
   * the original brief, but without it slides sit side by side and the active
   * card never overlaps them.
   */
  pull: 14,
  opacity: 0.35,
  shadow: 0.28,
} as const;

type SlideTween = {
  transform: string;
  opacity: number;
  shadowAlpha: number;
  zIndex: number;
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const round = (value: number, places: number) => {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
};

/**
 * Signed distance from a snap point to the current scroll position. In loop
 * mode a slide rendered on the far side of the track reports a target of ±1,
 * and its diff has to be measured across the seam instead of directly.
 */
export function wrapDiff(
  scrollSnap: number,
  scrollProgress: number,
  loopSign: number,
): number {
  if (loopSign === -1) return scrollSnap - (1 + scrollProgress);
  if (loopSign === 1) return scrollSnap + (1 - scrollProgress);
  return scrollSnap - scrollProgress;
}

/**
 * Signed diff for the resting layout, where slide 0 sits centred. Lets the
 * server render the same values the tween writes on mount, so the carousel
 * doesn't flash an untweened frame before hydration.
 */
export function restingDiff(index: number, count: number): number {
  return (index <= count / 2 ? index : index - count) / count;
}

/** 0 when centred, 1 when a full slide away or further. */
function snapDistance(diffToTarget: number, snapCount: number): number {
  return clamp01(Math.abs(diffToTarget) * snapCount);
}

export function tweenSlide(
  diffToTarget: number,
  snapCount: number,
): SlideTween {
  const distance = snapDistance(diffToTarget, snapCount);
  const pull = -Math.sign(diffToTarget) * TWEEN.pull * distance;

  return {
    transform: `translate3d(${round(pull, 2)}%, ${round(TWEEN.translateY * distance, 2)}px, 0) scale(${round(1 - TWEEN.scale * distance, 4)})`,
    opacity: round(1 - TWEEN.opacity * distance, 4),
    shadowAlpha: round(TWEEN.shadow * (1 - distance), 4),
    zIndex: distance < 0.5 ? 10 : 1,
  };
}
