import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiBell, FiMessageSquare, FiSearch, FiHome } from 'react-icons/fi';
import { FaDumbbell } from 'react-icons/fa';

function Home() {
  // Navbar icon variants for hover animation
  const iconHoverVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      filter: "brightness(1.2)",
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  // Fade in variants for main content
  const fadeInVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return React.createElement('div', {
    className: "min-h-screen bg-gradient-to-br from-black via-gray-900 to-[#1a0a0a] text-white relative"
  }, [
    // Top Navbar
    React.createElement('nav', {
      key: 'navbar',
      className: "fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-black/90 via-black/85 to-black/90 backdrop-blur-lg border-b border-white/5 shadow-lg"
    },
      React.createElement('div', {
        className: "max-w-7xl mx-auto px-4 h-16 flex items-center justify-between"
      }, [
        // Logo/Brand
        React.createElement('div', {
          key: 'brand',
          className: "flex items-center gap-2"
        }, [
          React.createElement(FaDumbbell, {
            key: 'logo',
            className: "text-2xl text-accent"
          }),
          React.createElement('span', {
            key: 'brand-text',
            className: "text-xl font-bold bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent tracking-tight"
          }, "EGEM")
        ]),

        // Action Icons
        React.createElement('div', {
          key: 'actions',
          className: "flex items-center gap-6"
        }, [
          React.createElement(motion.button, {
            key: 'new',
            variants: iconHoverVariants,
            initial: "initial",
            whileHover: "hover",
            className: "p-2 hover:bg-white/5 rounded-full transition-colors"
          }, React.createElement(FiPlus, { className: "text-xl" })),
          
          React.createElement(motion.button, {
            key: 'notifications',
            variants: iconHoverVariants,
            initial: "initial",
            whileHover: "hover",
            className: "p-2 hover:bg-white/5 rounded-full transition-colors"
          }, React.createElement(FiBell, { className: "text-xl" })),
          
          React.createElement(motion.button, {
            key: 'messages',
            variants: iconHoverVariants,
            initial: "initial",
            whileHover: "hover",
            className: "p-2 hover:bg-white/5 rounded-full transition-colors"
          }, React.createElement(FiMessageSquare, { className: "text-xl" })),
          
          React.createElement(motion.button, {
            key: 'search',
            variants: iconHoverVariants,
            initial: "initial",
            whileHover: "hover",
            className: "p-2 hover:bg-white/5 rounded-full transition-colors"
          }, React.createElement(FiSearch, { className: "text-xl" }))
        ])
      ])
    ),

    // Main Content
    React.createElement(motion.main, {
      key: 'main',
      className: "pt-24 pb-24 px-4 text-center",
      initial: "initial",
      animate: "animate",
      variants: fadeInVariants
    }, [
      React.createElement(motion.h1, {
        key: 'title',
        className: "text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent",
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.2 }
      }, "Welcome to EGEM🏋️‍♂️"),
      
      React.createElement(motion.p, {
        key: 'subtitle',
        className: "text-xl md:text-2xl text-gray-400",
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.4 }
      }, "Where discipline meets fire 🔥")
    ]),

    // Bottom Navigation
    React.createElement('div', {
      key: 'bottom-nav',
      className: "fixed bottom-0 left-0 right-0 z-50"
    },
      React.createElement('div', {
        className: "bg-black/50 backdrop-blur-xl border-t border-white/10 px-4 py-3"
      },
        React.createElement('div', {
          className: "max-w-7xl mx-auto flex justify-center"
        },
          React.createElement(motion.button, {
            className: "flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent",
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 }
          }, [
            React.createElement(FiHome, {
              key: 'home-icon',
              className: "text-xl"
            }),
            React.createElement('span', {
              key: 'home-text',
              className: "font-medium"
            }, "Home")
          ])
        )
      )
    )
  ]);
}

export default Home;