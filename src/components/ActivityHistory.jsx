import React from 'react'
import { ScrollShadow, Divider } from "@nextui-org/react"
import { Clock } from 'lucide-react'

export default function ActivityHistory({ logs }) {
    return (
        <div className="w-full">
            <h2 className="text-2xl font-semibold mb-6">Activity History</h2>
            <ScrollShadow className="h-[600px] pr-4">
                <div className="space-y-6">
                    {logs.map((log, index) => (
                        <div key={log.id} className="relative">
                            {index !== 0 && (
                                <Divider
                                    className="absolute left-4 top-0 h-full -translate-x-1/2"
                                    orientation="vertical"
                                />
                            )}
                            <div className="flex items-start gap-4">
                                <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-default-100 rounded-full text-default-500 shrink-0">
                                    <Clock size={16} />
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-medium text-default-700">{log.user}</span>
                                        <span className="text-small text-default-400">
                                            {new Date(log.timestamp).toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-default-600">
                                        {log.action}
                                        {log.target && <span className="font-medium"> {log.target}</span>}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollShadow>
        </div>
    )
}