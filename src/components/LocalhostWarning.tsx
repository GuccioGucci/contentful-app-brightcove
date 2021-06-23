import React from 'react';
import { Paragraph, TextLink, Note } from '@contentful/forma-36-react-components';

const LocalhostWarning = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '40px',
      }}>
      <Note title="App running outside of Contentful" style={{ maxWidth: '800px' }}>
        <Paragraph>
          Contentful Apps need to run inside the Contentful web app to function properly. Install
          the application following the instructions in the{' '}
          <TextLink href="https://github.com/GuccioGucci/contentful-app-brightcove#readme">
            README.md
          </TextLink>
          .
        </Paragraph>
      </Note>
    </div>
  );
};

export default LocalhostWarning;
