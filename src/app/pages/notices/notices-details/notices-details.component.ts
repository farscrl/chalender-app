import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { NoticesService } from '../../../shared/services/notices.service';
import { NoticeBoardItemDto } from '../../../shared/data/notices';
import { UrlUtil } from '../../../shared/utils/url.util';
import { BackButtonComponent } from '../../../components/back-button/back-button.component';
import { NoticeDetailsComponent } from '../../../components/notices/notice-details/notice-details.component';

@Component({
    selector: 'app-notices-details',
    templateUrl: './notices-details.component.html',
    styleUrls: ['./notices-details.component.scss'],
    imports: [BackButtonComponent, NoticeDetailsComponent]
})
export class NoticesDetailsComponent {
    public notice?: NoticeBoardItemDto;
    private noticeId?: string;

    constructor(
        private noticesService: NoticesService,
        private route: ActivatedRoute,
        private meta: Meta,
        private router: Router,
        private urlUtil: UrlUtil
    ) {
        this.route.params.subscribe(params => {
            this.noticeId = params['id'];
        });
    }

    ngOnInit() {
        if (!this.noticeId) {
            return;
        }

        this.noticesService.getNotice(this.noticeId).subscribe((notice: NoticeBoardItemDto) => {
            this.notice = notice;

            if (this.notice) {
                this.setMetaTags();
            }
        }, (error) => {
            if (error.status === 404) {
                console.warn('not found the notice with ID: ' + this.noticeId);
                this.router.navigate(['/not-found'], {
                    queryParams: {type: 'notice'},
                    skipLocationChange: true,
                });
            }
        });
    }

    private setMetaTags() {
        this.meta.addTag({name: 'title', content: this.urlUtil.truncateString(this.notice!.title!, 90)});
        this.meta.updateTag({
            name: 'description',
            content: this.urlUtil.truncateString(this.notice!.description!, 300)
        });

        const t = this.meta.addTag({name: 'og:title', content: this.urlUtil.truncateString(this.notice!.title!, 90)});
        //console.log(t);
        this.meta.addTag({
            name: 'og:description',
            content: this.urlUtil.truncateString(this.notice!.description!, 300)
        });
        this.meta.addTag({name: 'og:type', content: 'website'});
        this.meta.addTag({name: 'og:url', content: this.router.url});
        this.meta.addTag({name: 'twitter:card', content: 'summary_large_image'});
        this.meta.addTag({name: 'twitter:title', content: this.urlUtil.truncateString(this.notice!.title!, 70)});
        this.meta.addTag({
            name: 'twitter:description',
            content: this.urlUtil.truncateString(this.notice!.description!, 200)
        });

        if (this.notice!.images?.length > 0) {
            this.meta.addTag({
                name: 'og:image',
                content: this.notice!.images[0]!.url + '?width=1200&height=630&crop_gravity=center&auto_optimize=medium'
            });
            this.meta.addTag({
                name: 'twitter:image',
                content: this.notice!.images[0]!.url + '?width=1200&height=630&crop_gravity=center&auto_optimize=medium'
            });
        }
    }
}
