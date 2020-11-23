import React, {FC, memo} from 'react'
import data from './map.json'
import {StyledA} from './styles'
const {calgary, layers: {Layer12, layer_words}} = data
type CalgaryMapProps = {
  onClick: (areaName: string) => void 
}
const CalgaryMap: FC<CalgaryMapProps> = ({onClick}) => (
    <svg viewBox="0 0 612 792">
      {calgary.map(({color, shape, name}, index) => (
        <StyledA onClick={() => onClick(name)} key={index}>
          <path 
            stroke="#fff"
            strokeWidth="2px"
            style={{"fill": color}}
            d={shape} onMouseEnter={(event) => {
            // @ts-ignore
              event.target.style.fill = '#EBEBEB';
            }}
            onMouseOut={(event) => {
              // @ts-ignore
              event.target.style.fill = color;
            }}
            />
        </StyledA>
      ))}
      <path style={{"fill": Layer12.color}} d={Layer12.shape}/>
       {layer_words.flat().map((shape, index) =>
        <path d={shape} key={index}/>
      )}
     </svg>
)

export default memo(CalgaryMap)