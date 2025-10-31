import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaDumbbell } from 'react-icons/fa';
import { auth, googleProvider } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

function AuthPanel() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const toggle = (m) => {
    setMode(m);
    setAlert(null);
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);
    
    try {
      if (mode === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate('/setup');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/home');
      }
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setAlert(null);
    
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/setup');
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
      setLoading(false);
    }
  };

  return React.createElement(motion.div, {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    className: "w-full max-w-md relative z-10"
  },
    React.createElement('div', {
      className: "bg-black/30 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent before:pointer-events-none"
    }, [
      React.createElement('div', {
        key: 'header',
        className: "flex items-center gap-3 mb-6"
      }, [
        React.createElement('div', {
          key: 'icon-container',
          className: "p-4 bg-gradient-to-br from-accent via-glow to-accent text-white rounded-2xl shadow-xl ring-1 ring-white/20 relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/20 before:to-transparent before:pointer-events-none"
        },
          React.createElement(FaDumbbell, { className: "text-2xl" })
        ),
        React.createElement('div', { key: 'text' }, [
          React.createElement('h3', {
            key: 'title',
            className: "text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/70 tracking-tight"
          }, mode === 'login' ? 'Welcome Back' : 'Create Account'),
          React.createElement('p', {
            key: 'subtitle',
            className: "text-sm text-gray-300"
          }, mode === 'login' ? 'Sign in to continue training' : 'Start your fitness journey')
        ])
      ]),

      React.createElement('div', {
        key: 'tabs',
        className: "mb-6 flex rounded-full p-1 bg-gradient-to-r from-white/10 via-white/5 to-white/10 ring-1 ring-white/10"
      }, [
        React.createElement('button', {
          key: 'login-tab',
          onClick: () => toggle('login'),
          className: `flex-1 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${mode === 'login' ? 'bg-white/10 text-white shadow-xl shadow-black/20' : 'bg-transparent text-white/60 hover:text-white/80'}`
        }, 'Login'),
        React.createElement('button', {
          key: 'signup-tab',
          onClick: () => toggle('signup'),
          className: `flex-1 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${mode === 'signup' ? 'bg-white/10 text-white shadow-xl shadow-black/20' : 'bg-transparent text-white/60 hover:text-white/80'}`
        }, 'Signup')
      ]),

      alert && React.createElement(motion.div, {
        key: 'alert',
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        className: `mb-4 px-4 py-2 rounded ${alert.type === 'success' ? 'bg-green-600/20 border border-green-400' : 'bg-red-600/10 border border-red-400'} text-sm`
      }, alert.message),

      React.createElement('form', {
        key: 'form',
        onSubmit: handleEmailAuth,
        className: "space-y-4"
      }, [
        React.createElement('div', { key: 'email-field' }, [
          React.createElement('label', {
            className: "block text-xs text-gray-300 mb-1"
          }, 'Email'),
          React.createElement('input', {
            type: 'email',
            value: email,
            onChange: (e) => setEmail(e.target.value),
            className: "w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent",
            placeholder: "you@fitness.com",
            required: true
          })
        ]),

        React.createElement('div', { key: 'password-field' }, [
          React.createElement('label', {
            className: "block text-xs text-gray-300 mb-1"
          }, 'Password'),
          React.createElement('input', {
            type: 'password',
            value: password,
            onChange: (e) => setPassword(e.target.value),
            className: "w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent",
            placeholder: "••••••••",
            required: true
          })
        ]),

        React.createElement('button', {
          key: 'submit-button',
          type: 'submit',
          disabled: loading,
          className: "w-full py-3 rounded-xl bg-gradient-to-r from-accent via-accent to-glow text-white font-semibold shadow-lg hover:shadow-accent/20 transition-all duration-300 disabled:opacity-60 hover:scale-[1.02]"
        }, loading ? (mode === 'signup' ? 'Creating...' : 'Signing in...') : (mode === 'signup' ? 'Create account' : 'Sign in'))
      ]),

      React.createElement('div', {
        key: 'divider',
        className: "mt-4 text-center text-sm text-gray-400"
      }, 'or'),

      React.createElement('div', {
        key: 'google-button',
        className: "mt-3 grid grid-cols-1 gap-3"
      },
        React.createElement('button', {
          onClick: handleGoogle,
          disabled: loading,
          className: "py-3 rounded-xl border border-white/10 bg-white/5 text-white flex items-center justify-center gap-3 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
        }, [
          React.createElement('svg', {
            key: 'google-icon',
            width: "18",
            height: "18",
            viewBox: "0 0 24 24",
            fill: "none"
          }, [
            React.createElement('path', {
              key: 'p1',
              d: "M21 12.3c0-.7-.1-1.4-.2-2H12v3.8h5.5c-.2 1.1-.9 2-1.9 2.6v2.2h3.1c1.8-1.6 2.8-4 2.8-6.6z",
              fill: "#4285F4"
            }),
            React.createElement('path', {
              key: 'p2',
              d: "M12 22c2.7 0 4.9-.9 6.6-2.5l-3.1-2.2c-.9.6-2.1 1-3.5 1-2.7 0-5-1.8-5.8-4.2H3.9v2.6C5.6 19.9 8.6 22 12 22z",
              fill: "#34A853"
            }),
            React.createElement('path', {
              key: 'p3',
              d: "M6.2 13.1c-.2-.6-.3-1.2-.3-1.9s.1-1.3.3-1.9V6.7H3.9C3.3 8.1 3 9.5 3 11s.3 2.9.9 4.3l2.3-2.2z",
              fill: "#FBBC05"
            }),
            React.createElement('path', {
              key: 'p4',
              d: "M12 5.2c1.5 0 2.9.5 4 1.6l3-3C16.9 1.8 14.7 1 12 1 8.6 1 5.6 3.1 3.9 6.1l2.3 2.6C7 7.1 9.3 5.2 12 5.2z",
              fill: "#EA4335"
            })
          ]),
          React.createElement('span', {
            key: 'button-text'
          }, loading ? 'Please wait...' : 'Continue with Google')
        ])
      ),

      React.createElement('div', {
        key: 'terms',
        className: "mt-6 text-xs text-gray-400 text-center"
      }, [
        'By continuing you agree to our ',
        React.createElement('span', {
          key: 'terms-link',
          className: "text-white underline"
        }, 'Terms'),
        ' and ',
        React.createElement('span', {
          key: 'privacy-link',
          className: "text-white underline"
        }, 'Privacy'),
        '.'
      ])
    ])
  );
}

export default AuthPanel;