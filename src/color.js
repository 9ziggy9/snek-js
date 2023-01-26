export const COLORS_SOLARIZED = {
  "my-black": "#002b36",
  "my-blue": "#073642",
  "my-dark-gray": "#586e75",
  "my-light-gray": "#657b83",
  "my-lighter-gray": "#839496",
  "my-white": "#eee8d5",
  "my-light-white": "#fdf6e3",
  "my-light-blue": "#268bd2",
  "my-cyan": "#2aa198",
  "my-green": "#859900",
  "my-red": "#dc322f",
  "my-magenta": "#d33682",
  "my-violet": "#6c71c4",
  "my-orange": "#cb4b16",
  "my-yellow": "#b58900",
};

export const randColor = (cs) => Object.values(cs)
  .slice(5)[Math.floor(Math.random() * 10)];
