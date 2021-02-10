import React from 'react'

export const useMouseOver = () => {
  const [mouseOver, setMouseOver] = React.useState({ hover: false, idx: 0 })

  const handleMouseOver = (idx: number) => {
    setMouseOver({ hover: true, idx })
  }

  const handleMouseOut = () => {
    setMouseOver({ hover: false, idx: -1 })
  }

  const isMouseOvered = (idx: number) => mouseOver.hover === true && mouseOver.idx === idx

  return { handleMouseOver, handleMouseOut, isMouseOvered }
}
