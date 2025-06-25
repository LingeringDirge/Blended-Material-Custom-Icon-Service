import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AssetService, ThemeService } from '@services';
import { Observable } from 'rxjs';

/** Esms Icon Component */
@Component({
    selector: 'app-esms-icon',
    templateUrl: './esms-icon.component.html',
    styleUrls: ['./esms-icon.component.less'],
    standalone: true,
    imports: [CommonModule, MatIconModule, MatTooltipModule]
})
export class EsmsIconComponent implements OnInit {
    /**
     * The name of the SVG icon to be displayed.
     */
    @Input({ required: true }) icon: string;

    /**
     * The size of the icon. Defaults to '24'.
     */
    @Input() size = '24';

    /**
     * The font size of the icon. Defaults to '24'.
     */
    @Input() fontSize: string | null;

    /**
     * The color of the icon.
     */
    @Input() color: 'default' | 'primary' | 'accent' | 'warn' = 'default';

    /**
     * The accessible label for the icon.
     */
    @Input() ariaLabel?: string;

    /**
     * The tooltip text for the icon.
     */
    @Input() tooltip: string;

    /**
     * Custom CSS class(es) to be applied to the `mat-icon` element.
     */
    @Input() cssClass = '';

    /** The value of the `matPrefix` attribute for the `mat-icon` element. */
    @Input() matPrefix?: boolean;

    /** The value of the `matSuffix` attribute for the `mat-icon` element. */
    @Input() matSuffix?: boolean;

    @Input() noFlex = false;

    @HostBinding('class.flex-display')
    get useFlex(): boolean {
        return !this.noFlex;
    }

    @HostBinding('class.flex-none')
    get useNone(): boolean {
        return this.noFlex;
    }

    /**
     * Fallback if not an SVG icon; tries to find it as a native mat font icon.
     */
    public nativeMatFontIcon: string;

    /**
     * Track dark mode of theme service to update icon style
     */
    public isDarkMode$!: Observable<boolean>;

    /**
     * Constructor to set up the services.
     * @param assetService The asset service to be injected.
     */
    constructor(
        private assetService: AssetService,
        private themeService: ThemeService
    ) {}

    /**
     * Lifecycle hook called after construction and initialization of the component.
     * Checks icon before the component is rendered.
     */
    ngOnInit(): void {
        this.checkIconExistence();
        this.isDarkMode$ = this.themeService.getDarkMode();
    }

    /**
     * Check with the asset service if the icon is an SVG. If it is not, assume it is a native mat icon.
     */
    private checkIconExistence(): void {
        const isSVGIcon = this.assetService.isSVGIcon(this.icon);
        if (!isSVGIcon) {
            this.nativeMatFontIcon = this.icon;
        }
    }
}
