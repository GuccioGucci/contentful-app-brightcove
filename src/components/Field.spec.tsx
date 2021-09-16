import React from 'react';
import Field from './Field';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { mockFieldExtensionSDK } from '../../test/mocks/mockFieldExtensionSDK';
import { BrightcoveVideo } from '../types';

describe('Field component', () => {

  it('Component text exists', () => {
    const { getByTestId } = render(<Field sdk={ mockFieldExtensionSDK } />)
    expect(getByTestId('choose-video')).toBeInTheDocument()
  });

  it('Should open the "Choose Video" dialog when clicking on the button', async () => {
    (mockFieldExtensionSDK.dialogs.openCurrent as jest.Mock).mockResolvedValue({
      id: '1234',
      name: '1. Video Name'
    } as BrightcoveVideo)

    const { getByTestId, findByTestId } = render(<Field sdk={mockFieldExtensionSDK} />)

    act(() => {
      fireEvent.click(getByTestId('choose-video'))
    });

    await waitFor(() => expect(mockFieldExtensionSDK.dialogs.openCurrent).toBeCalledWith({
      title: 'Choose a video'
    }))

    await waitFor(() => expect(mockFieldExtensionSDK.field.setValue).toBeCalledWith('1234'))
  });

  it('Should clean the value field when click on "Clean"', async () => {
    (mockFieldExtensionSDK.field.getValue as jest.Mock).mockReturnValue('1234')

    const { getByTestId } = render(<Field sdk={mockFieldExtensionSDK} />)

    await waitFor(() => expect(getByTestId('clean')).toBeInTheDocument())

    act(() => {
      fireEvent.click(getByTestId('clean'))
    })

    await waitFor(() => expect(mockFieldExtensionSDK.field.removeValue).toBeCalled())
  });
});
