import type { KomikResponse } from "@/types/komik.type"

export async function getHotKomik(): Promise<KomikResponse> {
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