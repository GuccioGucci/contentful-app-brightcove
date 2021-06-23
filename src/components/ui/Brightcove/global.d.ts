declare module '@brightcove/react-player-loader' {
  import React from 'react'
  import { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js'

  type Success = {
    type: 'in-page'
    ref: VideoJsPlayer
  }

  type Props = {
    className?: string
    accountId: string
    videoId: string
    playerId?: string
    options?: VideoJsPlayerOptions
    onSuccess?: (success: Success) => void
  }

  const ReactPlayerLoader: React.FC<Props>

  export default ReactPlayerLoader
}
