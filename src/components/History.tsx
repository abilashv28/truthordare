interface HistoryProps {
  history: string[];
}

export default function History({ history }: HistoryProps) {
  return (
    <div className="mt-8 text-left">
      <h2 className="text-lg font-bold text-gray-700 mb-2">
        History
      </h2>
      <ul className="max-h-32 overflow-y-auto text-gray-600 text-sm space-y-1">
        {history.map((item, idx) => (
          <li key={idx}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}
