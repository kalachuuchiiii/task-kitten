import { Button } from '@/components/ui/button'
import React from 'react'

const Preferences = () => {

  const handleToggle = () => {
    document.documentElement.classList.add("dark")
  }
  return (
    <div>
      <Button onClick = {handleToggle}>Turn on darkmode  </Button>
    </div>
  )
}

export default Preferences