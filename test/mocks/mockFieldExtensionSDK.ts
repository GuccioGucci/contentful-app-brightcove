import { FieldExtensionSDK } from '@contentful/field-editor-shared'

const mockSdk: Pick<FieldExtensionSDK, 'parameters' | 'window' | 'dialogs' | 'field'> = {
  parameters: {
    instance: {},
    installation: {
      proxyUrl: 'http://example.com/api'
    }
  },
  field: {
    id: 'video-id',
    locale: 'en',
    required: false,
    type: 'something',
    validations: [],
    setValue: jest.fn(),
    getValue: jest.fn(),
    removeValue: jest.fn(),
    onValueChanged: jest.fn(),
    onIsDisabledChanged: jest.fn(),
    setInvalid: jest.fn(),
    onSchemaErrorsChanged: jest.fn(),
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
