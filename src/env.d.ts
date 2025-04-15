// Needed for styled-jsx
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Add module declarations for any non-TS modules
declare module '@react-three/fiber';
declare module '@react-three/drei';
declare module '@react-three/cannon'; 