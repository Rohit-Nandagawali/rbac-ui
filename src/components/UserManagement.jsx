'use client'

import React, { useState, useMemo, useCallback } from 'react'
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Button, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
    Modal, ModalContent, Chip, Pagination, User, useDisclosure
} from "@nextui-org/react"
import { Search, ChevronDown, MoreVertical, PlusCircle } from 'lucide-react'
import UserForm from './UserForm'
import { columns, statusOptions, statusColorMap, INITIAL_VISIBLE_COLUMNS } from '../utils/tableUtils'

export default function UserManagement({ users, roles, onAddUser, onEditUser, onDeleteUser }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [selectedUser, setSelectedUser] = useState(null)

    // Table state
    const [filterValue, setFilterValue] = useState("")
    const [selectedKeys, setSelectedKeys] = useState(new Set([]))
    const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS))
    const [filter, setFilter] = useState({ role: 'all', status: 'all' })
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [sortDescriptor, setSortDescriptor] = useState({ column: "name", direction: "ascending" })
    const [page, setPage] = useState(1)

    const hasSearchFilter = Boolean(filterValue)

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns
        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid))
    }, [visibleColumns])

    const filteredItems = useMemo(() => {
        let filteredUsers = [...users]

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.name.toLowerCase().includes(filterValue.toLowerCase())
            )
        }
        if (filter.role !== "all") {
            filteredUsers = filteredUsers.filter((user) => user.role === filter.role)
        }
        if (filter.status !== "all") {
            filteredUsers = filteredUsers.filter((user) =>
                filter.status === "active" ? user.isActive : !user.isActive
            )
        }

        return filteredUsers
    }, [users, filterValue, filter.role, filter.status])

    const pages = Math.ceil(filteredItems.length / rowsPerPage)

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage

        return filteredItems.slice(start, end)
    }, [page, filteredItems, rowsPerPage])

    const sortedItems = useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column]
            const second = b[sortDescriptor.column]
            const cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1

            return sortDescriptor.direction === "descending" ? -cmp : cmp
        })
    }, [sortDescriptor, items])

    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey]

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: user.avatar }}
                        description={user.email}
                        name={cellValue}
                    >
                        {user.email}
                    </User>
                )
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                    </div>
                )
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[user.isActive]} size="sm" variant="flat">
                        {user.isActive ? "Active" : "Inactive"}
                    </Chip>
                )
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <MoreVertical className="text-default-300" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem onPress={() => { setSelectedUser(user); onOpen(); }}>Edit</DropdownItem>
                                <DropdownItem color="danger" onPress={() => onDeleteUser(user.id)}>Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                )
            default:
                return cellValue
        }
    }, [])

    const onRowsPerPageChange = useCallback((e) => {
        setRowsPerPage(Number(e.target.value))
        setPage(1)
    }, [])

    const onSearchChange = useCallback((value) => {
        if (value) {
            setFilterValue(value)
            setPage(1)
        } else {
            setFilterValue("")
        }
    }, [])

    const onClear = useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by name..."
                        startContent={<Search />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="bordered" endContent={<ChevronDown size={18} />}>
                                    {filter.role === 'all' ? 'All Roles' : filter.role}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Role filter actions"
                                selectionMode="single"
                                selectedKeys={[filter.role]}
                                onSelectionChange={(keys) => setFilter({ ...filter, role: Array.from(keys)[0] })}
                            >
                                <DropdownItem key="all">All Roles</DropdownItem>
                                {roles.map((role) => (
                                    <DropdownItem key={role.name}>{role.name}</DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button variant="bordered" endContent={<ChevronDown size={18} />}>
                                    {filter.status === 'all' ? 'All Statuses' : filter.status}
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Status filter actions"
                                selectionMode="single"
                                selectedKeys={[filter.status]}
                                onSelectionChange={(keys) => setFilter({ ...filter, status: Array.from(keys)[0] })}
                            >
                                <DropdownItem key="all">All Statuses</DropdownItem>
                                <DropdownItem key="active">Active</DropdownItem>
                                <DropdownItem key="inactive">Inactive</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Button color="primary" endContent={<PlusCircle />} onPress={onOpen}>
                            Add New
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {users.length} users</span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        )
    }, [
        filterValue,
        filter,
        onRowsPerPageChange,
        users.length,
        onSearchChange,
    ])

    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys === "all"
                        ? "All items selected"
                        : `${selectedKeys.size} of ${filteredItems.length} selected`}
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
            </div>
        )
    }, [selectedKeys, filteredItems.length, page, pages])

    return (
        <div>
            <Table
                aria-label="Example table with custom cells, pagination and sorting"
                isHeaderSticky
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                classNames={{
                    wrapper: "max-h-[382px]",
                }}
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="outside"
                onSelectionChange={setSelectedKeys}
                onSortChange={setSortDescriptor}
            >
                <TableHeader columns={headerColumns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                            allowsSorting={column.uid !== "actions"}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No users found"} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <UserForm
                            user={selectedUser}
                            roles={roles}
                            onSubmit={(userData) => {
                                if (selectedUser) {
                                    onEditUser(userData)
                                } else {
                                    onAddUser(userData)
                                }
                                onClose()
                                setSelectedUser(null)
                            }}
                            onClose={() => {
                                onClose()
                                setSelectedUser(null)
                            }}
                        />
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}