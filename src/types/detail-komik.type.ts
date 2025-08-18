

export interface Chapter {
  title: string;
  url: string;
  updatedAt: string;
}

export interface KomikDetail {
  title: string;
  nativeTitle: string;
  slug: string;
  image: string;
  genres: string[];
  released: string;
  author: string;
  status: string;
  type: string;
  totalChapter: string;
  updatedOn: string;
  rating: string;
  sinopsis: string;
  chapters: Chapter[];
}
export interface ChapterDetail {
  url: string;
  slug: string;
  chapter: string;
  images: string[];
  chaptersList: ChapterList[];
  prevChapter: string | null;
  nextChapter: string | null;
}
export interface ChapterList {
  title: string;
  url: string;
}[]
export interface KomikDetailResponse {
  message: boolean;
  data: KomikDetail;
}
export interface ChapterDetailResponse {
  message: boolean;
  data: ChapterDetail;
}