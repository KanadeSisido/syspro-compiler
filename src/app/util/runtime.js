

class Myruntime
{

    constructor(code)
    {
        this.rows = code.split("\n");
        this.rows = this.rows;

        this.variables = {};
        this.labels = {};
        this.stack = [];
        this.count = 0;

        for(let i = 0; i < this.rows.length; i++)
        {
            const r = this.rows[i].split(" ");

            if(r[0] == "label")
            {
                this.labels[r[1]] = i;
            }
        }

    }

    advance()
    {
        if(this.rows[this.count] == "halt")
        {
            return true;
        }

        this.process(this.rows[this.count], this.count);
        this.count++;
        
    }

    process(row)
    {
        const operation = row.split(" ");

        if(operation.length == 1)
        {
            switch(operation[0])
            {
                case "pop":

                    if(this.stack.length == 0)
                    {
                        this.err(this.count, "Stack is Empty");
                    }
                    
                    this.stack.pop();
                    
                    break;

                case "+":
                    
                    if(this.stack.length < 2)
                    {
                        this.err(this.count, "There are not enouth elements in the Stack");
                    }

                    {
                        const a = parseInt(this.stack.pop());
                        const b = parseInt(this.stack.pop());
                        
                        this.stack.push((a + b).toString());
                    }

                    break;
                case "-":

                    if(this.stack.length < 2)
                    {
                        this.err(this.count, "There are not enouth elements in the Stack");
                    }

                    {
                        const a = parseInt(this.stack.pop());
                        const b = parseInt(this.stack.pop());
                        
                        this.stack.push((a - b).toString());
                    }

                    break;
                case "*":

                    if(this.stack.length < 2)
                    {
                        this.err(this.count, "There are not enouth elements in the Stack");
                    }

                    {
                        const a = parseInt(this.stack.pop());
                        const b = parseInt(this.stack.pop());
                        
                        this.stack.push((a * b).toString());
                    }

                    break;
                case "/":

                    if(this.stack.length < 2)
                    {
                        this.err(this.count, "There are not enouth elements in the Stack");
                    }

                    {
                        const a = parseInt(this.stack.pop());
                        const b = parseInt(this.stack.pop());
                        
                        this.stack.push((a / b).toString());
                    }

                    break;
                case ">":

                    if(this.stack.length < 2)
                    {
                        this.err(this.count, "There are not enouth elements in the Stack");
                    }

                    {
                        const a = parseInt(this.stack.pop());
                        const b = parseInt(this.stack.pop());
                        
                        this.stack.push(( b > a ? 1 : 0).toString());
                    }

                    break;
                case "<":

                    if(this.stack.length < 2)
                    {
                        this.err(this.count, "There are not enouth elements in the Stack");
                    }

                    {
                        const a = parseInt(this.stack.pop());
                        const b = parseInt(this.stack.pop());
                        
                        this.stack.push(( b < a ? 1 : 0).toString());
                    }

                    break;
                case "=":
                
                    if(this.stack.length < 2)
                    {
                        this.err(this.count, "There are not enouth elements in the Stack");
                    }

                    {
                        const a = parseInt(this.stack.pop());
                        const b = parseInt(this.stack.pop());
                        
                        this.stack.push(( b == a ? 1 : 0).toString());
                    }

                    break;
                case ":=":
                    
                    if(this.stack.length < 2)
                    {
                        this.err(this.count, "There are not enouth elements in the Stack");
                    }

                    {
                        const r = parseInt(this.stack.pop());
                        const l = this.stack.pop();
                        
                        this.variables[l] = r;
                    }

                    break;
                case "copy":

                    if(this.stack.length == 0)
                    {
                        this.err(this.count, "Stack is Empty");
                    }
                    {
                        const val = this.stack.pop();
                        this.stack.push(val);
                        this.stack.push(val);   
                    }

                    break;
                case "halt":
                    return false;
                    
                                                                            
            }
        }
        else if (operation.length == 2)
        {
            switch(operation[0])
            {
                case "push":

                    this.stack.push(operation[1]);
                    
                    break;
                case "rvalue":
                    
                    this.stack.push(this.variables[operation[1]].toString());

                    break;
                case "lvalue":
                    
                    this.stack.push(operation[1]);

                    break;
                case "label":
                    //なにもしない
                    break;
                case "goto":

                    this.count = this.labels[operation[1]] - 1;
                    break;
                case "gofalse":
                    
                    {
                        const a = this.stack.pop();

                        if(a == '0')
                        {
                            this.count = this.labels[operation[1]] - 1;
                        }
                    }
                    break;
                case "gotrue":
                    
                    {
                        const a = this.stack.pop();

                        if(a == '1')
                        {
                            this.count = this.labels[operation[1]] - 1;
                        }
                    }

                    break;
                                                                            
            }
        }

    }

    err(detail)
    {
        console.error("runtime Error occured : at "+ this.count.toString() + " - " + detail);
    }

    clear()
    {
        this.variables = {};
        this.stack = [];
        this.count = 0;
    }

    getStack()
    {
        return this.stack;
    }
    
    getVariables()
    {
        return this.variables;
    }
    


}


export default Myruntime;