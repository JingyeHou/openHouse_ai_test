import React, {memo} from 'react'
import {List} from 'antd'
import {moneyFormatter} from '../../utils'

const {Item: ListItem} = List
const {Meta: ItemMeta} = ListItem

export type CommunityUnitType = {
  name: string,
  url?: string,
  price?: number,
  group: string,
}

const CommunityUnit = ({
  name,
  url = '',
  price = 0,
  group
}: CommunityUnitType) => 
  (
    <ListItem
      extra={
      <img
        width={272}
        alt="logo"
        src={url}
        //@ts-ignore
        onError={(e)=>{e.target.onerror = null; e.target.src="/default-image.png"}}
      />
    }
    >
      <ItemMeta
        title={`Community: ${name}`}
        description={`Area: ${group}`}
      />
      {`Average Home Price: $${moneyFormatter(price)}`}
    </ListItem>
  )


export default memo(CommunityUnit, (prev, next) => prev.name === next.name)