import React, { useEffect } from 'react';
import { Button, Flex } from '@contentful/forma-36-react-components';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { AppInstallationParameters } from './ConfigScreen'

interface FieldProps {
  sdk: FieldExtensionSDK;
}

type BrightcoveFolder = {
  account_id: string
  created_at: string
  id: string
  name: string
  updated_at: string
  video_count: number
}

const Field = ({ sdk }: FieldProps) => {
  const { proxyUrl } = sdk.parameters.installation as unknown as AppInstallationParameters

  useEffect(() => {
    sdk.window.startAutoResizer();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function openVideoDialog() {
    const folders: BrightcoveFolder = await fetch(`${ proxyUrl }/folders`).then(r => r.json())

    sdk.dialogs.openCurrent({
      title: 'Choose a video',
      parameters: {
        folders
      }
    })
  }

  // If you only want to extend Contentful's default editing experience
  // reuse Contentful's editor components
  // -> https://www.contentful.com/developers/docs/extensibility/field-editors/
  return (
    <Flex marginTop="spacingXs" margin="spacingXs" alignItems="center">
      <Button buttonType="muted" onClick={ openVideoDialog }>Choose Video</Button>
    </Flex>
  );
};

export default Field;
