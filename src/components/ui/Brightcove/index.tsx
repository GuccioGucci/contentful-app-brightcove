import ReactPlayerLoader from '@brightcove/react-player-loader'

type Props = {
  videoId: string
  accountId: string
  playerId?: string
}

export const Brightcove = ({ videoId, accountId, playerId }: Props) => (
  <ReactPlayerLoader accountId={accountId} playerId={playerId} videoId={videoId} />
)
