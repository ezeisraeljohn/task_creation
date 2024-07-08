/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
        './task_creation_app/templates/**/*.html',
        './task_creation_app/templates/**/*.js',
        './task_creation_app/static/task_creation_app/**/*.css',
        './task_creation_app/static/task_creation_app/**/*.js',
         './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
        boxShadow: {
                'dragging': '0 0 10px rgba(0, 0, 0, 0.5)',
              },
        opacity: {
                '10': '0.1',
                '20': '0.2',
                '30': '0.3',
                '40': '0.4',
                '50': '0.5',
                '60': '0.6',
                '70': '0.7',
                '80': '0.8',
                '90': '0.9',
              },
    },
  },
  plugins: [
        require('flowbite/plugin')
  ],
}

