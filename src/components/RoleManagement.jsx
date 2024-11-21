'use client'

import React, { useState, useMemo } from 'react'
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Button, Input, Modal, ModalContent, useDisclosure
} from "@nextui-org/react"
import { Search, PlusCircle, Pencil, Trash2 } from 'lucide-react'
import RoleForm from './RoleForm'

export default function RoleManagement({ roles, permissions, onAddRole, onEditRole, onDeleteRole }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [selectedRole, setSelectedRole] = useState(null)
    const [filterValue, setFilterValue] = useState('')
    const [sortDescriptor, setSortDescriptor] = useState({ column: "name", direction: "ascending" })

    const filteredRoles = useMemo(() => {
        return roles.filter(role =>
            role.name.toLowerCase().includes(filterValue.toLowerCase()) ||
            role.description.toLowerCase().includes(filterValue.toLowerCase())
        )
    }, [roles, filterValue])

    const sortedRoles = useMemo(() => {
        return [...filteredRoles].sort((a, b) => {
            const first = a[sortDescriptor.column]
            const second = b[sortDescriptor.column]
            const cmp = first < second ? -1 : first > second ? 1 : 0

            return sortDescriptor.direction === "descending" ? -cmp : cmp
        })
    }, [filteredRoles, sortDescriptor])

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Role Management</h2>
                <Button color="primary" endContent={<PlusCircle />} onPress={onOpen}>
                    Add Role
                </Button>
            </div>
            <div className="mb-4">
                <Input
                    placeholder="Filter roles..."
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    startContent={<Search />}
                />
            </div>
            <Table
                aria-label="Role management table"
                sortDescriptor={sortDescriptor}
                onSortChange={setSortDescriptor}
            >
                <TableHeader>
                    <TableColumn key="name" allowsSorting>Name</TableColumn>
                    <TableColumn key="description" allowsSorting>Description</TableColumn>
                    <TableColumn key="permissions">Permissions</TableColumn>
                    <TableColumn key="actions">Actions</TableColumn>
                </TableHeader>
                <TableBody items={sortedRoles}>
                    {(item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.permissions.join(', ')}</TableCell>
                            <TableCell>
                                <Button isIconOnly color="primary" aria-label="Edit" onPress={() => { setSelectedRole(item); onOpen(); }}>
                                    <Pencil size={18} />
                                </Button>
                                <Button isIconOnly color="danger" aria-label="Delete" onPress={() => onDeleteRole(item.id)}>
                                    <Trash2 size={18} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <RoleForm
                            role={selectedRole}
                            permissions={permissions}
                            onSubmit={(roleData) => {
                                if (selectedRole) {
                                    onEditRole(roleData)
                                } else {
                                    onAddRole(roleData)
                                }
                                onClose()
                                setSelectedRole(null)
                            }}
                            onClose={() => {
                                onClose()
                                setSelectedRole(null)
                            }}
                        />
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}