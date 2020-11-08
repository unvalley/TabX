import React from 'react'
import {Input} from '@geist-ui/react'
import {Sun} from './icons/sun'
import {LogoIcon} from './LogoIcon'

export const Header: React.FC = () => {
  const goHome = () => {}

  return (
    <>
      <nav>
        <div
          style={{
            display: 'flex',
          }}
        >
          <div className="site-name" style={{marginRight: 'auto'}}>
            <span title={'Go Home'} onClick={goHome}>
              <LogoIcon />
            </span>
          </div>
          <section className="search">
            <Input placeholder="The Evil Rabbit" width="100%" />
          </section>
          <span>
            <a href="#">
              <Sun />
            </a>
          </span>
        </div>
      </nav>
    </>
  )
}
