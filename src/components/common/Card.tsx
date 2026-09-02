import React from 'react';

interface CardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  badge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  headerClassName?: string;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  action,
  badge,
  children,
  className = '',
  bodyClassName = '',
  headerClassName = '',
  noPadding = false
}) => {
  const hasHeader = title || subtitle || action || badge;

  return (
    <div className={`bg-white rounded-xl border border-gray-200/80 shadow-subtle hover:shadow-card transition-shadow duration-200 ${className}`}>
      {hasHeader && (
        <div className={`px-5 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3 ${headerClassName}`}>
          <div>
            <div className="flex items-center gap-2.5">
              {typeof title === 'string' ? (
                <h3 className="text-base font-semibold text-gray-900 tracking-tight">{title}</h3>
              ) : (
                title
              )}
              {badge}
            </div>
            {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div className="flex items-center gap-2">{action}</div>}
        </div>
      )}
      <div className={noPadding ? bodyClassName : `p-5 ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};
