import Controller from '@/apps/sorting-visualizer/components/controller/controller';
import ModeIcon from '@/apps/sorting-visualizer/components/theme/mode-icon';
import Navbar from '@/apps/sorting-visualizer/components/navbar/navbar';
import { PropsWithChildren } from 'react';
import { Toaster } from 'sonner';
import classes from './layout.module.scss';
import { menuItems } from '@/apps/sorting-visualizer/config';

function MainLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navbar menuItems={menuItems} />
      <Controller />
      <main className={classes.main}>{children}</main>
      <ModeIcon />
      <Toaster richColors duration={3000} />
    </div>
  );
}

export default MainLayout;
