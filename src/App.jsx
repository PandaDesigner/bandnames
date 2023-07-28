import { useEffect, useState } from "react"
import io from 'socket.io-client'
import { BandAdd, BandList } from "./components"

const connectSocketServer = () => {
  const socket = io.connect('http://localhost:8080', {
    transports: ['websocket']
  })
  return socket
}

const App = () => {

  const [socket] = useState(connectSocketServer())
  const [online, setOnline] = useState(false)
  const [band, setBand] = useState([])

  useEffect(() => {
    setOnline(socket.connected)
  }, [socket])

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true)
    })
  }, [socket])

  useEffect(() => {
    socket.on('current-bands', (bands) => {


      setBand(bands)
    })
  }, [socket])


  const voteBand = (id) => socket.emit('vote-band', id)
  const deleteBand = (id) => socket.emit('delete-band', id)
  const nameChangeBand = (id, name) => socket.emit('name-change-band', { id, name })
  const newBands = (name) => socket.emit('new-band', name)



  return (
    <>
      <div className="container">
        <div className="alert p-0 mt-2">
          <p className="">Service status: {
            online
              ? <span className="text-success">Online</span>
              : <span className="text-danger">Offline</span>
          }
          </p>
        </div>
        <h1>BandName</h1>
        <hr />
        <div className="row">
          <div className="col-8">
            <BandList
              data={band}
              voteBand={voteBand}
              deleteBand={deleteBand}
              nameChangeBand={nameChangeBand}
            />
          </div>
          <div className="col-4">
            <BandAdd
              newBands={newBands}
            />
          </div>
        </div>

      </div>
    </>
  )
}

export default App
