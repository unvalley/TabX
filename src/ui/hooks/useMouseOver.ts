import React from 'react'

export const useMouseOver = () => {
  const [mouseOver, setMouseOver] = React.useState({ hover: false, index: 0 })

  const handleMouseOver = (index: number) => {
    setMouseOver({ hover: true, index })
  }

  const handleMouseOut = () => {
    setMouseOver({ hover: false, index: -1 })
  }

  const isMouseOvered = (index: number) => mouseOver.hover === true && mouseOver.index === index

  return { handleMouseOver, handleMouseOut, isMouseOvered }
}
