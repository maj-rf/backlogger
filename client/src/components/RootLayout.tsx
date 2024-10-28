import { Outlet } from 'react-router-dom';

export function RootLayout() {
  return (
    <div className="container">
      <nav>Sidebar</nav>
      <main>Main</main>
      <Outlet />
    </div>
  );
}
