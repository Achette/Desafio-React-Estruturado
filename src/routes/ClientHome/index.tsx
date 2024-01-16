
import { Outlet } from 'react-router-dom';
import { HeaderClient } from '@/components';


export default function ClientHome() {
  return (
    <>
      <HeaderClient />
      <Outlet />
    </>
  );
}
