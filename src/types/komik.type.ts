export interface KomikItem {
  title: string
  slug: string
  image: string
  type: string
  chapter: string
  rating: string
}

export interface KomikResponse {
  message: boolean
  data: KomikItem[]
}