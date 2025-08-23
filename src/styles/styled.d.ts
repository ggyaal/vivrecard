import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;
    colors: {
      primary: string;
      secondary: string;
      sidebar: string;
      background: string;
      text: string;
      paleText: string;
      shadow: string;
      correct: {
        background: string;
        text: string;
      };
      error: {
        background: string;
        text: string;
      };
    };
    button: {
      primary: {
        background: string;
        text: string;
      };
      secondary: {
        background: string;
        text: string;
      };
      tertiary: {
        background: string;
        text: string;
      };
      disabled: {
        background: string;
        text: string;
      };
    };
    card: {
      basic: {
        background: string;
        border: string;
        text: string;
        paleText: string;
        shadow: string;
      };
      info: {
        background: string;
        border: string;
        text: string;
        paleText: string;
        shadow: string;
      };
      warn: {
        background: string;
        border: string;
        text: string;
        paleText: string;
        shadow: string;
      };
      error: {
        background: string;
        border: string;
        text: string;
        paleText: string;
        shadow: string;
      };
    };
    content: {
      background: string;
      text: string;
      subtext: string;
      star: string;
      block: {
        background: string;
        text: string;
      };
      tag: {
        red: {
          background: string;
          text: string;
        };
        orange: {
          background: string;
          text: string;
        };
        yellow: {
          background: string;
          text: string;
        };
        green: {
          background: string;
          text: string;
        };
        blue: {
          background: string;
          text: string;
        };
        sky: {
          background: string;
          text: string;
        };
        navy: {
          background: string;
          text: string;
        };
      };
    };
    member: {
      level: {
        0: {
          background: string;
          text: string;
        };
        1: {
          background: string;
          text: string;
        };
        2: {
          background: string;
          text: string;
        };
        3: {
          background: string;
          text: string;
        };
        4: {
          background: string;
          text: string;
        };
        5: {
          background: string;
          text: string;
        };
        6: {
          background: string;
          text: string;
        };
        7: {
          background: string;
          text: string;
        };
        8: {
          background: string;
          text: string;
        };
        9: {
          background: string;
          text: string;
        };
      };
    };
    badge: {
      grade: {
        normal: {
          color: string;
        };
        rare: {
          color: string;
        };
        epic: {
          color: string;
        };
        legendary: {
          color: string;
        };
        mythic: {
          color: string;
        };
      };
    };
    discord: {
      background: string;
      text: string;
    };
    google: {
      background: string;
      text: string;
    };
  }
}

export type TagColor =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "sky"
  | "navy";
