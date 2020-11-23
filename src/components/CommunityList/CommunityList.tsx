import React from 'react'
import CommunityUnit, {CommunityUnitType} from '../CommunityUnit/CommunityUnit'
import { List } from 'antd'
export type CommunityListType = {
  list: Array<CommunityUnitType> | undefined,
  loading: boolean
}
const renderItem = (item: CommunityUnitType, index: number) => <CommunityUnit {...item} key={index}/>

const CommunityList = ({
  list,
  loading
}: CommunityListType) => {
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: 3,
      }}
      dataSource={list}
      loading={loading}
      renderItem={renderItem}
    />
  )
}

export default CommunityList