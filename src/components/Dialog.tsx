import React, { useEffect, useState } from 'react';
import { css } from 'emotion';
import { Button, EntityList, EntityListItem, Icon, ModalContent, Spinner } from '@contentful/forma-36-react-components';
import { DialogExtensionSDK } from '@contentful/app-sdk';
import { BrightcoveFolder, BrightcoveVideo } from '../types';
import { AppInstallationParameters } from './ConfigScreen';
import { EntityListSkeleton } from './ui';

interface DialogProps {
  sdk: DialogExtensionSDK;
}

const Dialog = ({ sdk }: DialogProps) => {
  // const { folders } = sdk.parameters.invocation as { folders: BrightcoveFolder[] }
  const { proxyUrl } = sdk.parameters.installation as unknown as AppInstallationParameters

  const [ videos, setVideos ] = useState<BrightcoveVideo[]>([])
  const [ folders, setFolders ] = useState<BrightcoveFolder[]>([])
  const [ folder, setFolder ] = useState<BrightcoveFolder | null>(null)

  useEffect(() => {
    sdk.window.startAutoResizer()

    return () => {
      sdk.window.stopAutoResizer()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  useEffect(() => {
    (async () => {
      const folders: BrightcoveFolder[] = await fetch(`${ proxyUrl }/folders`)
        .then(response => response.json())

      setFolders(folders)
    })()

  }, [proxyUrl])

  useEffect(() => {
    (async () => {
      if (folder) {
        const videos: BrightcoveVideo[] = await fetch(`${ proxyUrl }/folders/${ folder.id }/videos`)
          .then(response => response.json())

        setVideos(videos);
      } else {
        setVideos([]);
      }
    })()
  }, [proxyUrl, folder])

  if (folders.length === 0) {
    return (
      <ModalContent data-testid="modal-spinner">
        <Spinner className={css`margin: 4px auto; display: block;` } />
      </ModalContent>
    )
  }

  if (folder === null) {
    return (
      <ModalContent data-testid="modal-folders">
        <div className={css`margin-bottom: 1rem;`}>
          <Icon icon="Folder" className={css`vertical-align: text-bottom;`} /> Select a Folder:
        </div>
        <EntityList data-testid="folder-list">
          {
            folders.map(folder => (
              <EntityListItem
                data-testid={`${folder.id}-${folder.name}`}
                key={folder.id}
                className={css`cursor: pointer;`}
                title={folder.name}
                contentType={folder.id}
                withThumbnail={false}
                onClick={() => setFolder(folder)}
              />
            ))
          }
        </EntityList>
      </ModalContent>
    )
  }

  return (
    <ModalContent data-testid="modal-videos">
      <Button data-testid="back-to-folders" className={css`margin-bottom: 20px;`} buttonType="muted" onClick={() => setFolder(null)}>
        Back
      </Button>

      {
        videos.length === 0 && <EntityListSkeleton num={folder.video_count} />
      }

      {
        videos.length > 0 && (
          <EntityList>
            {
              videos.map(video => (
                <EntityListItem
                  data-testid={`${video.id}-${video.name}`}
                  key={video.id}
                  className={css`cursor: pointer;`}
                  title={video.name}
                  description={video.description}
                  thumbnailUrl={video.images.thumbnail.src}
                  onClick={() => sdk.close(video)}
                />
              ))
            }
          </EntityList>
        )
      }
    </ModalContent>
  )
};

export default Dialog;
