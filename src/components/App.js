import React, {useEffect, useState} from 'react'

const App = () => {
  let h = 20
  let w = 20
  let initial = new Array(h)
  for (let i=0; i<h; i++) {
    initial[i] = new Array(w).fill(0)
  }
  const [alive, setAlive] = useState(initial)
  const [flag, setFlag] = useState(false)
  const [timerId, setTimerId] = useState(null)
  const [generation, setGeneration] = useState(0)

  const calc = (alive) => {
    let new_alive = new Array(h)
    for (let i=0; i<h; i++) {
      new_alive[i] = new Array(w).fill(0)
    }
    for (let i=0; i<h; i++) {
      for (let j=0; j<w; j++) {
        let cnt = 0
        for (let di=-1; di<2; di++) {
          for (let dj=-1; dj<2; dj++) {
            if (di==0 && dj==0) continue
            let ni = i+di
            let nj = j+dj
            if (0<=ni && ni<h && 0<=nj && nj<w && alive[ni][nj]) {
              cnt++
            }
          }
        }
        if (alive[i][j]==0 && cnt==3) new_alive[i][j] = 1;
        else if (alive[i][j]>=1 && 2<=cnt && cnt<=3) new_alive[i][j] = alive[i][j]+1;
        else new_alive[i][j] = 0
      }
    }
    return new_alive
  }

  useEffect(()=>{
    if (flag) {
      let id = setInterval(()=>{
        setAlive((alive)=>calc(alive))
        setGeneration((generation)=>generation+1)}, 100)
      setTimerId(id)
    }
    else {
      clearInterval(timerId)
      setTimerId(null)
    }},
    [flag]
  )

  const doClick = (x, y) => {
    let new_alive = new Array(h)
    for (let i=0; i<h; i++) {
      new_alive[i] = new Array(w).fill(0)
      for (let j=0; j<w; j++) {
        if (i==x && j==y) {
          if (alive[i][j]>=1) new_alive[i][j] = 0
          else new_alive[i][j] = 1
        }
        else new_alive[i][j] = alive[i][j]
      }
    }
    setAlive(new_alive)
  }

  const randomSet = () => {
    let new_alive = new Array(h)
    for (let i=0; i<h; i++) {
      new_alive[i] = new Array(w).fill(0)
      for (let j=0; j<w; j++) {
        if (Math.random()<0.3) new_alive[i][j] = 1
        else new_alive[i][j] = 0
      }
    }
    setAlive(new_alive)
  }

  let display = []
  for (let i=0; i<h; i++) {
    let display_i = []
    for (let j=0; j<w; j++) {
      if (alive[i][j]===0) display_i.push(<td className='zero' onClick={()=>doClick(i, j)}></td>)
      else if (alive[i][j]==1) display_i.push(<td className='one' onClick={()=>doClick(i, j)}></td>)
      else if (alive[i][j]==2) display_i.push(<td className='two' onClick={()=>doClick(i, j)}></td>)
      else if (alive[i][j]==3) display_i.push(<td className='three' onClick={()=>doClick(i, j)}></td>)
      else if (alive[i][j]==4) display_i.push(<td className='four' onClick={()=>doClick(i, j)}></td>)
      else if (alive[i][j]==5) display_i.push(<td className='five' onClick={()=>doClick(i, j)}></td>)
      else display_i.push(<td className='six' onClick={()=>doClick(i, j)}></td>)
    }
    display.push(<tr>{display_i}</tr>)
  }

  return (
    <>
      <body>
      <table>
        {display}
      </table>
      <p className='generation'>{generation}世代目</p>
      <div className='buttons'>
        <button onClick={()=>setFlag(true)}>start</button> <br />
        <button onClick={()=>setFlag(false)}>stop</button> <br />
        <button onClick={()=>{
          setFlag(false)
          setAlive(initial)
          setGeneration(0)
        }}>reset</button>
        <button onClick={()=>{
          setFlag(false)
          randomSet()
          setGeneration(0)
        }}>random</button>
      </div>
      </body>
    </>
  )
}

export default App