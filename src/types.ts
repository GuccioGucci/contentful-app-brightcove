export type BrightcoveFolder = {
  account_id: string
  created_at: string
  id: string
  name: string
  updated_at: string
  video_count: number
}

type Source = {
  src: string
  height: number
  width: number
}

type Image = {
  src: string
  sources: Source[]
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
    poster?: Image
    thumbnail?: Image
  }
}