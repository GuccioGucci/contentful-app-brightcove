import React, { useEffect, useState } from 'react'
import { Button, Flex } from '@contentful/forma-36-react-components'
import { FieldExtensionSDK } from '@contentful/app-sdk'
import { BrightcoveVideo } from '../types'
import { Brightcove } from './ui/Brightcove'
import { AppInstallationParameters } from './ConfigScreen'

interface FieldProps {
  sdk: FieldExtensionSDK;
}

const Field = ({ sdk }: FieldProps) => {
  const { accountId, playerId } = sdk.parameters.installation as unknown as AppInstallationParameters

  const [ videoId, setVideoId ] = useState<string>()

  useEffect(() => {
    sdk.window.startAutoResizer();

    // Handler for external field value changes (e.g. when multiple authors are working on the same entry).
    sdk.field.onValueChanged(setVideoId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function openVideoDialog() {
    sdk.dialogs.openCurrent({
      title: 'Choose a video',
    })
    .then((video?: BrightcoveVideo) => {
      if (video) {
        sdk.field.setValue(video.id)
      }
    })
  }

  function removeFieldValue() {
    sdk.field.removeValue()
  }

  // If you only want to extend Contentful's default editing experience
  // reuse Contentful's editor components
  // -> https://www.contentful.com/developers/docs/extensibility/field-editors/
  return (
    <Flex marginTop="spacingXs" margin="spacingXs" flexDirection="column">

      {
        videoId && <Brightcove accountId={accountId} playerId={playerId} videoId={videoId} />
      }

      <Flex marginTop="spacingXs" alignItems="center">
        <Button data-testid="choose-video" buttonType="muted" onClick={openVideoDialog}>Choose Video</Button>
        { sdk.field.getValue() && <Button data-testid="clean" buttonType="muted" onClick={removeFieldValue} style={{ marginLeft: '5px' }}>Clean</Button> }
      </Flex>
    </Flex>
  );
};

export default Field;
