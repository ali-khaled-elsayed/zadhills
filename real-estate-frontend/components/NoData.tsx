interface NoDataProps {
  message?: string;
  className?: string;
}

export default function NoData({
  message = 'No data to display',
  className = '',
}: NoDataProps) {
  return (
    <div className={`rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm ${className}`.trim()}>
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
}
