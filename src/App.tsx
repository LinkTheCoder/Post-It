import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlus } from 'react-icons/fa'
import pinImage from './assets/pin.png';

interface Note {
  id: number;
  text: string;
  x: number;
  y: number;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const borderRef = useRef<HTMLDivElement>(null)
  const [nextId, setNextId] = useState<number>(1)

  useEffect(() => {
    if (borderRef.current) {
      const { innerWidth: width, innerHeight: height } = window
      const noteWidth = 150
      const noteHeight = 150

      setNotes([
        {
          id: 0,
          text: "",
          x: (width - noteWidth) / 2,
          y: (height - noteHeight) / 2
        }
      ])
    }
  }, [])

  const addNote = () => {
    setNotes(prevNotes => [
      ...prevNotes,
      {
        id: nextId,
        text: "",
        x: Math.random() * (window.innerWidth - 150),
        y: Math.random() * (window.innerHeight - 150)
      }
    ])
    setNextId(prevId => prevId + 1)
  }

  const updateNote = (id: number, newText: string) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, text: newText } : note
      )
    )
  }

  return (
    <div ref={borderRef} className="w-screen h-screen flex items-center justify-center relative">
      <button 
        onClick={addNote}
        className="absolute bottom-4 right-4 bg-yellow-500 text-white flex items-center justify-center rounded-full shadow-lg hover:bg-yellow-600 focus:outline-none"
        style={{ width: '60px', height: '60px', zIndex: 20 }}
      >
        <FaPlus className="text-2xl" />
      </button>
      {notes.map(note => (
        <motion.div 
          key={note.id}
          className="absolute"
          drag
          dragConstraints={borderRef}
          style={{ left: note.x, top: note.y }}
        >
          {/* Wrapper for both pin and note */}
          <motion.div
            whileHover={{ scale: 1.1 }} // Scale both pin and note together
            style={{ position: 'relative' }}
          >
            {/* Pin Image */}
            <img 
              src={pinImage}
              alt="Pin"
              className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full"
              style={{ 
                width: '40px', 
                height: '40px', 
                top: '18px',
                zIndex: 10,
              }}
            />
            {/* Post-it Note */}
            <motion.textarea
              value={note.text}
              onChange={(e) => updateNote(note.id, e.target.value)}
              placeholder="Write something & drag :)"
              className="bg-yellow-200 text-black text-base resize-none outline-none cursor-text placeholder-black placeholder-opacity-50"
              style={{ 
                width: '180px', 
                height: '180px',
                paddingTop: '30px',
                paddingLeft: '20px',
                paddingRight: '20px',
                boxShadow: '0 10px 15px -5px rgba(0, 0, 0, 0.5)',
                zIndex: 1,
              }}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

export default App
