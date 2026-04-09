
export const SIDEBAR_CONFIG = {
  MIN_WIDTH: 240,
  MAX_WIDTH: 500,
  DEFAULT_WIDTH: 320,
};

export const UI_CONFIG = {
  HEADER_HEIGHT: 48,
  ANIMATION_DURATION: 200,
  TEXTAREA_MIN_HEIGHT: 96,
};

export const MOCK_CODE_SEQUENCE = [
  {
    text: "Adding the button component...",
    code: `export function Button({ children }) {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded">
      {children}
    </button>
  )
}`
  },
  {
    text: "Configuring styles...",
    code: `const styles = {
  container: "flex flex-col items-center justify-center min-h-screen",
  heading: "text-4xl font-bold mb-4",
  paragraph: "text-lg text-gray-600 mb-8"
}`
  },
  {
    text: "Setting up event handlers...",
    code: `const handleClick = () => {
  setCount(prev => prev + 1);
  console.log("Button clicked!");
}`
  }
];

export const MODELS = [
  {
    id: 'gemini-3-flash-preview',
    name: 'Gemini 3 Flash',
    description: 'Lightning fast response with high reasoning capabilities.'
  },
  {
    id: 'gemini-3-pro-preview',
    name: 'Gemini 3 Pro',
    description: 'Top-tier reasoning and coding capabilities for complex apps.',
    default: true
  }
];
