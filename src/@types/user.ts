export interface UserDto {
    _id: string
    username: string
    firstname: string
    lastname: string
    imgPath: string
    phone: number
    email: string
}

export interface UserInput extends Omit<UserDto, '_id' | 'imgPath'> {
    password: string
}

export interface IUser extends UserDto {
    displayName: string
}

export enum userStatus {
    AUTHENTICATED = 'authenticated',
    NOTAUTHENTICATED = 'notauthenticated',
    FETCHING = 'fetching'
}