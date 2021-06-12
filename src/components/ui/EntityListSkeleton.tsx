import React from 'react'
import { EntityList, EntityListItem } from '@contentful/forma-36-react-components';

type Props = {
  num: number
}

export const EntityListSkeleton: React.FC<Props> = ({ num }) => (
  <EntityList>
    {
      Array.from(Array(num).keys()).map(index => (
        <EntityListItem key={index} title="" isLoading={true} />
      ))
    }
  </EntityList>
)
