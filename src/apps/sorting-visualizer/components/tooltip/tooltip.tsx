import classes from "./tooltip.module.scss";
import { TooltipProps } from "@/apps/sorting-visualizer/models/interfaces";

function Tooltip({ text, children }: TooltipProps) {
  return (
    <div className={classes.tooltipContainer}>
      {children}
      <div className={classes.tooltip}>
        {text}
      </div>
    </div>
  );
}

export default Tooltip;
