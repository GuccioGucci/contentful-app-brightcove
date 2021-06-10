import React from 'react';
import nock from 'nock'
import Field from './Field';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { mockFieldExtensionSDK } from '../../test/mocks/mockFieldExtensionSDK';

describe('Field component', () => {

  it('Component text exists', () => {
    const { getByText } = render(<Field sdk={ mockFieldExtensionSDK } />)
    expect(getByText('Choose Video')).toBeInTheDocument()
  });

  it('Component text exists', async () => {
    const scope = nock('http://example.com/api')
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/test').reply(200)
      .get('/folders').reply(200, [{ id: '1234' }]);

    (mockFieldExtensionSDK.dialogs.openCurrent as jest.Mock).mockResolvedValue('')

    const { getByText } = render(<Field sdk={ mockFieldExtensionSDK } />)

    act(() => {
      fireEvent.click(getByText('Choose Video'))
    });

    await waitFor(() => expect(mockFieldExtensionSDK.dialogs.openCurrent).toBeCalledWith({
      title: 'Choose a video',
      parameters: {
        folders: [{ id: '1234' }]
      }
    }))
  });
});
