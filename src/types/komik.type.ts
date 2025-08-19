export interface KomikItem {
  title: string
  slug: string
  image: string
  type: string
  chapter: string
  rating: string
}

export interface HotKomikResponse {
  message: boolean
  data: KomikItem[]
}
export interface PaginationType {
  currentPage: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface KomikResponse {
  message: boolean
  data: KomikItem[]
  pagination?: PaginationType
}
export interface ComicFilters {
  genre?: string[];
  status?: string;
  type?: string;
  orderby?: string;
  page?: number;
}