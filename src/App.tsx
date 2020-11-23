import './App.css';
import 'antd/dist/antd.css';
import React, {useState, useEffect} from 'react';
import {CalgaryMap, CommunityList, CustomHeader} from './components'
import {Col, Row, Divider, notification} from 'antd'
import {fetchURL, api, getAverage} from './utils'
import {CommunityUnitType} from './components/CommunityUnit/CommunityUnit'


import styled from 'styled-components'


export type CommunityType = {
  id: string,
  name: string,
  imgUrl: string,
  group: string,
}

export type HomeData = {
  id: string,
  communityId: string,
  price: number,
  area: number,
  type: string,
}

const getData = (setCommunities: (community: any) => void, setLoading: (loading: boolean) => void) => {
  const promiseArray = [api.communityUrl, api.homeUrl].map(fetchURL)
  setLoading(true)
  Promise.all(promiseArray)
    .then((res) => {
      const {data: resData} = res[0]
      const list = resData.map((community: CommunityType) => {
        const {
          name = 'no name',
          imgUrl: url = '',
          group
        } = community
        const {data: homeData} = res[1]
        const priceArr = homeData.filter((home: HomeData) => home.communityId === community.id).map((home: HomeData) => home.price)
        const price: number = Math.floor(getAverage(priceArr))
        return {
          name,
          url,
          price,
          group
        }
      }).sort((a: CommunityUnitType, b: CommunityUnitType) => a.name.localeCompare(b.name))
      const map = new Map();
      for(const item of list) {
        map.set(item.group, map.get(item.group) ? [...map.get(item.group), item] : [item])
      }
      setCommunities(map)
    })
  .catch(error => {
    notification['error']({
      message: 'Network Error',
      description: error.message,
    });
  }).finally(() => setLoading(false))
}

const Container = styled.div`
   background-color: white;
`

function App() {
  const [communities, setCommunities] = useState(new Map())
  const [loading, setLoading] = useState(false)
  const [area, setArea] = useState('South West')
  useEffect(() => {
    getData(setCommunities, setLoading)
  }, [])
  const onClick = (name: string) => setArea(name);
  return (
    <div className="App">
      <CustomHeader />
      <Row align='middle'>
        <Col xs={24} sm={24} md={8} lg={10}>
          <CalgaryMap onClick={onClick}/>
        </Col>
        <Col xs={0} sm={0} md={1} lg={1} style={{ height: '300px'}} >
          <Divider type="vertical" style={{ height: "100%" }} />
        </Col>
        <Col xs={24} sm={24} md={15} lg={13}>
          <Container>
            <CommunityList list={communities.get(area) || []} loading={loading} /> 
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default App;
