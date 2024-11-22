'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { ChevronFirst, ChevronLast, ChevronRight } from 'lucide-react'
import Myruntime from './util/runtime'
import { useState } from 'react'

const Comp = () => {

  const [code, setCode] = useState("");
  const [runt, setRunt] = useState();
  const [variables, setVariables] = useState({});
  const [stack, setStack] = useState([]);

  const [writed, setWrited] = useState(false);
  const [currentrow, setCurrentrow] = useState(0);
  const [rows, setRows] = useState([]);

  const createRuntime = ()=>{

      const r = new Myruntime(code);
      setRunt(r);
      setRows(code.split("\n"));
      console.log("read", code);
      setWrited(true);
  } 

  const clear = ()=>{
    if (runt) runt.clear();
    const newVariables = {...runt.variables};
    const newStack = [...runt.stack];
    setCurrentrow(0);
    setVariables(newVariables);
    setStack(newStack.reverse());

  }

  const advance = ()=>{
    if (runt) {
      runt.advance();
      console.log("advanced");
      
      const newVariables = {...runt.variables};
      const newStack = [...runt.stack];
      const newRow = runt.count;

      setVariables(newVariables);
      setStack(newStack.reverse());
      setCurrentrow(newRow);

      console.log("stack, var : ", newStack, newVariables);
    }
  }

  const skip = ()=>{

    let end = false;

    while(!end){
      end = runt.advance();
    }

      const newVariables = {...runt.variables};
      const newStack = [...runt.stack];
      const newRow = runt.count;

      setVariables(newVariables);
      setStack(newStack.reverse());
      setCurrentrow(newRow);

  }

  

  return (
    <div className='flex w-screen h-screen justify-center'>
      <div className='flex w-screen h-screen p-7 gap-3 max-w-6xl'>
        
        <div className='flex flex-col grow-0 w-48'>
        
          { !writed? <Textarea className="flex-1 mb-3" placeholder="Paste your code here." value={code} onChange={(e)=>{setCode(e.target.value)}}/>
          : <div className="flex-1 mb-3 border bg-slate-200 rounded-lg p-2">
              {rows.map((value, index)=>{
                return (<div key={index} className={index == currentrow? "bg-blue-300 pl-2 rounded-sm": "pl-2 rounded-sm"}>{value}</div>)
              })}
            </div>}
          <Button className="" onClick={createRuntime}>読み込み</Button>
        </div>


        <div className='flex flex-grow'>
          <Card className='flex flex-col w-full p-10 gap-3'>
            <div className='flex flex-row w-full flex-1 gap-3'>
              
              <div className="flex flex-1 rounded-md border py-10 justify-center">

                <ScrollArea className='rounded-md min-h-48 min-w-48 w-[70%] flex flex-col p-3 border'>
                  {
                    stack.map((value, index)=>{

                      return (<Card className=" flex p-3 justify-center" key={index}>{value}</Card>)

                    })
                  }                  
                </ScrollArea>
              
              </div>
              <ScrollArea className="w-1/2 max-w-56 rounded-md border p-4">
                {
                  Object.keys(variables).map((key, index)=>{
                    return (
                    
                    <div key={index}>
                      <Card className="p-3">
                        {key + " : " + variables[key]}
                      </Card>

                    </div>
                    
                  )
                  })
                }
              </ScrollArea>
            
            </div>
            <div className='flex flex-row w-full border rounded-md h-24 justify-center'>
                
              <div className='flex gap-2 h-full items-center'>
                <Button className='rounded-full w-10 h-10' onClick={()=>{clear()}}><ChevronFirst /></Button>
                <Button className='rounded-xl w-14 h-10' onClick={()=>{advance()}} ><ChevronRight /></Button>
                <Button className='rounded-full w-10 h-10' onClick={skip}><ChevronLast /></Button>
              </div>

            </div>
                
          </Card>
        </div>

      </div>
    </div>
  )
}

export default Comp