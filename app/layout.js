import './globals.css'

export const metadata = {
  title: 'Wedding Planning Gantt Chart',
  description: 'Wedding planning timeline and task management',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}