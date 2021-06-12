import React, { useEffect } from 'react'
import { Button, Flex } from '@contentful/forma-36-react-components'
import { FieldExtensionSDK } from '@contentful/app-sdk'
import { BrightcoveVideo } from '../types'
import { useState } from 'react'

interface FieldProps {
  sdk: FieldExtensionSDK;
}

const Field = ({ sdk }: FieldProps) => {
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

  // If you only want to extend Contentful's default editing experience
  // reuse Contentful's editor components
  // -> https://www.contentful.com/developers/docs/extensibility/field-editors/
  return (
    <Flex marginTop="spacingXs" margin="spacingXs" flexDirection="column">
      {
        videoId && (
          <div>{ videoId }</div>
        )
      }

      <Flex marginTop="spacingXs" alignItems="center">
        <Button buttonType="muted" onClick={openVideoDialog}>Choose Video</Button>
      </Flex>
    </Flex>
  );
};

export default Field;
