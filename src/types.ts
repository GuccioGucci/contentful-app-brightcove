export type BrightcoveFolder = {
  account_id: string
  created_at: string
  id: string
  name: string
  updated_at: string
  video_count: number
}

export type BrightcoveVideo = {
  account_id: string
  created_at: string
  id: string
  name: string
  updated_at: string
  description: string
  long_description: string
  state: string
  tags: string[]
  duration: number
  images: {
    poster: {
      src: string
    }
    thumbnail: {
      src: string
    }
  }
}