# Lendsqr Frontend Test

A modern, responsive web application built with Next.js and TypeScript for managing user data in a financial services platform. This project demonstrates a comprehensive dashboard interface with user management capabilities, including authentication, data visualization, and responsive design.

## 🚀 Features

### Authentication

- **Secure Login System**: Clean and intuitive sign-in interface
- **Form Validation**: Client-side validation for email and password fields
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Dashboard

- **User Management**: Comprehensive user listing with detailed information
- **Interactive Table**: Sortable, filterable, and paginated data table
- **User Statistics**: Visual cards displaying key metrics:
  - Total Users: 2,453
  - Active Users: 2,453
  - Users with Loans: 12,453
  - Users with Savings: 102,453

### User Management Features

- **Advanced Filtering**: Multi-criteria filtering system
- **Search Functionality**: Real-time search across user data
- **User Actions**:
  - View detailed user profiles
  - Blacklist/Unblacklist users
  - Activate/Deactivate user accounts
- **Detailed User Profiles**: Comprehensive user information including:
  - Personal Information
  - Education and Employment
  - Social Information
  - Guarantor Details
  - Bank Details
  - Loans and Savings Information

### Responsive Design

- **Mobile-First Approach**: Optimized for all screen sizes
- **Adaptive Components**: Tables transform to card layouts on mobile
- **Touch-Friendly Interface**: Mobile-optimized interactions

## 🛠 Tech Stack

- **Framework**: [Next.js 15.3.1](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**:
  - [Sass/SCSS](https://sass-lang.com/) modules
  - CSS Grid and Flexbox for layouts
  - Custom CSS variables for theming
- **UI Components**:
  - [Material-UI (MUI)](https://mui.com/) v7.2.0
  - Custom reusable components
- **Date Handling**:
  - [date-fns](https://date-fns.org/) for date formatting
  - [Day.js](https://day.js.org/) for date manipulation
  - MUI X Date Pickers for date selection
- **Icons**: Custom SVG icon system
- **Fonts**: Avenir Next and Work Sans
- **State Management**: React Context API
- **Data Storage**: Local Storage for user data persistence

## 📁 Project Structure

```
lendsqr/
├── public/
│   ├── icons/                    # SVG icons and assets
│   ├── Avenir Next/             # Custom font files
│   └── *.svg                    # Static SVG assets
├── src/
│   ├── app/
│   │   ├── dashboard/           # Dashboard pages
│   │   │   ├── [id]/           # Dynamic user detail pages
│   │   │   ├── layout.tsx      # Dashboard layout
│   │   │   └── page.tsx        # Main dashboard page
│   │   ├── styles/             # Global and component styles
│   │   │   ├── dashboard/      # Dashboard-specific styles
│   │   │   ├── layout/         # Layout component styles
│   │   │   └── *.module.scss   # Component-specific styles
│   │   ├── globals.css         # Global CSS
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Landing page (Sign-in)
│   ├── components/
│   │   ├── dashboard/          # Dashboard components
│   │   │   ├── idPage/         # User detail page components
│   │   │   ├── DashboardCards.tsx
│   │   │   ├── DashboardTable.tsx
│   │   │   └── Filter.tsx
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── MobileSidebar.tsx
│   │   │   └── LayoutContext.tsx
│   │   ├── shared/             # Reusable components
│   │   │   ├── ReusableTable.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── InputField.tsx
│   │   │   ├── ActionMenu.tsx
│   │   │   └── ...
│   │   └── sign-in/            # Authentication components
│   └── helpers/
│       ├── types.ts            # TypeScript type definitions
│       └── utils.ts            # Utility functions
├── eslint.config.mjs           # ESLint configuration
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/codeAmbivert/lendsqr.git
   cd lendsqr
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Building for Production

```bash
npm run build
npm start
```

## 🔐 Authentication

The application uses a simple authentication system:

- **Email**: Any valid email format
- **Password**: Any non-empty password
- Upon successful login, users are redirected to the dashboard

## 📱 Responsive Behavior

### Desktop (≥768px)

- Full sidebar navigation
- Tabular data display
- Hover interactions
- Extended action menus

### Mobile (<768px)

- Collapsible mobile sidebar
- Card-based data display
- Touch-optimized interactions
- Simplified navigation

## 🎨 Design System

### Color Palette

- **Primary**: #39CDCC (Teal)
- **Text Primary**: #213F7D (Dark Blue)
- **Text Secondary**: #545F7D (Gray)
- **Background**: #FBFCFD (Light Gray)
- **Success**: #39CD62 (Green)
- **Warning**: #E9B200 (Yellow)
- **Error**: #E53E3E (Red)

### Typography

- **Primary Font**: Work Sans
- **Secondary Font**: Avenir Next
- **Weights**: 100, 300, 400, 500, 600, 700

### Components

- Modular SCSS architecture
- Consistent spacing using CSS Grid
- Reusable component library
- Mobile-first responsive design

## 🧪 Testing

The project includes:

- TypeScript for type safety
- ESLint for code quality
- Responsive design testing across devices

## 📊 Features Showcase

### Dashboard Analytics

- Real-time user statistics
- Visual data representation
- Quick access to key metrics

### User Management

- Comprehensive user profiles
- Status management (Active, Inactive, Pending, Blacklisted)
- Bulk actions and filtering
- Export capabilities

### Data Persistence

- Local storage integration
- State management across sessions
- Optimistic UI updates

## 🔧 Configuration

### Environment Setup

The application is configured for immediate use without additional environment variables for the demo version.

### Customization

- Modify `src/app/globals.css` for global styles
- Update `src/helpers/types.ts` for type definitions
- Customize components in `src/components/shared/`

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is created as a frontend assessment for Lendsqr.

## 👨‍💻 Developer

Created by [Onifade Titilope Chisom](https://github.com/codeAmbivert)

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Material-UI Documentation](https://mui.com/getting-started/overview/)
- [Sass Documentation](https://sass-lang.com/documentation)

For more information about this project or to report issues, please visit the [GitHub repository](https://github.com/codeAmbivert/lendsqr).
