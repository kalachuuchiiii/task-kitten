import { PageLayout } from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { Item, ItemActions, ItemContent, ItemDescription, ItemHeader, ItemTitle } from '@/components/ui/item'
import { Switch } from '@/components/ui/switch'
import React from 'react'
import { useTheme } from '../hooks'

const Preferences = () => {
  const { toggleDarkMode, isDarkMode } = useTheme();

  return (
  <div className='border rounded-lg p-3'>
  <Item>
    <ItemContent>
        <ItemTitle>Dark mode</ItemTitle>
        <ItemDescription >Dark Interface</ItemDescription>
    </ItemContent>
    <ItemActions>
      <Switch checked = {isDarkMode} onCheckedChange={toggleDarkMode} />
    </ItemActions>
  </Item>
  </div>
  )
}

export default Preferences