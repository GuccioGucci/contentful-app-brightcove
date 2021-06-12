import { DialogExtensionSDK } from '@contentful/app-sdk'
import { BrightcoveFolder } from '../../src/types';

const mockSdk: Pick<DialogExtensionSDK, 'window' | 'parameters' | 'close'> = {
  close: jest.fn(),
  window: {
    updateHeight: jest.fn(),
    startAutoResizer: jest.fn(),
    stopAutoResizer: jest.fn()
  },
  parameters: {
    instance: {},
    installation: {
      proxyUrl: 'http://example.com/api'
    },
    invocation: {
      folders: [
        {
          id: '123ABC',
          account_id: 'ACCOUNT1',
          created_at: '2021',
          name: 'Folder Name',
          updated_at: '2021',
          video_count: 12
        }
      ] as BrightcoveFolder[]
    }
  },
}

const mockDialogExtensionSDK = mockSdk as DialogExtensionSDK

export { mockDialogExtensionSDK }
