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
      error: string;
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
        primary: string;
        secondary: string;
        text: string;
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
