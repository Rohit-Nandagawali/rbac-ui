'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import {
  Tabs, Tab, Card, CardBody, Button, Input,
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  useDisclosure, Switch, Avatar, Checkbox, ScrollShadow,
  Chip, Pagination, User
} from "@nextui-org/react"
import { PlusCircle, Pencil, Trash2, Search, ChevronDown, User as UserIcon, Shield, Clock, MoreVertical } from 'lucide-react'

// Expanded dummy data
const initialUsers = [
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

const initialRoles = [
  { id: 1, name: 'Admin', description: 'Full access to all features', permissions: ['create:all', 'read:all', 'update:all', 'delete:all'] },
  { id: 2, name: 'Editor', description: 'Can edit and publish content', permissions: ['create:content', 'read:content', 'update:content'] },
  { id: 3, name: 'Viewer', description: 'Can only view content', permissions: ['read:content'] },
]

const allPermissions = [
  'create:all', 'read:all', 'update:all', 'delete:all',
  'create:content', 'read:content', 'update:content', 'delete:content',
  'create:user', 'read:user', 'update:user', 'delete:user'
]

const initialLogs = [
  { id: 1, user: 'John Doe', action: 'Created user', target: 'Jane Smith', timestamp: '2023-06-01T10:00:00Z' },
  { id: 2, user: 'Jane Smith', action: 'Updated role', target: 'Editor', timestamp: '2023-06-02T11:30:00Z' },
  { id: 3, user: 'Bob Johnson', action: 'Viewed content', target: 'Article #1234', timestamp: '2023-06-03T14:15:00Z' },
]

const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
]

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Inactive", uid: "inactive" },
]

const statusColorMap = {
  true: "success",
  false: "danger",
}

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"]

export default function RBACDashboard() {
  const [users, setUsers] = useState(initialUsers)
  const [roles, setRoles] = useState(initialRoles)
  const [logs, setLogs] = useState(initialLogs)

  const handleAddUser = (userData) => {
    const newUser = { ...userData, id: users.length + 1, avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' }
    setUsers([...users, newUser])
    addLog(`Created user ${newUser.name}`)
  }

  const handleEditUser = (userData) => {
    const updatedUsers = users.map(user => user.id === userData.id ? userData : user)
    setUsers(updatedUsers)
    addLog(`Updated user ${userData.name}`)
  }

  const handleDeleteUser = (userId) => {
    const userToDelete = users.find(user => user.id === userId)
    const updatedUsers = users.filter(user => user.id !== userId)
    setUsers(updatedUsers)
    addLog(`Deleted user ${userToDelete.name}`)
  }

  const handleAddRole = (roleData) => {
    const newRole = { ...roleData, id: roles.length + 1 }
    setRoles([...roles, newRole])
    addLog(`Created role ${newRole.name}`)
  }

  const handleEditRole = (roleData) => {
    const updatedRoles = roles.map(role => role.id === roleData.id ? roleData : role)
    setRoles(updatedRoles)
    addLog(`Updated role ${roleData.name}`)
  }

  const handleDeleteRole = (roleId) => {
    const roleToDelete = roles.find(role => role.id === roleId)
    const updatedRoles = roles.filter(role => role.id !== roleId)
    setRoles(updatedRoles)
    addLog(`Deleted role ${roleToDelete.name}`)
  }

  const addLog = (action) => {
    const newLog = {
      id: logs.length + 1,
      user: 'Current User',
      action: action,
      target: '',
      timestamp: new Date().toISOString()
    }
    setLogs([newLog, ...logs])
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
            permissions={allPermissions}
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

function UserManagement({ users, roles, onAddUser, onEditUser, onDeleteUser }) {
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

function UserForm({ user, roles, onSubmit, onClose }) {
  const [name, setName] = useState(user ? user.name : '')
  const [email, setEmail] = useState(user ? user.email : '')
  const [role, setRole] = useState(user ? user.role : '')
  const [isActive, setIsActive] = useState(user ? user.isActive : true)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ id: user ? user.id : null, name, email, role, isActive })
  }

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">{user ? 'Edit User' : 'Add User'}</ModalHeader>
      <ModalBody>
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">
              {role || 'Select a role'}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Role selection"
            selectionMode="single"
            selectedKeys={[role]}
            onSelectionChange={(keys) => setRole(Array.from(keys)[0])}
          >
            {roles.map((r) => (
              <DropdownItem key={r.name}>{r.name}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <div className="flex items-center gap-2">
          <Switch
            isSelected={isActive}
            onValueChange={setIsActive}
          />
          <span>Active</span>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Close
        </Button>
        <Button color="primary" onPress={handleSubmit}>
          {user ? 'Update' : 'Add'} User
        </Button>
      </ModalFooter>
    </>
  )
}

function RoleManagement({ roles, permissions, onAddRole, onEditRole, onDeleteRole }) {
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

function RoleForm({ role, permissions, onSubmit, onClose }) {
  const [name, setName] = useState(role ? role.name : '')
  const [description, setDescription] = useState(role ? role.description : '')
  const [selectedPermissions, setSelectedPermissions] = useState(role ? role.permissions : [])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ id: role ? role.id : null, name, description, permissions: selectedPermissions })
  }

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">{role ? 'Edit Role' : 'Add Role'}</ModalHeader>
      <ModalBody>
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <ScrollShadow className="h-[200px]">
          {permissions.map((permission) => (
            <div key={permission} className="flex items-center space-x-2 mb-2">
              <Checkbox
                isSelected={selectedPermissions.includes(permission)}
                onValueChange={(checked) => {
                  if (checked) {
                    setSelectedPermissions([...selectedPermissions, permission])
                  } else {
                    setSelectedPermissions(selectedPermissions.filter(p => p !== permission))
                  }
                }}
              />
              <span>{permission}</span>
            </div>
          ))}
        </ScrollShadow>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Close
        </Button>
        <Button color="primary" onPress={handleSubmit}>
          {role ? 'Update' : 'Add'} Role
        </Button>
      </ModalFooter>
    </>
  )
}

function ActivityHistory({ logs }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Activity History</h2>
      <ScrollShadow className="h-[400px]">
        <div className="space-y-4">
          {logs.map((log, index) => (
            <Card key={log.id}>
              <CardBody>
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full text-white">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{log.user}</div>
                    <div className="text-small text-default-500">{new Date(log.timestamp).toLocaleString()}</div>
                    <div className="mt-1">
                      {log.action}
                      {log.target && <span className="font-medium"> {log.target}</span>}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </ScrollShadow>
    </div>
  )
}