import {SystemRole} from "./security";

export class UserDto {
    id?: string;
    firstName?: string;
    lastName?: string;
    organisation?: string;
    email?: string;
    phone?: string;
    roles?: SystemRole[];
    isActive?: boolean;

    fullName?: string;
}

export class UserFilter {
    searchTerm?: string;
}
