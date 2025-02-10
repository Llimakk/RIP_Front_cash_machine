export type T_Bill = {
    id: string
    name: string
    description: string
    year: number
    image: string
    status: number
    count?: string
}

export type T_Operation = {
    id: string | null
    status: E_OperationStatus
    date_complete: string
    date_created: string
    date_formation: string
    owner: string
    moderator: string
    bills: T_Bill[]
    address: string
    success: string
    qr:string
}

export enum E_OperationStatus {
    Draft=1,
    InWork,
    Completed,
    Rejected,
    Deleted
}

export type T_User = {
    id: number
    username: string
    is_authenticated: boolean
    is_superuser: boolean
}

export type T_OperationsFilters = {
    date_formation_start: string
    date_formation_end: string
    status: E_OperationStatus
    owner: string
}

export type T_BillsListResponse = {
    bills: T_Bill[],
    draft_operation_id?: number,
    bills_count?: number,
    deleted_bills: T_Bill[]
}

export type T_LoginCredentials = {
    username: string
    password: string
}

export type T_RegisterCredentials = {
    name: string
    email: string
    password: string
}

export type T_BillAddData = {
    name: string;
    description: string;
    year: number;
    image?: File | null;
}