import React from "react";

const colorClasses = {
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800",
  yellow: "bg-yellow-100 text-yellow-800",
  purple: "bg-purple-100 text-purple-800",
  gray: "bg-gray-100 text-gray-800",
};

export default function AuditLogs({ logs }) {
  return (
    <div className="mt-8 mb-10 bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">Audit Logs</h3>
            <p className="text-gray-600 mt-1">Recent account activities and changes</p>
        </div>
        <div className="p-6">
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-[#991b1b] text-xs">
                            <th className="font-semibold text-white">Timestamp</th>
                            <th className="font-semibold text-white">Action</th>
                            <th className="font-semibold text-white">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log, idx) => (
                            <tr key={idx} className="hover:bg-gray-100">
                                <td className="font-mono text-sm">{log.timestamp}</td>
                                <td><span className={`badge badge-sm border-0 ${
                                                colorClasses[log.color] || "bg-gray-100 text-gray-800"
                                            }`}>
                                    {log.action}
                                    </span>
                                </td>
                                <td>{log.details}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 text-center">
                <button className="btn btn-sm btn-outline text-sm rounded-lg text-[#991b1b] border-[#991b1b] hover:bg-[#ffd700] hover:border-[#ffd700] hover:text-[#991b1b]">
                    View All Logs
                </button>
            </div>
        </div>
    </div>
  );
}
