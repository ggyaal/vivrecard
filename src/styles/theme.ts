import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  borderRadius: "5px",
  colors: {
    primary: "#4e5362ff",
    secondary: "#7A5A2F",
    sidebar: "#2B2E4A",
    background: "#202020",
    text: "#CCCCCC",
    paleText: "#A0A0A0",
    shadow: "rgba(255, 255, 255, 0.3)",
    correct: {
      background: "#276d40",
      text: "#55f683",
    },
    error: {
      background: "#781919",
      text: "#f26969",
    },
  },
  button: {
    primary: {
      background: "#3078b0",
      text: "#d0dee7",
    },
    secondary: {
      background: "#962626",
      text: "#e1b7b7",
    },
    tertiary: {
      background: "#404040",
      text: "#aaaaaa",
    },
    disabled: {
      background: "#202020",
      text: "#CCCCCC",
    },
  },
  card: {
    basic: {
      background: "#1c1c1c",
      border: "#3C3F5A",
      text: "#d7d4d4",
      paleText: "#959595",
      shadow: "rgba(0, 0, 0, 0.5)",
    },
    info: {
      background: "#2d323c",
      border: "#50596b",
      text: "#c7d2ec",
      paleText: "#8aa5c9",
      shadow: "rgba(0, 0, 0, 0.5)",
    },
    warn: {
      background: "#3c322d",
      border: "#6b5e50",
      text: "#ecdec7",
      paleText: "#c9ab8a",
      shadow: "rgba(0, 0, 0, 0.5)",
    },
    error: {
      background: "#3c2d2d",
      border: "#6b5050",
      text: "#ecc7c7",
      paleText: "#c98a8a",
      shadow: "rgba(0, 0, 0, 0.5)",
    },
  },
  content: {
    background: "#1c1c1c",
    text: "#FFF",
    subtext: "#ccc",
    star: "#eded91",
    block: {
      background: "#333",
      text: "#FFF",
    },
    tag: {
      default: {
        border: "#b7b7b7",
        background: "#1c1c1c",
        text: "#bcbcbc",
      },
      red: {
        border: "#db6a6a",
        background: "#a82121",
        text: "#ffc0c0",
      },
      orange: {
        border: "#bf9263",
        background: "#c26918",
        text: "#dbcbb1",
      },
      yellow: {
        border: "#dbdf63",
        background: "#bcac33",
        text: "#fefe68",
      },
      green: {
        border: "#7ec75f",
        background: "#338c37",
        text: "#b3ffb6",
      },
      blue: {
        border: "#7ab7d3",
        background: "#276eac",
        text: "#93bbe5",
      },
      sky: {
        border: "#93d6dc",
        background: "#6a819a",
        text: "#b6cee4",
      },
      navy: {
        border: "#414b71",
        background: "#0a1036",
        text: "#8086ad",
      },
      puple: {
        border: "#8c65ac",
        background: "#6d309f",
        text: "#bd95df",
      },
    },
  },
  member: {
    level: {
      0: {
        background: "#bfbdbd",
        text: "#5e5e5e",
      },
      1: {
        background: "#cccc20",
        text: "#5e5e5e",
      },
      2: {
        background: "#c18b26",
        text: "#4a4a4a",
      },
      3: {
        background: "#4da02b",
        text: "#c5c5c5",
      },
      4: {
        background: "#ca3535",
        text: "#b3b2b2",
      },
      5: {
        background: "#2d51bf",
        text: "#bcbaba",
      },
      6: {
        background: "#893cc0",
        text: "#c5c0c0",
      },
      7: {
        background: "#32b29a",
        text: "#515050",
      },
      8: {
        background: "#d537c5",
        text: "#dad8d8",
      },
      9: {
        background: "#93cc30",
        text: "#646464",
      },
    },
  },
  badge: {
    grade: {
      normal: {
        backgrond: "#3d3d3d",
        border: "#9f9f9f",
        color: "#ddd0d0",
      },
      rare: {
        backgrond: "#4c65b2",
        border: "#84a0f1",
        color: "#b0c4ff",
      },
      epic: {
        backgrond: "#8b42bc",
        border: "#d395fc",
        color: "#d99fff",
      },
      legendary: {
        backgrond: "#b39d38",
        border: "#e6d175",
        color: "#ffe56d",
      },
      mythic: {
        backgrond: "#b13939",
        border: "#ef5f5f",
        color: "#fe7676",
      },
    },
  },
  discord: {
    background: "#1F1F1F",
    text: "#c8c8c8ff",
  },
  google: {
    background: "#131314",
    text: "#E3E3E3",
  },
};

export const lightTheme: DefaultTheme = {
  borderRadius: "5px",
  colors: {
    primary: "#98A1BC",
    secondary: "#DED3C4",
    sidebar: "#555879",
    background: "#DFDFDF",
    text: "#2a2a3b",
    paleText: "#7a7a7a",
    shadow: "rgba(0, 0, 0, 0.3)",
    correct: {
      background: "#9affbf",
      text: "#22a744",
    },
    error: {
      background: "#ffbdbd",
      text: "#c93737",
    },
  },
  button: {
    primary: {
      background: "#69cdff",
      text: "#334245",
    },
    secondary: {
      background: "#ff6969",
      text: "#393131",
    },
    tertiary: {
      background: "#cad4d9",
      text: "#666666",
    },
    disabled: {
      background: "#202020",
      text: "#CCCCCC",
    },
  },
  card: {
    basic: {
      background: "#F5F5F5",
      border: "#b7b7b7",
      text: "#2a2a3b",
      paleText: "#7a7a7a",
      shadow: "rgba(0, 0, 0, 0.1)",
    },
    info: {
      background: "#ebf0f9",
      border: "#98aacf",
      text: "#1c202a",
      paleText: "#535d6a",
      shadow: "rgba(0, 0, 0, 0.5)",
    },
    warn: {
      background: "#ffeede",
      border: "#cfb498",
      text: "#2a241c",
      paleText: "#6a5e53",
      shadow: "rgba(0, 0, 0, 0.5)",
    },
    error: {
      background: "#ffe8e8",
      border: "#cf9898",
      text: "#2a1c1c",
      paleText: "#6a5353",
      shadow: "rgba(0, 0, 0, 0.5)",
    },
  },
  content: {
    background: "#FFF",
    text: "#1C1C1C",
    subtext: "#ccc",
    star: "#cfcf73",
    block: {
      background: "#e9ecef",
      text: "#303030",
    },
    tag: {
      default: {
        border: "#1c1c1c",
        background: "#f7f7f7",
        text: "#424242",
      },
      red: {
        border: "#9b5e5e",
        background: "#f55353",
        text: "#782727",
      },
      orange: {
        border: "#ae8b63",
        background: "#ffa34e",
        text: "#86683a",
      },
      yellow: {
        border: "#b7b761",
        background: "#ffea47",
        text: "#7a7a41",
      },
      green: {
        border: "#46b630",
        background: "#87f78b",
        text: "#579159",
      },
      blue: {
        border: "#6076cf",
        background: "#6fb4ff",
        text: "#2981c9",
      },
      sky: {
        border: "#6699c5",
        background: "#b3dcff",
        text: "#295d95",
      },
      navy: {
        border: "#111850",
        background: "#6a73ac",
        text: "#080c24",
      },
      puple: {
        border: "#6b4f83",
        background: "#bd78ef",
        text: "#4a305d",
      },
    },
  },
  member: {
    level: {
      0: {
        background: "#bfbdbd",
        text: "#5e5e5e",
      },
      1: {
        background: "#eded20",
        text: "#5e5e5e",
      },
      2: {
        background: "#dea02d",
        text: "#4a4a4a",
      },
      3: {
        background: "#5abf32",
        text: "#3a3a3a",
      },
      4: {
        background: "#ff4646",
        text: "#CCCCCC",
      },
      5: {
        background: "#3966ed",
        text: "#CCCCCC",
      },
      6: {
        background: "#a247e3",
        text: "#dddada",
      },
      7: {
        background: "#3ed0b5",
        text: "#646464",
      },
      8: {
        background: "#f740e5",
        text: "#2d2d2d",
      },
      9: {
        background: "#a7ec30",
        text: "#353535",
      },
    },
  },
  badge: {
    grade: {
      normal: {
        backgrond: "#dedede",
        border: "#7d7d7d",
        color: "#3c3a3a",
      },
      rare: {
        backgrond: "#7695f4",
        border: "#3257c8",
        color: "#2852ce",
      },
      epic: {
        backgrond: "#cc80ff",
        border: "#8634bc",
        color: "#9625e1",
      },
      legendary: {
        backgrond: "#fbe78b",
        border: "#b49d36",
        color: "#b29517",
      },
      mythic: {
        backgrond: "#f66e6e",
        border: "#c23e3e",
        color: "#c33131",
      },
    },
  },
  discord: {
    background: "#5865F2",
    text: "#FFFFFF",
  },
  google: {
    background: "#FFFFFF",
    text: "#1F1F1F",
  },
};
