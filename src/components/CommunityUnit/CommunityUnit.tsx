import React from 'react'
import {Card} from 'antd'
import styled from 'styled-components'

const StyledImg = styled.img`
  min-height: 25vh
`
const StyledCard = styled(Card)`
  width: 100%;
  background-color: #ececec;
`

export type CommunityUnitType = {
  name: string,
  url: string,
  price: number,
  group: string,
}

const CommunityUnit = ({
  name,
  url,
  price
}: CommunityUnitType) => {
  return (
    <StyledCard
      hoverable
      title={name}
      cover={<StyledImg alt='no pic' src={url} />}
    >
      {price} $
    </StyledCard>
  )
}

export default CommunityUnit