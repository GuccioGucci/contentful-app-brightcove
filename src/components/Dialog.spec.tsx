import React from 'react'
import nock from 'nock'
import Dialog from './Dialog'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { mockDialogExtensionSDK } from '../../test/mocks/mockDialogExtensionSDK'
import { BrightcoveFolder, BrightcoveVideo } from '../types'

describe('Dialog component', () => {
  it('should show a spinner while loading content', () => {
    const { getByTestId } = render(<Dialog sdk={ mockDialogExtensionSDK } />);

    expect(getByTestId('modal-spinner')).toBeInTheDocument();
  })

  it('should load folders and show then on the screen', async () => {
    const scope = nock('http://example.com/api')
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/folders').reply(200, [
        { id: '1234', name: '1. Folder Name' },
        { id: 'abcd', name: '2. Folder Name' },
      ] as BrightcoveFolder[])

    act(() => {
      render(<Dialog sdk={mockDialogExtensionSDK} />)
    });

    await waitFor(() => {
      expect(screen.getByTestId('modal-folders')).toBeInTheDocument()
      expect(screen.getByTestId('1234-1. Folder Name')).toBeInTheDocument()
      expect(screen.getByTestId('abcd-2. Folder Name')).toBeInTheDocument()
    })
  })

  it('should load videos when clicking on a folder', async () => {
    const scope = nock('http://example.com/api')
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/folders').reply(200, [
        { id: '1234', name: '1. Folder Name' },
        { id: 'abcd', name: '2. Folder Name' },
      ] as BrightcoveFolder[])
      .get('/folders/abcd/videos').reply(200, [
        { id: '1', name: '1. Video Name', description: '1. Description', images: { thumbnail: { src: 'https://example.com/image.png' } } },
        { id: '2', name: '2. Video Name', description: '2. Description', images: { thumbnail: { src: 'https://example.com/image.png' } } },
      ] as BrightcoveVideo[])

    act(() => {
      render(<Dialog sdk={mockDialogExtensionSDK} />)
    });

    const folderElement = await waitFor(() => screen.getByTestId('abcd-2. Folder Name').querySelector('a'))

    if (folderElement) {
      act(() => {
        fireEvent.click(folderElement)
      })
    }

    await waitFor(() => {
      expect(screen.getByTestId('back-to-folders')).toBeInTheDocument()
      expect(screen.getByTestId('modal-videos')).toBeInTheDocument()
      expect(screen.getByTestId('1-1. Video Name')).toBeInTheDocument()
      expect(screen.getByTestId('2-2. Video Name')).toBeInTheDocument()
    })
  })

  it('should go back to folder list when user clicks on back button from the video list', async () => {
    const scope = nock('http://example.com/api')
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/folders').reply(200, [
        { id: '1234', name: '1. Folder Name' },
        { id: 'abcd', name: '2. Folder Name' },
      ] as BrightcoveFolder[])
      .get('/folders/abcd/videos').reply(200, [
        { id: '1', name: '1. Video Name', description: '1. Description', images: { thumbnail: { src: 'https://example.com/image.png' } } },
        { id: '2', name: '2. Video Name', description: '2. Description', images: { thumbnail: { src: 'https://example.com/image.png' } } },
      ] as BrightcoveVideo[])

    act(() => {
      render(<Dialog sdk={mockDialogExtensionSDK} />)
    });

    const folderElement = await waitFor(() => screen.getByTestId('abcd-2. Folder Name').querySelector('a'))

    if (folderElement) {
      act(() => {
        fireEvent.click(folderElement)
      })
    }

    const backButton = await waitFor(() => screen.getByTestId('back-to-folders'))

    act(() => {
      fireEvent.click(backButton)
    })

    await waitFor(() => {
      expect(screen.getByTestId('modal-folders')).toBeInTheDocument()
      expect(screen.getByTestId('1234-1. Folder Name')).toBeInTheDocument()
      expect(screen.getByTestId('abcd-2. Folder Name')).toBeInTheDocument()
    })
  })

  it('should close the dialog sending video information when user select a video from the list', async () => {
    const scope = nock('http://example.com/api')
      .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
      .get('/folders').reply(200, [
        { id: '1234', name: '1. Folder Name' },
        { id: 'abcd', name: '2. Folder Name' },
      ] as BrightcoveFolder[])
      .get('/folders/abcd/videos').reply(200, [
        { id: '1', name: '1. Video Name', description: '1. Description', images: { thumbnail: { src: 'https://example.com/image.png' } } },
        { id: '2', name: '2. Video Name', description: '2. Description', images: { thumbnail: { src: 'https://example.com/image.png' } } },
      ] as BrightcoveVideo[])

    act(() => {
      render(<Dialog sdk={mockDialogExtensionSDK} />)
    });

    const folderElement = await waitFor(() => screen.getByTestId('abcd-2. Folder Name').querySelector('a'))

    if (folderElement) {
      act(() => {
        fireEvent.click(folderElement)
      })
    }

    const videoElement = await waitFor(() => screen.getByTestId('2-2. Video Name').querySelector('a'))

    if (videoElement) {
      act(() => {
        fireEvent.click(videoElement)
      })
    }

    expect(mockDialogExtensionSDK.close).toBeCalledTimes(1)
    expect(mockDialogExtensionSDK.close).toBeCalledWith({
      id: '2',
      name: '2. Video Name',
      description: '2. Description',
      images: { thumbnail: { src: 'https://example.com/image.png' } }
    })
  })
})
