import { useEffect, useState } from 'react';
import './App.css';
import { CgShapeCircle, CgClose, CgUndo } from 'react-icons/cg'

const caro = [0, 1, 2, 3, 4, 5, 6, 7, 8]
function App() {
  const [show, setShow] = useState([])
  const [countClick, setCountClick] = useState(0)
  const [winner, setWinner] = useState()
  const [score, setScore] = useState([0, 0, 0])
  const [tie, setTie] = useState(false)
  const [err, setErr] = useState(false)
  const [player, setPlayer] = useState(false)


  const handle = (index) => {
    if (!show[index]) {
      const newState = [...show]
      newState[index] = (!player ? 'x' : 'o')
      setCountClick(prev => prev + 1)
      setShow(newState)
      setPlayer(!player)
    }
    else {
      setErr(true)
    }
  }

  const handleUndo = () => {
    setShow([])
    setPlayer(false)
    setCountClick(0)
    setWinner('')
    setTie(false)
  }

  const handeNext = () => {
    const newScore = [...score]
    player ? newScore[0] = score[0] + 1 : newScore[2] = score[2] + 1
    setScore(newScore)
    handleUndo()
  }

  const handleQuit = () => {
    setScore([0, 0, 0])
    handleUndo()
  }

  const handeTie = () => {
    const newScore = [...score]
    newScore[1]++
    setScore(newScore)
    handleUndo()
  }



  useEffect(() => {

    if ((show[0] === show[1] && show[1] === show[2] && show[2])
      || (show[3] === show[4] && show[4] === show[5] && show[5])
      || (show[6] === show[7] && show[7] === show[8] && show[8])
      || (show[0] === show[3] && show[3] === show[6] && show[6])
      || (show[1] === show[4] && show[4] === show[7] && show[7])
      || (show[2] === show[5] && show[5] === show[8] && show[8])
      || (show[0] === show[4] && show[4] === show[8] && show[8])
      || (show[2] === show[4] && show[4] === show[6] && show[6])
    )
      player ? setWinner('PLAYER1') : setWinner('PLAYER2')
    else if (countClick === 9) setTie(true)
  }, [show, player, countClick])
  return (
    <div className="App">
      <div className='header'>
        <div style={{ fontSize: '40px' }} className='col-30'><CgClose style={{ color: 'rgba(47,194,190,1)' }} /><CgShapeCircle style={{ color: 'rgba(242, 180, 61,1)' }} /></div>
        <div className='col-30 turn' onClick={handleQuit}><CgClose style={{ fontSize: '24px' }} /> TURN</div>
        <div className='col-30'><CgUndo className='undoIcon' onClick={handleUndo} /></div>
      </div>

      <div className='content'>
        {
          caro.map(item => (
            <div className='col-30 caroItem' key={item} onClick={() => handle(item)}>
              {show[item] === 'x' && <CgClose style={{ color: 'rgba(47,194,190,1)' }} />}
              {show[item] === 'o' && <CgShapeCircle style={{ color: 'rgba(242, 180, 61,1)' }} />}
            </div>
          ))
        }
      </div>

      <div className='footer'>
        <div className='col-30 player1'>
          <p>PLAYER1</p>
          <p>{score[0]}</p>
        </div>
        <div className='col-30 ties'>
          <p>TIES</p>
          <p>{score[1]}</p>
        </div>
        <div className='col-30 player2'>
          <p>PLAYER2</p>
          <p>{score[2]}</p>
        </div>
      </div>

      {winner &&
        <div className='winner'>
          <div className='winnerContent'>
            <p style={{ color: 'rgba(168, 190, 203, 1)' }}>{winner} WON!</p>
            <div className='winnerBtn'>
              <div className='quitBtn' onClick={handleQuit}>QUIT</div>
              <div className='quitBtn nextBtn' onClick={handeNext}>NEXT</div>
            </div>
          </div>
        </div>
      }

      {tie &&
        <div className='winner'>
          <div className='winnerContent'>
            <p style={{ color: 'rgba(168, 190, 203, 1)' }}>NOBODY WON!</p>
            <div className='winnerBtn'>
              <div className='quitBtn' onClick={handleQuit}>QUIT</div>
              <div className='quitBtn nextBtn' onClick={handeTie}>NEXT</div>
            </div>
          </div>
        </div>
      }

      {err &&
        <div className='winner'>
          <div className='winnerContent'>
            <p style={{ color: 'hsl(0, 100%, 67%)' }}>Can't check here!</p>
            <div className='quitBtn nextBtn' style={{ width: '100px', margin: `16px auto` }} onClick={() => setErr(false)}>NEXT</div>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
