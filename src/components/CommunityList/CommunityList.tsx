import React from 'react'
import CommunityUnit, {CommunityUnitType} from '../CommunityUnit/CommunityUnit'
import { List, Image} from 'antd'



export type CommunityListType = {
  list: Array<CommunityUnitType> | undefined
}

const CommunityList = ({
  list
}: CommunityListType) => {
  console.log(list);
  return (
    <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={list}
    renderItem={item => (
      <List.Item
        key={item.name}
        extra={
          <Image
            width={272}
            alt="logo"
            src={item.url}
            fallback='/default-image.png'
          />
        }
        >
          <List.Item.Meta
            title={item.name}
            description={`Area: ${item.group}`}
          />
          {`Average Price: $${item.price}`}
        </List.Item>
      )}
    />
  )
}

export default CommunityList