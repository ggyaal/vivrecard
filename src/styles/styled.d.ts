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
      shadow: string;
      error: string;
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
