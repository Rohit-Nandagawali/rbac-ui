export const initialUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', isActive: true, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', isActive: true, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', isActive: false, avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', isActive: true, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026708d' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Viewer', isActive: true, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026710d' },
    { id: 6, name: 'Diana Miller', email: 'diana@example.com', role: 'Admin', isActive: false, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026712d' },
    { id: 7, name: 'Ethan Davis', email: 'ethan@example.com', role: 'Editor', isActive: true, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026714d' },
    { id: 8, name: 'Fiona Clark', email: 'fiona@example.com', role: 'Viewer', isActive: false, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026716d' },
    { id: 9, name: 'George White', email: 'george@example.com', role: 'Admin', isActive: true, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026718d' },
    { id: 10, name: 'Hannah Lee', email: 'hannah@example.com', role: 'Editor', isActive: true, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026720d' },
    { id: 11, name: 'Ian Taylor', email: 'ian@example.com', role: 'Viewer', isActive: false, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026722d' },
    { id: 12, name: 'Julia Green', email: 'julia@example.com', role: 'Admin', isActive: true, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026724d' },
]

export const initialRoles = [
    { id: 1, name: 'Admin', description: 'Full access to all features', permissions: ['create:all', 'read:all', 'update:all', 'delete:all'] },
    { id: 2, name: 'Editor', description: 'Can edit and publish content', permissions: ['create:content', 'read:content', 'update:content'] },
    { id: 3, name: 'Viewer', description: 'Can only view content', permissions: ['read:content'] },
]

export const initialLogs = [
    { id: 1, user: 'John Doe', action: 'Created user', target: 'Jane Smith', timestamp: '2023-06-01T10:00:00Z' },
    { id: 2, user: 'Jane Smith', action: 'Updated role', target: 'Editor', timestamp: '2023-06-02T11:30:00Z' },
    { id: 3, user: 'Bob Johnson', action: 'Viewed content', target: 'Article #1234', timestamp: '2023-06-03T14:15:00Z' },
]