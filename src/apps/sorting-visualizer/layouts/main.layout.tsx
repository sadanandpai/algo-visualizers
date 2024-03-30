import ThemeIcon from '@/lib/components/theme-icon/theme-icon';
import Controller from '@sortViz/components/controller/controller';
import Navbar from '@sortViz/components/navbar/navbar';
import { menuItems } from '@sortViz/config';
import { PropsWithChildren } from 'react';
import classes from './layout.module.scss';

function MainLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <ThemeIcon bottom={10} right={20} />
      <Navbar title="Sorting Visualizer" menuItems={menuItems} />
      <Controller />
      <main className={classes.main}>{children}</main>
    </div>
  );
}

export default MainLayout;
