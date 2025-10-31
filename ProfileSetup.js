import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FiArrowRight } from 'react-icons/fi';

const DEFAULT_AVATAR = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNDAgODBjMjIuMDkxNCAwIDQwLTE3LjkwODYgNDAtNDBTNjIuMDkxNCAwIDQwIDAgMCAxNy45MDg2IDAgNDBzMTcuOTA4NiA0MCA0MCA0MHoiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNDAgMEMyOC45NTQzIDAgMTkuMDgxNyA1LjE3MTQzIDEyLjkyODkgMTMuMzM3MWw1NC43MzQyIDU0LjczNDJDNzQuODI4NiA2MC45MTgzIDgwIDUxLjA0NTcgODAgNDBjMC0yMi4wOTE0LTE3LjkwODYtNDAtNDAtNDB6IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4xNSIvPjwvc3ZnPg==';

function ProfileSetup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [tagline, setTagline] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const auth = getAuth();
  const db = getFirestore();

  const validateForm = () => {
    if (username.length < 3 || username.length > 15) {
      setError('Username must be between 3 and 15 characters');
      return false;
    }
    if (tagline.length > 60) {
      setError('Tagline must be less than 60 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error('Not authenticated');

      await setDoc(doc(db, 'users', uid), {
        username,
        tagline,
        profilePic: DEFAULT_AVATAR,
        createdAt: new Date().toISOString()
      });

      navigate('/home');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return React.createElement('div', { 
    className: "min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-950/30 text-white font-poppins" 
  }, 
    React.createElement('div', { 
      className: "max-w-md mx-auto px-6 py-16" 
    },
      React.createElement(motion.div, {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        className: "bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
      }, [
        React.createElement('div', { 
          key: 'header',
          className: "text-center mb-8" 
        }, [
          React.createElement(motion.div, {
            key: 'avatar',
            initial: { scale: 0.5, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            transition: { delay: 0.2 },
            className: "w-24 h-24 mx-auto mb-6"
          },
            React.createElement('img', {
              src: DEFAULT_AVATAR,
              alt: "Default Avatar",
              className: "w-full h-full"
            })
          ),
          React.createElement('h1', { 
            key: 'title',
            className: "text-3xl font-bold mb-2 neon" 
          }, "Set up your profile ⚡"),
          React.createElement('p', { 
            key: 'subtitle',
            className: "text-gray-400" 
          }, "Show the world your energy.")
        ]),

        error && React.createElement(motion.div, {
          key: 'error',
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          className: "mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center"
        }, error),

        React.createElement('form', { 
          key: 'form',
          onSubmit: handleSubmit,
          className: "space-y-6" 
        }, [
          React.createElement('div', { key: 'username-field' }, [
            React.createElement('label', { 
              className: "block text-sm text-gray-400 mb-2" 
            }, "Username"),
            React.createElement('input', {
              type: "text",
              value: username,
              onChange: (e) => setUsername(e.target.value),
              className: "w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent transition-shadow",
              placeholder: "Choose a username",
              maxLength: 15,
              required: true
            })
          ]),

          React.createElement('div', { key: 'tagline-field' }, [
            React.createElement('label', { 
              className: "block text-sm text-gray-400 mb-2" 
            }, "Tagline"),
            React.createElement('input', {
              type: "text",
              value: tagline,
              onChange: (e) => setTagline(e.target.value),
              className: "w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent transition-shadow",
              placeholder: "Your fitness motto",
              maxLength: 60
            })
          ]),

          React.createElement(motion.button, {
            key: 'submit-button',
            whileHover: { scale: 1.02 },
            whileTap: { scale: 0.98 },
            type: "submit",
            disabled: loading,
            className: "w-full py-4 rounded-xl bg-gradient-to-r from-accent via-accent to-neon text-black font-semibold mt-8 hover:shadow-lg hover:shadow-accent/20 transition-shadow flex items-center justify-center gap-2 disabled:opacity-50"
          }, loading ? 'Setting up...' : [
            'Continue',
            React.createElement(FiArrowRight, { 
              key: 'arrow',
              className: "text-xl" 
            })
          ])
        ])
      ])
    )
  );
}

export default ProfileSetup;