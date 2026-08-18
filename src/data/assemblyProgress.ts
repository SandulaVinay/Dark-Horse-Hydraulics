/**
 * Shared, frame-safe scroll progress for the Three.js assembly scene.
 *
 * ScrollTrigger writes to this mutable value; the R3F render loop reads it.
 * Keeping this outside React state avoids a component re-render on every
 * scroll tick while still giving the 3D scene a smooth, deterministic input.
 */
export const assemblyProgress = {
  value: 0,
};
