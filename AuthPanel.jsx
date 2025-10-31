import React, { useState } from 'react'
import { FaDumbbell } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { auth, googleProvider } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'

export default function AuthPanel(){
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  const toggle = (m)=>{ setMode(m); setAlert(null) }

  const handleEmailAuth = async (e)=>{
    e.preventDefault()
    setLoading(true)
    setAlert(null)
    try{
      let res
      if(mode==='signup'){
        res = await createUserWithEmailAndPassword(auth, email, password)
        setAlert({type:'success', message: 'Account created — welcome!'})
      } else {
        res = await signInWithEmailAndPassword(auth, email, password)
        setAlert({type:'success', message: 'Signed in successfully'})
      }
    } catch(err){
      setAlert({type:'error', message: err.message})
    } finally{
      setLoading(false)
    }
  }

  const handleGoogle = async ()=>{
    setLoading(true)
    setAlert(null)
    try{
      await signInWithPopup(auth, googleProvider)
      setAlert({type:'success', message: 'Signed in with Google'})
    } catch(err){
      setAlert({type:'error', message: err.message})
    } finally{ setLoading(false) }
  }

  return (
    <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="w-full max-w-md">
      <div className="bg-white/6 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-accent to-neon text-black rounded-xl shadow-md">
            <FaDumbbell className="text-2xl" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h3>
            <p className="text-sm text-gray-300">{mode === 'login' ? 'Sign in to continue training' : 'Start your fitness journey'}</p>
          </div>
        </div>

        <div className="mb-4 flex rounded-full p-1 bg-gradient-to-r from-[#0f172a]/50 via-transparent to-transparent">
          <button onClick={()=>toggle('login')} className={`flex-1 py-2 rounded-full text-sm font-semibold ${mode==='login' ? 'bg-black/60 shadow-inner' : 'bg-transparent text-gray-300'}`}>Login</button>
          <button onClick={()=>toggle('signup')} className={`flex-1 py-2 rounded-full text-sm font-semibold ${mode==='signup' ? 'bg-black/60 shadow-inner' : 'bg-transparent text-gray-300'}`}>Signup</button>
        </div>

        {alert && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} className={`mb-4 px-4 py-2 rounded ${alert.type==='success' ? 'bg-green-600/20 border border-green-400' : 'bg-red-600/10 border border-red-400'} text-sm`}>{alert.message}</motion.div>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-300 mb-1">Email</label>
            <input required value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent" placeholder="you@fitness.com" />
          </div>

          <div>
            <label className="block text-xs text-gray-300 mb-1">Password</label>
            <input required value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent" placeholder="••••••••" />
          </div>

          <button disabled={loading} type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-accent to-neon text-black font-semibold shadow-lg disabled:opacity-60">
            {loading ? (mode==='signup' ? 'Creating...' : 'Signing in...') : (mode==='signup' ? 'Create account' : 'Sign in')}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-400">or</div>

        <div className="mt-3 grid grid-cols-1 gap-3">
          <button onClick={handleGoogle} disabled={loading} className="py-2 rounded-xl border border-white/8 bg-black/30 text-white flex items-center justify-center gap-3 hover:bg-white/5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 12.3c0-.7-.1-1.4-.2-2H12v3.8h5.5c-.2 1.1-.9 2-1.9 2.6v2.2h3.1c1.8-1.6 2.8-4 2.8-6.6z" fill="#4285F4"/><path d="M12 22c2.7 0 4.9-.9 6.6-2.5l-3.1-2.2c-.9.6-2.1 1-3.5 1-2.7 0-5-1.8-5.8-4.2H3.9v2.6C5.6 19.9 8.6 22 12 22z" fill="#34A853"/><path d="M6.2 13.1c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V6.7H3.9C3.3 8.1 3 9.5 3 11s.3 2.9.9 4.3l2.3-2.2z" fill="#FBBC05"/><path d="M12 5.2c1.5 0 2.9.5 4 1.6l3-3C16.9 1.8 14.7 1 12 1 8.6 1 5.6 3.1 3.9 6.1l2.3 2.6C7 7.1 9.3 5.2 12 5.2z" fill="#EA4335"/></svg>
            <span>{loading ? 'Please wait...' : 'Continue with Google'}</span>
          </button>
        </div>

        <div className="mt-6 text-xs text-gray-400 text-center">By continuing you agree to our <span className="text-white underline">Terms</span> and <span className="text-white underline">Privacy</span>.</div>
      </div>
    </motion.div>
  )
}
