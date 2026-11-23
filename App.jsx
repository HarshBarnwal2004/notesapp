
import React, { useEffect, useState } from 'react'

const initialNotes = [
  {
    id: 1,
    title: 'Welcome to your Notes',
    content: 'Your thoughts deserve a beautiful space. Start organizing your ideas, tasks and memories here.',
    color: 'bg-yellow-100',
    pinned: true,
    date: 'Today'
  },
  {
    id: 2,
    title: 'Project Ideas',
    content: 'Build a personal portfolio, explore new AI tools and work on some exciting React projects.',
    color: 'bg-purple-100',
    pinned: false,
    date: 'Today'
  },
  {
    id: 3,
    title: 'Daily Goals',
    content: 'Complete coding practice, learn something new and spend some time reading.',
    color: 'bg-blue-100',
    pinned: false,
    date: 'Yesterday'
  },
  {
    id: 4,
    title: 'Important Reminders',
    content: 'Stay consistent. Small progress every day leads to big achievements.',
    color: 'bg-green-100',
    pinned: false,
    date: 'Yesterday'
  }
]

const colors = [
  'bg-yellow-100',
  'bg-purple-100',
  'bg-blue-100',
  'bg-green-100',
  'bg-pink-100',
  'bg-orange-100'
]

const App = () => {
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('my-notes')) || initialNotes
    } catch {
      return initialNotes
    }
  })

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('All Notes')

  useEffect(() => {
    localStorage.setItem('my-notes', JSON.stringify(notes))
  }, [notes])

  const addNote = (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) return

    const newNote = {
      id: Date.now(),
      title,
      content,
      color: colors[Math.floor(Math.random() * colors.length)],
      pinned: false,
      date: new Date().toLocaleDateString()
    }

    setNotes([newNote, ...notes])
    setTitle('')
    setContent('')
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const togglePin = (id) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, pinned: !note.pinned } : note
    ))
  }

  const filteredNotes = notes.filter(note => {
    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())

    const matchesTab =
      activeTab === 'All Notes' ||
      (activeTab === 'Pinned Notes' && note.pinned)

    return matchesSearch && matchesTab
  }).sort((a, b) => Number(b.pinned) - Number(a.pinned))

  return (
    <div className="min-h-screen bg-[#0c0d12] text-white flex">

      {/* Sidebar */}
      <aside className="hidden md:flex w-64 border-r border-white/10 p-6 flex-col shrink-0">

        <div className="flex items-center gap-3 mb-12">
          <div className="w-11 h-11 bg-gradient-to-br from-violet-500 to-blue-500 rounded-xl flex items-center justify-center text-2xl">
            ✦
          </div>
          <div>
            <h1 className="text-xl font-bold">NoteSpace</h1>
            <p className="text-xs text-gray-500">Your second brain</p>
          </div>
        </div>

        <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">
          Workspace
        </p>

        <div className="space-y-2">
          {[
            { name: 'All Notes', icon: '▤' },
            { name: 'Pinned Notes', icon: '♢' }
          ].map(item => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition ${
                activeTab === item.name
                  ? 'bg-violet-500/15 text-violet-400'
                  : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-3">
                <span>{item.icon}</span>
                {item.name}
              </span>
              {item.name === 'All Notes' && (
                <span className="text-xs">{notes.length}</span>
              )}
              {item.name === 'Pinned Notes' && (
                <span className="text-xs">
                  {notes.filter(n => n.pinned).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-auto bg-gradient-to-br from-violet-600/20 to-blue-600/10 border border-violet-500/20 rounded-2xl p-5">
          <div className="text-2xl mb-3">💡</div>
          <h3 className="font-semibold mb-2">Stay organized</h3>
          <p className="text-xs text-gray-400 leading-5">
            Capture your ideas before they disappear. Your next big idea starts here.
          </p>
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5 md:p-10 overflow-y-auto">

        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-10">

          <div>
            <p className="text-gray-500 text-sm mb-2">Your personal workspace ✨</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {activeTab}
            </h1>
            <p className="text-gray-500 mt-2 text-sm">
              Capture ideas. Organize thoughts. Stay productive.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#171922] border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-400">
              📅 {new Date().toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </div>
            <div className="w-11 h-11 rounded-xl bg-violet-500/20 text-violet-300 flex items-center justify-center font-bold">
              N
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">

          <div className="bg-[#171922] border border-white/10 rounded-2xl p-5">
            <p className="text-gray-500 text-sm">Total Notes</p>
            <h2 className="text-3xl font-bold mt-2">{notes.length}</h2>
            <p className="text-xs text-violet-400 mt-2">Your collection</p>
          </div>

          <div className="bg-[#171922] border border-white/10 rounded-2xl p-5">
            <p className="text-gray-500 text-sm">Pinned Notes</p>
            <h2 className="text-3xl font-bold mt-2">
              {notes.filter(n => n.pinned).length}
            </h2>
            <p className="text-xs text-yellow-400 mt-2">Quick access</p>
          </div>

          <div className="hidden sm:block bg-[#171922] border border-white/10 rounded-2xl p-5">
            <p className="text-gray-500 text-sm">Your ideas</p>
            <h2 className="text-3xl font-bold mt-2">∞</h2>
            <p className="text-xs text-green-400 mt-2">Unlimited possibilities</p>
          </div>

        </div>

        {/* Add Note Form */}
        <section className="bg-[#171922] border border-white/10 rounded-2xl p-5 md:p-7 mb-10">

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center text-xl">
              ✎
            </div>
            <div>
              <h2 className="font-semibold text-lg">Create a new note</h2>
              <p className="text-xs text-gray-500">What's on your mind today?</p>
            </div>
          </div>

          <form onSubmit={addNote} className="space-y-4">

            <input
              type="text"
              placeholder="Give your note a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#0c0d12] border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-violet-500 transition placeholder:text-gray-600"
              required
            />

            <textarea
              placeholder="Write something interesting..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="3"
              className="w-full bg-[#0c0d12] border border-white/10 rounded-xl px-5 py-4 outline-none resize-none focus:border-violet-500 transition placeholder:text-gray-600"
              required
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 px-7 py-3 rounded-xl font-semibold transition shadow-lg shadow-violet-500/20"
              >
                + Add Note
              </button>
            </div>

          </form>
        </section>

        {/* Notes Section */}
        <section>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold">Your Notes</h2>
              <p className="text-gray-500 text-sm mt-1">
                {filteredNotes.length} notes found
              </p>
            </div>

            <input
              type="text"
              placeholder="⌕  Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#171922] border border-white/10 rounded-xl px-5 py-3 outline-none focus:border-violet-500 text-sm w-full sm:w-64"
            />
          </div>

          {filteredNotes.length === 0 ? (
            <div className="text-center py-20 bg-[#171922] rounded-2xl border border-white/10">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="font-semibold text-lg">No notes found</h3>
              <p className="text-gray-500 text-sm mt-2">
                Try another search or create a new note.
              </p>
            </div>
          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

              {filteredNotes.map(note => (

                <div
                  key={note.id}
                  className={`${note.color} rounded-2xl p-6 text-gray-900 min-h-52 flex flex-col justify-between hover:-translate-y-1 transition duration-300 shadow-lg`}
                >

                  <div>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <h3 className="font-bold text-lg break-words">
                        {note.title}
                      </h3>

                      <button
                        onClick={() => togglePin(note.id)}
                        title="Pin note"
                        className="text-xl hover:scale-125 transition"
                      >
                        {note.pinned ? '📌' : '♧'}
                      </button>
                    </div>

                    <p className="text-sm text-gray-700 leading-6 whitespace-pre-wrap break-words">
                      {note.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-8 pt-4 border-t border-black/10">
                    <span className="text-xs text-gray-600">
                      {note.date}
                    </span>

                    <button
                      onClick={() => deleteNote(note.id)}
                      title="Delete note"
                      className="text-gray-600 hover:text-red-600 transition text-sm font-medium"
                    >
                      🗑 Delete
                    </button>
                  </div>

                </div>

              ))}

            </div>
          )}

        </section>

        <footer className="text-center text-gray-600 text-xs mt-16 pb-5">
          Made with ♥ for your ideas · NoteSpace
        </footer>

      </main>
    </div>
  )
}

export default App
