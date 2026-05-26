const ICONS: Record<string, string> = {
  tip: 'fa-lightbulb',
  warning: 'fa-triangle-exclamation',
  important: 'fa-circle-info',
  danger: 'fa-circle-xmark',
};

const LABELS: Record<string, string> = {
  tip: 'Tip',
  warning: 'Warning',
  important: 'Important',
  danger: 'Danger',
};

export default function TipBox({ type = 'tip', title, children }: { type?: string; title?: any; children: any }) {
  return (
    <div className={`tip-box ${type}`}>
      <span className="tip-box-icon">
        <i className={`fa-solid ${ICONS[type]}`} />
      </span>
      <div className="tip-box-content">
        {title && <strong>{title}</strong>}
        {!title && <strong>{LABELS[type]}</strong>}
        <div>{children}</div>
      </div>
    </div>
  );
}
