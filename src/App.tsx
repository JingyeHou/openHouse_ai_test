import React, {useState, useEffect} from 'react';
import {CalgaryMap, CommunityList} from './components'
import {Col, Row} from 'antd'
import './App.css';
import 'antd/dist/antd.css';
import axios from "axios";
import styled from 'styled-components'

const communityUrl = 'https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/communities'
const homeUrl = 'https://a18fda49-215e-47d1-9dc6-c6136a04a33a.mock.pstmn.io/homes'

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

export type CommunityUnitType = {
  name: string,
  url: string,
  price: number,
}

const fetchURL = (url: string) => axios.get(url);

const getData = (setCommunities: (community: any) => void) => {
  const promiseArray = [communityUrl, homeUrl].map(fetchURL)
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
        const price: number = Math.floor(priceArr.reduce((a: number, b: number) => a + b, 0) / (priceArr.length ? priceArr.length : 1))
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
    console.log(error)
    throw error
  })
}

const Container = styled.div`
   background-color: white
`


function App() {
  const [communities, setCommunities] = useState(new Map())
  const [area, setArea] = useState('South West')
  useEffect(() => {
    getData(setCommunities)
  }, [])
  const onClick = (name: string) => setArea(name);
  return (
    <div className="App">
          <Row align="middle">
            <Col xs={24} sm={24} md={12} lg={10} >
              <CalgaryMap onClick={onClick}/>
            </Col>
            <Col xs={24} sm={24} md={12} lg={14} >
              <Container>
                <CommunityList list={communities.get(area) || []} /> 
              </Container>
            </Col>
          </Row>
    </div>
  );
}

export default App;
