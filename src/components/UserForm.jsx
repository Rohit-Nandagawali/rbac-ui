import React, { useState } from 'react'
import {
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Switch
} from "@nextui-org/react"

export default function UserForm({ user, roles, onSubmit, onClose }) {
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
                <Dropdown className="dark text-foreground bg-background" >
                    <DropdownTrigger >
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