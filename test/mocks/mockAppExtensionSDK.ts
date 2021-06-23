import { AppExtensionSDK } from '@contentful/app-sdk'

const mockSdk: Pick<AppExtensionSDK, 'app' | 'notifier'> = {
  app: {
    onConfigure: jest.fn(),
    getParameters: jest.fn().mockReturnValueOnce({}),
    setReady: jest.fn(),
    getCurrentState: jest.fn(),
    isInstalled: jest.fn(),
    onConfigurationCompleted: jest.fn()
  },
  notifier: {
    error: jest.fn(),
    success: jest.fn()
  }
}

const mockFieldExtensionSDK = mockSdk as AppExtensionSDK

export { mockFieldExtensionSDK }

