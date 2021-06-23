import React from 'react';
import ConfigScreen, { AppInstallationParameters } from './ConfigScreen';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockFieldExtensionSDK } from '../../test/mocks/mockAppExtensionSDK';

describe('Config Screen component', () => {
  it('component text exists', async () => {
    const { getByText } = render(<ConfigScreen sdk={mockFieldExtensionSDK} />)

    expect(
      getByText('The Brightcove app is a widget that allows editors to select video from their Brightcove account. Select or upload a file on Brightcove and designate the assets that you want your entry to reference.')
    ).toBeInTheDocument();
  })

  it('should properly send back the parameters that are already stored into the application', async () => {
    (mockFieldExtensionSDK.app.getParameters as jest.Mock).mockResolvedValue({
      proxyUrl: 'http://example.com/api',
      accountId: 'account-1234',
      playerId: 'player-1234'
    } as AppInstallationParameters)

    await act(async () => {
      await render(<ConfigScreen sdk={mockFieldExtensionSDK} />)
    })

    await waitFor(() => {
      expect(screen.getByTestId('proxyUrl')).toHaveValue('http://example.com/api')
      expect(screen.getByTestId('accountId')).toHaveValue('account-1234')
      expect(screen.getByTestId('playerId')).toHaveValue('player-1234')
    })

    const [lastOnConfigure] = (mockFieldExtensionSDK.app.onConfigure as jest.Mock).mock.calls.pop();

    expect(lastOnConfigure()).toEqual({
      parameters: {
        proxyUrl: 'http://example.com/api',
        accountId: 'account-1234',
        playerId: 'player-1234'
      }
    })
  })

  it('should throw an error when the proxyUrl is not set', async () => {
    render(<ConfigScreen sdk={mockFieldExtensionSDK} />)

    const [lastOnConfigure] = (mockFieldExtensionSDK.app.onConfigure as jest.Mock).mock.calls.pop();

    lastOnConfigure()

    expect(mockFieldExtensionSDK.notifier.error).toHaveBeenCalledWith('The field "Proxy URL" is required.')
  })

  it('should throw an error when the accountId is not set', async () => {
    const { getByTestId } = render(<ConfigScreen sdk={mockFieldExtensionSDK} />)

    act(() => {
      fireEvent.change(getByTestId('proxyUrl'), { target: { value: 'http://example.com/api' } })
    })

    const [lastOnConfigure] = (mockFieldExtensionSDK.app.onConfigure as jest.Mock).mock.calls.pop();

    lastOnConfigure()

    expect(mockFieldExtensionSDK.notifier.error).toHaveBeenCalledWith('The field "Brightcove Account Id" is required.')
  })

  it('should not throw an error when the playerId is not set since it is not a mandatory field', async () => {
    const { getByTestId } = render(<ConfigScreen sdk={mockFieldExtensionSDK} />)

    act(() => {
      fireEvent.change(getByTestId('proxyUrl'), { target: { value: 'http://example.com/api' } })
      fireEvent.change(getByTestId('accountId'), { target: { value: 'account-1234' } })
    })

    const [lastOnConfigure] = (mockFieldExtensionSDK.app.onConfigure as jest.Mock).mock.calls.pop();

    lastOnConfigure()

    expect(mockFieldExtensionSDK.notifier.error).not.toHaveBeenCalled()
  })

  it('should be able to set all fields by changing the related inputs', async () => {
    const { getByTestId } = render(<ConfigScreen sdk={mockFieldExtensionSDK} />)

    act(() => {
      fireEvent.change(getByTestId('proxyUrl'), { target: { value: 'http://example.com/api/v2' } })
      fireEvent.change(getByTestId('accountId'), { target: { value: 'account-abcd' } })
      fireEvent.change(getByTestId('playerId'), { target: { value: 'player-abcd' } })
    })

    const [lastOnConfigure] = (mockFieldExtensionSDK.app.onConfigure as jest.Mock).mock.calls.pop();

    expect(lastOnConfigure()).toEqual({
      parameters: {
        proxyUrl: 'http://example.com/api/v2',
        accountId: 'account-abcd',
        playerId: 'player-abcd'
      }
    })

    expect(mockFieldExtensionSDK.notifier.error).not.toHaveBeenCalled()
  })
})
