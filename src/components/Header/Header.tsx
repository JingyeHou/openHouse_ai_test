import React, {FC} from 'react'
import {Layout, Typography} from 'antd'
import {constant} from '../../utils'
const {Header} = Layout
const { Title } = Typography


const CustomHeader: FC = () =>  (
  <Header style={{backgroundColor: '#004d00',  display: 'table'}}>
    <Title 
      style={{
        color: '#fff',
        fontSize: '20px',
        display: 'table-cell',
        width:'100vw',
        verticalAlign: 'middle'
        }}>
      {constant.TITLE} 
    </Title>
  </Header>
)

export default CustomHeader