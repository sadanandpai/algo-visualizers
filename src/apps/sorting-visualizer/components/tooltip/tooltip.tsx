import { FC, ReactNode } from 'react';
import classes from "./tooltip.module.scss";

interface TooltipProps {
  text: string;
  children: ReactNode;
}

const Tooltip: FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className={classes.tooltipContainer}>
      {children}
      <div className={classes.tooltip}>
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
