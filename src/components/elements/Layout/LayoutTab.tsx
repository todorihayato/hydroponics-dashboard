import { Tab } from '@chakra-ui/react'
import { ReactNode } from 'react'
type Props = {
  children: string | ReactNode
}

export const LayoutTab = (props: Props) => {
  return (
    <Tab
      my={'16px'}
      py={'16px'}
      px={'16px'}
      _selected={{
        boxShadow: '0 0px 16px rgba(0, 0, 0, 0.2)',
        rounded: 'lg',
        fontWeight: '800'
      }}
      letterSpacing={'.15rem'}
    >
      {props.children}
    </Tab>
  )
}
