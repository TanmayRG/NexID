declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        'camera-orbit'?: string;
        'camera-target'?: string;
        'field-of-view'?: string;
        exposure?: string;
        'shadow-intensity'?: string;
        'auto-rotate'?: boolean;
        'interaction-prompt'?: string;
        'interaction-prompt-style'?: 'basic' | 'wiggle';
        'interaction-policy'?: 'allow-when-focused' | 'always-allow';
        'camera-controls'?: boolean;
        'touch-action'?: string;
        'rotation-per-second'?: string;
        'min-camera-orbit'?: string;
        'max-camera-orbit'?: string;
        'min-field-of-view'?: string;
        'max-field-of-view'?: string;
        'orbit-sensitivity'?: number;
        bounds?: string;
        loading?: 'auto' | 'lazy' | 'eager';
        poster?: string;
        reveal?: 'auto' | 'manual' | 'interaction';
        ar?: boolean;
        'ar-modes'?: string;
        'environment-image'?: string;
        skybox?: string;
        'animation-name'?: string;
        'animation-crossfade-duration'?: number;
      },
      HTMLElement
    >;
  }
} 