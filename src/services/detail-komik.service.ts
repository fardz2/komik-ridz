import { ChapterDetailResponse, KomikDetailResponse } from "@/types/detail-komik.type";

export async function getKomikDetail(slug: string): Promise<KomikDetailResponse> {
  try {
    const res = await fetch(`https://api-komik-rho.vercel.app/api/komik/detail/${slug}`, {
            headers: { "Content-Type": "application/json" },
      next: { tags: ['komik'], revalidate:60 }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch komik detail: ${res.status} ${res.statusText}`);
    }

    const data = (await res.json()) as KomikDetailResponse;
    return data;
  } catch (error) {
    console.error("Error fetching komik detail:", error);
    return {
      message: false,
      data: {
        title: "",
        nativeTitle: "",
        slug: "",
        image: "",
        genres: [],
        released: "",
        author: "",
        status: "",
        type: "",
        totalChapter: "?",
        updatedOn: "",
        rating: "0",
        sinopsis: "",
        chapters: [],
      },
    };
  }
}

export async function getChapterDetail(slug: string, chapter: string): Promise<ChapterDetailResponse> {
  try {
    const res = await fetch(`https://api-komik-rho.vercel.app/api/komik/detail/${slug}/${chapter}`, {
      headers: { "Content-Type": "application/json" },
      next: { tags: ['chapter'], revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch chapter detail: ${res.status} ${res.statusText}`);
    }

    const data = (await res.json()) as ChapterDetailResponse;
    return data;
  } catch (error) {
    console.error("Error fetching chapter detail:", error);
    return {
      message: false,
      data: {
          url: "",
          chapter: "",
          images: [],
          prevChapter: "",
          nextChapter: "",
          slug: "",
          chaptersList: []
      },
    };
  }
}
