export enum PlatformProvider {
  GOOGLE = "google",
  DISCORD = "discord",
  TMDB = "tmdb",
}

export const PlatformProviderLabel: Record<PlatformProvider, string> = {
  [PlatformProvider.GOOGLE]: "구글",
  [PlatformProvider.DISCORD]: "디스코드",
  [PlatformProvider.TMDB]: "TMDB",
};
