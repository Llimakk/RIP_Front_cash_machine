export type T_Bill = {
    id: number,
    name: string,
    status: number,
    image: string,
    year: string,
    description: string
}

export type T_LoginCredentials = {
    username: string
    password: string
}
  
  // Типы данных для обновления
export interface T_UpdateUserData {
    username?: string;
    first_name?: string;
    last_name?: string;
    password?: string;  // если вы обновляете пароль
}
  
  
  
  
export type T_RegisterCredentials = {
    first_name: string
    last_name: string
    username: string
    password: string
}
  
  
export type T_User = {
    id: number
    first_name: string
    last_name: string
    password: string
    is_authenticated: boolean
    validation_error: boolean
    validation_success: boolean
    checked: boolean
}