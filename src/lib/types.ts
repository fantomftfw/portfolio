// Define section types
export enum Section {
  MAIN = 'main',
  ABOUT = 'about',
  PROJECTS = 'projects',
  SKILLS = 'skills',
  CONTACT = 'contact'
}

// Event for scene navigation
export interface NavigateSceneEvent extends CustomEvent {
  detail: {
    section: Section;
  };
}

// Declare custom events
declare global {
  interface WindowEventMap {
    'navigate-scene': NavigateSceneEvent;
  }
} 