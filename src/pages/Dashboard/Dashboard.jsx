
import React, { useState } from 'react'
import { Tabs, Tab } from "@nextui-org/react"
import { UserIcon, Shield, Clock } from 'lucide-react'
import UserManagement from '../../components/UserManagement'
import RoleManagement from '../../components/RoleManagement'
import ActivityHistory from '../../components/ActivityHistory'
import { initialUsers, initialRoles, initialLogs } from '../../data/initialData'
import { addLog } from '../../utils/logUtils'

export default function RBACDashboard() {
    const [users, setUsers] = useState(initialUsers)
    const [roles, setRoles] = useState(initialRoles)
    const [logs, setLogs] = useState(initialLogs)

    const handleAddUser = (userData) => {
        const newUser = { ...userData, id: users.length + 1, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' }
        setUsers([...users, newUser])
        setLogs(addLog(logs, `Created user ${newUser.name}`))
    }

    const handleEditUser = (userData) => {
        const updatedUsers = users.map(user => user.id === userData.id ? userData : user)
        setUsers(updatedUsers)
        setLogs(addLog(logs, `Updated user ${userData.name}`))
    }

    const handleDeleteUser = (userId) => {
        const userToDelete = users.find(user => user.id === userId)
        const updatedUsers = users.filter(user => user.id !== userId)
        setUsers(updatedUsers)
        setLogs(addLog(logs, `Deleted user ${userToDelete.name}`))
    }

    const handleAddRole = (roleData) => {
        const newRole = { ...roleData, id: roles.length + 1 }
        setRoles([...roles, newRole])
        setLogs(addLog(logs, `Created role ${newRole.name}`))
    }

    const handleEditRole = (roleData) => {
        const updatedRoles = roles.map(role => role.id === roleData.id ? roleData : role)
        setRoles(updatedRoles)
        setLogs(addLog(logs, `Updated role ${roleData.name}`))
    }

    const handleDeleteRole = (roleId) => {
        const roleToDelete = roles.find(role => role.id === roleId)
        const updatedRoles = roles.filter(role => role.id !== roleId)
        setRoles(updatedRoles)
        setLogs(addLog(logs, `Deleted role ${roleToDelete.name}`))
    }

    return (
        <div className="container mx-auto p-4 font-Montserrat">
            <h1 className="text-3xl font-bold mb-6">RBAC Dashboard</h1>
            <Tabs aria-label="RBAC Dashboard Tabs">
                <Tab key="users" title={<div className="flex items-center gap-2"><UserIcon size={18} />Users</div>}>
                    <UserManagement
                        users={users}
                        roles={roles}
                        onAddUser={handleAddUser}
                        onEditUser={handleEditUser}
                        onDeleteUser={handleDeleteUser}
                    />
                </Tab>
                <Tab key="roles" title={<div className="flex items-center gap-2"><Shield size={18} />Roles</div>}>
                    <RoleManagement
                        roles={roles}
                        permissions={initialRoles[0].permissions}
                        onAddRole={handleAddRole}
                        onEditRole={handleEditRole}
                        onDeleteRole={handleDeleteRole}
                    />
                </Tab>
                <Tab key="logs" title={<div className="flex items-center gap-2"><Clock size={18} />Activity History</div>}>
                    <ActivityHistory logs={logs} />
                </Tab>
            </Tabs>
        </div>
    )
}