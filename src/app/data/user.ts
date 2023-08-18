import {SystemRole} from "./security";

export class Profile {
    displayName?: string;
    organisation?: string;
    email?: string;
    roles?: SystemRole[];
}
