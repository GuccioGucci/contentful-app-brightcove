import React from 'react';
import Field from './Field';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { mockFieldExtensionSDK } from '../../test/mocks/mockFieldExtensionSDK';
import { BrightcoveVideo } from '../types';

describe('Field component', () => {

  it('Component text exists', () => {
    const { getByText } = render(<Field sdk={ mockFieldExtensionSDK } />)
    expect(getByText('Choose Video')).toBeInTheDocument()
  });

  it('Should open the "Choose Video" dialog when clicking on the button', async () => {
    (mockFieldExtensionSDK.dialogs.openCurrent as jest.Mock).mockResolvedValue({
      id: '1234',
      name: '1. Video Name'
    } as BrightcoveVideo)

    const { getByText } = render(<Field sdk={mockFieldExtensionSDK} />)

    act(() => {
      fireEvent.click(getByText('Choose Video'))
    });

    await waitFor(() => expect(mockFieldExtensionSDK.dialogs.openCurrent).toBeCalledWith({
      title: 'Choose a video'
    }))

    await waitFor(() => expect(mockFieldExtensionSDK.field.setValue).toBeCalledWith('1234'))
  });
});
