import Controller from '@/apps/sorting-visualizer/components/controller/controller';
import Navbar from '@/lib/components/navbar/navbar';
import { PropsWithChildren } from 'react';
import ThemeIcon from '@/lib/components/theme-icon/theme-icon';
import classes from './layout.module.scss';
import { menuItems } from '@/apps/sorting-visualizer/config';

function MainLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <ThemeIcon bottom={10} right={20} />
      <Navbar title="Sorting visualizer" menuItems={menuItems} />
      <Controller />
      <main className={classes.main}>{children}</main>
    </div>
  );
}

export default MainLayout;
