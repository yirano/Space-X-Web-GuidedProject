import React from 'react'
import { render, fireEvent, act, waitFor } from '@testing-library/react'
import MutationObserver from 'mutation-observer'
import { missionsFixtures } from './components/MissionList.test'
import { fetchMissions as mockFetchMissions } from './api/fetchMissions'
import App from './App'
import MissionsList from './components/MissionsList'

jest.mock('./api/fetchMissions.js')
global.MutationObserver = MutationObserver

test('App fetches and renders missions data', async () => {
  mockFetchMissions.mockResolvedValueOnce(missionsFixtures)

  const { getByText, queryAllByTestId, getByTestId } = render(<MissionsList />)

  const button = getByTestId('button')

  fireEvent.click(button)

  await waitFor(() => {
    expect(queryAllByTestId('mission')).toHaveLength(2)
  })

  // const missionElems = await queryAllByTestId('mission')
  // expect(missionElems).toHaveLength(0)
})