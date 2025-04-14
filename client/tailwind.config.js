/** @type {import('tailwindcss').Config} */


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        main_background: '#dae0e6',
        border_hover: '#edeff1',
        border_focus: '#47b0db',
        primary_text: '#1c1c1c',
        search_background: '#f6f7f8',
        search_color: '#878a8c',
        karma_color: '#a8aaab',
        sawwit_blue: '#318CE7',
        sawwit_orange:'#FF5700',
        profile_dropdown_gray: '#787c7e',
        component_border: '#d2d2d2',
        nocommunities: '#e5e9ed',
        nocommunities_border: '#d6d9dd'
      },
    },
    screens: {
      'xs' : [
        {'max': '790px'}
      ],
      'sm': [
        {'max': '990px'}
      ],
      'md': [
        {'max': '1050px'}
      ],
      'lg': [
        {'max': '1200px'}
      ],
      'xl': '1400px',
    },
    plugins: [],
  }
}

