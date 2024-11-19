'use client'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

import { useState } from 'react'

const Comp = () => {

  const [code, setCode] = useState("");


  
  return (
    <div className='flex w-screen h-screen'>
      <div>

      </div>

      <Button>hello</Button>
      <Textarea placeholder="Type your message here." value={code} onChange={(e)=>setCode(e.target.value)}/>


    </div>
  )
}

export default Comp