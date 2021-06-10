import React from 'react';
import ConfigScreen from './ConfigScreen';
import { render } from '@testing-library/react';
import { mockSdk } from '../../test/mocks/mockSdk';

describe('Config Screen component', () => {
  it('Component text exists', async () => {
    const { getByText } = render(<ConfigScreen sdk={mockSdk} />);

    // simulate the user clicking the install button
    await mockSdk.app.onConfigure.mock.calls[0][0]();

    expect(
      getByText('The Brightcove app is a widget that allows editors to select video from their Brightcove account. Select or upload a file on Brightcove and designate the assets that you want your entry to reference.')
    ).toBeInTheDocument();
  });
});
