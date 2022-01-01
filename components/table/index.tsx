import clsx from 'clsx';

export function Table({ children, className }: { children?: any; className?: string }) {
  return (
    <table className={clsx(className, 'border-collapse table-auto w-full text-sm')}>
      {children}
    </table>
  );
}

export function Th({ children, className }: { children?: any; className?: string }) {
  return (
    <th
      className={clsx(
        className,
        'border-b dark:border-gray-600 font-medium p-0 sm:p-3 pt-0 pb-3 text-gray-400 dark:text-gray-200 text-left'
      )}
    >
      {children}
    </th>
  );
}

export function Td({ children, className }: { children?: any; className?: string }) {
  return (
    <td
      className={clsx(
        className,
        'border-b border-gray-100 dark:border-gray-700 p-0 sm:p-3 pt-0 pl-2 text-gray-500 dark:text-gray-400'
      )}
    >
      {children}
    </td>
  );
}
