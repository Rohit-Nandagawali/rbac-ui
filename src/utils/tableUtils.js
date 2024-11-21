export const columns = [
    { name: "NAME", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
]

export const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "Inactive", uid: "inactive" },
]

export const statusColorMap = {
    true: "success",
    false: "danger",
}

export const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"]