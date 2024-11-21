import React, { useState } from 'react'
import {
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    ScrollShadow,
    Checkbox
} from "@nextui-org/react"

export default function RoleForm({ role, permissions, onSubmit, onClose }) {
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