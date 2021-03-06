import { useEffect, useState } from 'react'
import { AppExtensionSDK } from '@contentful/app-sdk'
import { Heading, Form, Paragraph, TextInput, FieldGroup, FormLabel } from '@contentful/forma-36-react-components'
import { css } from 'emotion'

export type AppInstallationParameters = {
  proxyUrl: string
  accountId: string
  playerId: string
}

type ConfigProps = {
  sdk: AppExtensionSDK;
}

const headerClassName = css`
display: block;
position: absolute;
z-index: -1;
top: 0px;
width: 100%;
height: 300px;
background-color: rgb(14, 19, 134);
`

const cardClassName = css`
height: auto;
min-height: 65vh;
margin: 2rem auto 0px;
padding: 2rem 3rem;
max-width: 768px;
background-color: rgb(255, 255, 255);
z-index: 2;
box-shadow: rgb(0 0 0 / 10%) 0px 0px 20px;
border-radius: 2px;
`

const logoClassName = css`
width: 100%;
display: flex;
-webkit-box-pack: center;
justify-content: center;
margin-top: 2rem;
margin-bottom: 2rem;
`

export default function Config({ sdk }: ConfigProps) {
  const [ proxyUrl, setProxyUrl ] = useState<string>('')
  const [ accountId, setAccountId ] = useState<string>('')
  const [ playerId, setPlayerId ] = useState<string>('')

  useEffect(() => {
    // `onConfigure` allows to configure a callback to be
    // invoked when a user attempts to install the app or update
    // its configuration.
    sdk.app.onConfigure(() => {
      if (proxyUrl === '') {
        sdk.notifier.error('The field "Proxy URL" is required.')
        return false
      }

      if (!accountId) {
        sdk.notifier.error('The field "Brightcove Account Id" is required.')
        return false
      }

      return ({
        parameters: {
          proxyUrl,
          accountId,
          playerId
        }
      })
    });

  }, [sdk, proxyUrl, accountId, playerId])

  useEffect(() => {
    (async () => {
      // Get current parameters of the app.
      // If the app is not installed yet, `parameters` will be `null`.
      const parameters: AppInstallationParameters | null = await sdk.app.getParameters();

      if (parameters) {
        setProxyUrl(parameters.proxyUrl)
        setAccountId(parameters.accountId)
        setPlayerId(parameters.playerId)
      }

      sdk.app.setReady();
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className={ headerClassName } />

      <div className={ cardClassName }>
        <Form>
          <Heading>About Brightcove</Heading>
          <Paragraph>The Brightcove app is a widget that allows editors to select video from their Brightcove account. Select or upload a file on Brightcove and designate the assets that you want your entry to reference.</Paragraph>
          <hr />

          <Heading>Configuration</Heading>
          <FieldGroup>
            {/**
             * https://github.com/BrightcoveLearning/sample-proxy-apps
             * https://player.support.brightcove.com/getting-started/learning-guide-using-rest-apis.html
             **/}
            <FormLabel htmlFor="proxyUrl" required>Proxy URL</FormLabel>
            <TextInput required type="text" data-testid="proxyUrl" id="proxyUrl" name="proxyUrl" className="f36-margin-bottom--m" onChange={ (e) => setProxyUrl(e.currentTarget.value) } value={ proxyUrl } />
          </FieldGroup>

          <FieldGroup>
            <FormLabel htmlFor="accountId" required>Brightcove Account Id</FormLabel>
            <TextInput required type="text" data-testid="accountId" id="accountId" name="accountId" className="f36-margin-bottom--m" onChange={ (e) => setAccountId(e.currentTarget.value) } value={ accountId } />
          </FieldGroup>

          <FieldGroup>
            <FormLabel htmlFor="playerId">Brightcove Player Id</FormLabel>
            <TextInput type="text" data-testid="playerId" id="playerId" name="playerId" className="f36-margin-bottom--m" onChange={ (e) => setPlayerId(e.currentTarget.value) } value={ playerId } />
          </FieldGroup>
        </Form>
      </div>

      <div className={ logoClassName }>
        <svg width="60px" height="60px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <defs>
            <polygon id="path-1" points="3.2e-05 4.54747351e-15 31.99952 4.54747351e-15 31.99952 31.99952 3.2e-05 31.99952"></polygon>
          </defs>
          <g id="Blue-Steel" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="!MOLECULE-/-MonogramSquare">
              <rect fill="#0E1386" x="0" y="0" width="60" height="60"></rect>
              <rect id="Logo-BG" fill="#08088C" x="0" y="0" width="60" height="60"></rect>
              <g id="Group-3" transform="translate(14.000000, 14.000000)">
                <mask id="mask-2" fill="white">
                  <use xlinkHref="#path-1"></use>
                </mask>
                <g id="Clip-2"></g>
                <path d="M12.351872,22.55968 L12.351872,18.14368 L17.215712,18.14368 C19.071712,18.14368 19.647712,18.62368 19.647712,20.15968 L19.647712,20.54368 C19.647712,22.07968 19.071712,22.55968 17.215712,22.55968 L12.351872,22.55968 Z M12.351872,9.43984 L17.215712,9.43984 C19.071712,9.43984 19.647712,9.91984 19.647712,11.45584 L19.647712,11.61584 C19.647712,13.15184 19.071712,13.63184 17.215712,13.63184 L12.351872,13.63184 L12.351872,9.43984 Z M26.239552,7.26384 L30.559552,11.58384 C31.455392,12.47984 31.935392,13.75984 31.935392,15.42368 L31.935392,15.93584 C31.935392,18.33584 31.199552,19.42368 28.863552,19.83968 L28.863552,20.12768 L30.911552,22.17568 C31.743552,23.00768 31.999552,24.03168 31.999552,25.37568 L31.999552,26.43152 C31.999552,30.27152 29.439552,31.99952 25.055552,31.99952 L10.239872,31.99952 L5.311872,27.07152 L20.127712,27.07152 C24.511552,27.07152 27.071552,25.34352 27.071552,21.50368 L27.071552,20.44768 C27.071552,17.47168 25.727712,16.15984 21.855552,16.03168 L21.855552,15.42368 C25.727712,15.29584 27.007712,13.98368 27.007712,11.00784 L27.007712,10.496 C27.007712,9.27984 26.751552,8.22384 26.175552,7.328 L26.239552,7.26384 Z M24.895552,6.048 C23.615552,5.248 21.983552,4.928 20.063712,4.928 L4.928032,4.928 L4.928032,26.68768 L3.2e-05,21.75968 L3.2e-05,4.54747351e-15 L15.135712,4.54747351e-15 C17.631712,4.54747351e-15 19.391712,0.416 20.831712,1.856 L24.959712,5.98384 L24.895552,6.048 Z" id="Fill-1" fill="#00EAE4" mask="url(#mask-2)"></path>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </>
  )
}