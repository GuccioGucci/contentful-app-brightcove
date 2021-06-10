import { FieldExtensionSDK } from '@contentful/field-editor-shared'

const mockSdk: Pick<FieldExtensionSDK, 'parameters' | 'window' | 'dialogs'> = {
  parameters: {
    instance: {},
    installation: {
      proxyUrl: 'http://example.com/api'
    }
  },
  window: {
    updateHeight: jest.fn(),
    startAutoResizer: jest.fn(),
    stopAutoResizer: jest.fn()
  },
  dialogs: {
    openAlert: jest.fn(),
    openConfirm: jest.fn(),
    openCurrent: jest.fn(),
    openCurrentApp: jest.fn(),
    openExtension: jest.fn(),
    openPrompt: jest.fn(),
    selectMultipleAssets: jest.fn(),
    selectMultipleEntries: jest.fn(),
    selectSingleAsset: jest.fn(),
    selectSingleEntry: jest.fn(),
  }
}

const mockFieldExtensionSDK = mockSdk as FieldExtensionSDK

export { mockFieldExtensionSDK }
