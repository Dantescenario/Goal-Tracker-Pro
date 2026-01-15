# Goal Tracker Pro

A modern, feature-rich goal tracking application built with React, Vite, and Tailwind CSS. Track your daily, weekly, and monthly goals with real-time progress monitoring and motivational quotes.

## Features

- **Multiple Goal Categories**: Organize goals into Daily, Weekly, and Monthly categories
- **Progress Tracking**: Visual progress bars with percentage tracking for each goal
- **Calendar View**: See your goals laid out on a calendar with progress indicators
- **Local Storage**: All your data is automatically saved to your browser's local storage
- **Motivational Quotes**: Get inspired with rotating motivational quotes that change every 30 seconds
- **Goal History**: Track progress updates over time with detailed timestamps
- **Responsive Design**: Beautiful gradient UI that works on all screen sizes
- **Interactive UI**: Smooth animations and transitions for a polished user experience

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **JavaScript (ES6+)** - Core language

## Installation

1. Clone or download this project to your local machine

2. Navigate to the project directory:
```bash
cd "GOAL TRACKER PRO"
```

3. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The application will open automatically at `http://localhost:3000/`

The dev server includes hot module replacement (HMR), so changes to your code will reflect instantly in the browser.

## Build for Production

Create an optimized production build:
```bash
npm run build
```

The compiled files will be in the `dist/` directory.

## Preview Production Build

To preview the production build locally:
```bash
npm run preview
```

## Usage

### Adding Goals

1. Select a category (Daily, Weekly, or Monthly) using the tab buttons
2. Enter your goal text in the input field
3. (Optional) Select a due date using the date picker
4. Click the "Add" button or press Enter

### Tracking Progress

- Use the progress slider on each goal to update completion percentage (0-100%)
- Click the circle icon to mark a goal as complete
- Completed goals will turn green and show a checkmark

### Calendar View

1. Click the "Calendar View" button to switch to calendar mode
2. Each date shows the number of goals and average progress
3. Click on any date to see goals for that specific day
4. Navigate months using the arrow buttons

### Viewing History

- Click "View Progress History" on any goal to see timestamp-based progress updates
- The history shows the date, time, and progress percentage

### Deleting Goals

- Click the trash icon on any goal to permanently delete it

## Data Persistence

All your goals are automatically saved to your browser's local storage. Your data will persist between sessions, but only on the same browser and computer.

## Features in Detail

### Motivational Quotes
- New quote appears when the app loads
- Quotes rotate automatically every 30 seconds
- A new quote is displayed when you add a new goal

### Statistics Dashboard
- View total goals for each category
- See completed goal count
- Track average progress percentage for each category

### Progress Visualization
- Color-coded progress bars for each category
- Real-time percentage display
- Gradient animations for visual feedback

## Browser Compatibility

Works on all modern browsers that support:
- ES6 JavaScript
- CSS Grid and Flexbox
- Local Storage API
- CSS Gradients and Animations

## Project Structure

```
GOAL TRACKER PRO/
├── src/
│   ├── main.jsx           # React entry point
│   ├── App.jsx            # Main component
│   └── index.css          # Global styles
├── index.html             # HTML entry point
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
└── README.md              # This file
```

## Tips for Best Results

1. **Set Realistic Goals**: Break large goals into smaller, manageable tasks
2. **Regular Updates**: Update your progress regularly to stay motivated
3. **Use Calendar View**: Switch to calendar view to visualize your goals across time
4. **Track History**: Check your progress history to see how far you've come
5. **Diverse Categories**: Use all three categories (Daily, Weekly, Monthly) for balanced goal setting

## Future Enhancement Ideas

- Export goals as PDF
- Goal categories/tags
- Recurring goals
- Goal templates
- Dark mode toggle
- Multiple projects/workspaces
- Goal sharing functionality
- Notifications and reminders
- Goal analytics and charts

## License

This project is open source and available for personal use.

## Support

If you encounter any issues, please check:
1. Your Node.js version (v16 or higher recommended)
2. That all dependencies are installed (`npm install`)
3. Your browser's console for any error messages

## Credits

- Icons provided by [Lucide React](https://lucide.dev/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- Built with [Vite](https://vitejs.dev/) and [React](https://react.dev/)

---

Happy goal tracking! 🎯
