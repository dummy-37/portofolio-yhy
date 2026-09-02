type TooltipProps = {
  content: string;
  label?: string;
  className?: string;
};

export function Tooltip({ content, label = "Details", className = "" }: TooltipProps) {
  return (
    <span className={`tooltip ${className}`.trim()}>
      <button className="tooltip-trigger" type="button" aria-label={`${label}: ${content}`}>
        i
      </button>
      <span className="tooltip-bubble" role="tooltip">{content}</span>
    </span>
  );
}
