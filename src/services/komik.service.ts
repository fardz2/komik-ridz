import type { ComicFilters, HotKomikResponse, KomikItem, KomikResponse, PaginationType } from "@/types/komik.type"


export async function getHotKomik(): Promise<HotKomikResponse> {
  try {
    const res = await fetch(`${process.env.API_URL}/komik`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { tags: ['komik'], revalidate:60 }
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`)
    }

    const data = (await res.json()) as KomikResponse

    return data
  } catch (error) {
    console.error("Error fetching hot komik:", error)
    return { message: false, data: [] }
  }
}

export async function getDaftarKomik(filters: ComicFilters = { page: 1 }): Promise<KomikResponse> {
  try {
    const params = new URLSearchParams();
    
    // Add page parameter
    params.set("page", (filters.page || 1).toString());

    // Add genre parameters
    if (filters.genre && filters.genre.length > 0) {
      filters.genre.forEach((genre) => params.append("genre[]", genre.toLowerCase()));
    }

    // Add status parameter
    if (filters.status && filters.status !== "All") {
      params.set("status", filters.status.toLowerCase());
    }

    // Add type parameter
    if (filters.type && filters.type !== "All") {
      params.set("type", filters.type.toLowerCase());
    }

    // Add orderby parameter
    if (filters.orderby && filters.orderby !== "All") {
      const orderbyMap: { [key: string]: string } = {
        "A-Z": "titleasc",
        "Z-A": "titledsc",
        Update: "update",
        Popular: "popular",
      };
      params.set("orderby", orderbyMap[filters.orderby] || filters.orderby.toLowerCase());
    }

    const res = await fetch(`${process.env.API_URL}/komik/daftar-komik?${params.toString()}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    const comics: KomikItem[] = json?.data?.comics || [];
    const pagination: PaginationType | undefined = json?.data?.pagination;

    return {
      message: json.message ?? false,
      data: comics,
      pagination,
    };
  } catch (error) {
    console.error("Error fetching daftar komik:", error);
    return { message: false, data: [] };
  }
}