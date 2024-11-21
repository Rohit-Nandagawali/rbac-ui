export const addLog = (logs, action) => {
    const newLog = {
        id: logs.length + 1,
        user: 'Current User',
        action: action,
        target: '',
        timestamp: new Date().toISOString()
    }
    return [newLog, ...logs]
}