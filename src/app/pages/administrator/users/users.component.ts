import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../../services/admin.service";
import {UserDto, UserFilter} from "../../../data/user";
import {ChangeUserComponent} from "../../../components/change-user/change-user.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    users: UserDto[] = [];
    total: number = 0;
    current: number = 0;

    private userFilter: UserFilter = new UserFilter();
    private page: number = 0;

    constructor(private adminService: AdminService, private modalService: NgbModal) {
    }

    ngOnInit() {
        this.search();
    }

    updateSearchTerm(searchTerm: string) {
        this.userFilter.searchTerm = searchTerm;
        this.search();
    }

    goToPage(page: number) {
        this.page = page;
        this.search();
    }

    edit(user: UserDto) {
        const modalRef = this.modalService.open(ChangeUserComponent, {size: 'xl'});
        modalRef.componentInstance.userId = user.id;
        modalRef.closed.subscribe(() => {
            this.search();
        });
    }

    delete(user: UserDto) {
        this.adminService.deleteUser(user.id!).subscribe(() => {
            this.search();
        });
    }

    private search() {
        this.adminService.getUsers(this.userFilter, this.page, 20).subscribe(page => {
            this.users = page.content;
            this.total = page.totalPages;
            this.current = page.number;
        });
    }
}
