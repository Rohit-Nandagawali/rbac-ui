

import React, { useState } from 'react'
import { Tabs, Tab, Button, Link } from "@nextui-org/react"
import { UserIcon, Shield, Clock, Linkedin, Github, Hand } from 'lucide-react'
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
        <div className="relative min-h-screen w-full bg-slate-950 overflow-hidden">
            <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
            <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>

            <div className="container mx-auto p-4 font-Montserrat relative z-10">
                <h1 className="text-3xl font-bold mb-6 text-white">RBAC Dashboard</h1>
                <Tabs aria-label="RBAC Dashboard Tabs">
                    <Tab key="users" title={<div className="flex items-center gap-2 text-white"><UserIcon size={18} />Users</div>}>
                        <UserManagement
                            users={users}
                            roles={roles}
                            onAddUser={handleAddUser}
                            onEditUser={handleEditUser}
                            onDeleteUser={handleDeleteUser}
                        />
                    </Tab>
                    <Tab key="roles" title={<div className="flex items-center gap-2 text-white"><Shield size={18} />Roles</div>}>
                        <RoleManagement
                            roles={roles}
                            permissions={initialRoles[0].permissions}
                            onAddRole={handleAddRole}
                            onEditRole={handleEditRole}
                            onDeleteRole={handleDeleteRole}
                        />
                    </Tab>
                    <Tab key="logs" title={<div className="flex items-center gap-2 text-white"><Clock size={18} />Activity History</div>}>
                        <ActivityHistory logs={logs} />
                    </Tab>
                </Tabs>
            </div>

            <div className="absolute bottom-4 z-10 right-1/2 flex gap-2">

                <Link
                    isBlock color="foreground"
                    href="https://www.linkedin.com/in/rohitnandagawali/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className='py-2 hover:text-blue-600 text-slate-700'
                >
                    <Linkedin />
                </Link>
                <Link
                    isBlock color="foreground"
                    href="https://github.com/Rohit-Nandagawali"
                    target="_blank"
                    rel="noopener noreferrer"
                    className='py-2 hover:text-green-600  text-slate-700'
                >
                    <Github />
                </Link>
                <Link
                    isBlock color="foreground"
                    href="https://rohit-nandagawali.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className='py-2 hover:text-yellow-600 group text-slate-700'
                >
                    <Hand className='-rotate-12 group-hover:animate-shake' />
                </Link>

            </div>
        </div>
    )
}