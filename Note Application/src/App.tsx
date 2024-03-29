import { useState, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { Navigate, Route, Routes } from 'react-router-dom'
import { Container } from "react-bootstrap";
import NewNote from './NewNote'
import useLocalStorage from './useLocalStorage'

type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return{...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  },[notes,tags])
  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<h1>hi</h1>}/>
        <Route path="/new" element={<NewNote/>}/>
        <Route path='/:id'>
          <Route index element={<h1>show</h1>}/>
          <Route path="edit" element={<h1>edit</h1>}/>
        </Route>
        <Route path="/*" element={<Navigate to="/" />}/>
      </Routes>
    </Container>
    
  )
}

export default App
