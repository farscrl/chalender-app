import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { StaticDataService } from '../../../services/static-data.service';
import { Genre, Region } from '../../../data/static-data';

@Component({
    selector: 'app-iframe-code-generator',
    templateUrl: './iframe-code-generator.component.html',
    styleUrls: ['./iframe-code-generator.component.scss']
})
export class IframeCodeGeneratorComponent implements OnInit {
    public url = '';
    public code = '';

    public selectedRegions: number[] = [];
    public selectedGenres: number[] = [];
    public searchTerm = "";
    public showSearch = true;
    public showViewSelection = true;
    public selectedView: 'cards' | 'list' = 'cards';

    public regions: Region[] = [];
    public genres: Genre[] = [];


    constructor(
        public sanitizer: DomSanitizer,
        private staticDataService: StaticDataService,
    ) {
    }

    ngOnInit() {
        this.calculateUrl();
        this.loadStaticData();
    }

    public calculateUrl(): void {
        let url = environment.appUrl;

        const params: string[] = [];
        params.push('iframe=true');
        params.push('view=' + this.selectedView);
        if (this.selectedRegions.length > 0) {
            params.push('regions=' + this.selectedRegions.join(','));
        }
        if (this.selectedGenres.length > 0) {
            params.push('genres=' + this.selectedGenres.join(','));
        }
        if (this.searchTerm != '') {
            params.push('searchTerm=' + encodeURI(this.searchTerm));
        }
        if (!this.showSearch) {
            params.push('showSearch=false');
        }

        if (!this.showViewSelection) {
            params.push('showViewSelection=false');
        }

        this.url = url + '?' + params.join('&');
        this.code = `<script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.9/iframeResizer.min.js"></script>
<iframe id="chalender-iframe" src="${this.url}" style="border: 1px solid #BBBFC2; width: 100%;"></iframe>
<script>
    iFrameResize({ log: false }, '#chalender-iframe')
</script>`
    }

    isRegionSelected(id: number) {
        return this.selectedRegions.includes(id);
    }

    toggleRegion(id: number) {
        if (this.selectedRegions.includes(id)) {
            const index = this.selectedRegions.indexOf(id);
            this.selectedRegions.splice(index, 1);
        } else {
            this.selectedRegions.push(id);
        }

        this.calculateUrl();
    }

    isGenreSelected(id: number) {
        return this.selectedGenres.includes(id);
    }

    toggleGenre(id: number) {
        if (this.selectedGenres.includes(id)) {
            const index = this.selectedGenres.indexOf(id);
            this.selectedGenres.splice(index, 1);
        } else {
            this.selectedGenres.push(id);
        }

        this.calculateUrl();
    }

    private loadStaticData() {
        this.staticDataService.getGenres().subscribe(genres => {
            if (!genres) {
                this.genres = [];
                return;
            }

            this.genres = genres;
        });

        this.staticDataService.getRegions().subscribe(regions => {
            if (!regions) {
                this.regions = [];
                return;
            }
            this.regions = regions;
        });

        this.calculateUrl();
    }
}
