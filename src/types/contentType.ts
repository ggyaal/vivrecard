export enum ContentType {
  BOOK = "BOOK",
  GAME = "GAME",
  ALBUM = "ALBUM",
  MUSIC = "MUSIC",
  COLLECTION = "COLLECTION",
  SERIES = "SERIES",
  SEASON = "SEASON",
  MOVIE = "MOVIE",
  EPISODE = "EPISODE",
}

export const ContentTypeLabel: Record<ContentType, string> = {
  [ContentType.BOOK]: "책",
  [ContentType.GAME]: "게임",
  [ContentType.ALBUM]: "앨범",
  [ContentType.MUSIC]: "음악",
  [ContentType.COLLECTION]: "영화 콜렉션",
  [ContentType.SERIES]: "시리즈",
  [ContentType.SEASON]: "시즌",
  [ContentType.MOVIE]: "영화",
  [ContentType.EPISODE]: "에피소드",
};
