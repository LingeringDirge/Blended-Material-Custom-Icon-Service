import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { svgAssets } from './svg-assets';

/**
 * Service for loading and managing assets, such as SVG icons.
 */
@Injectable({
    providedIn: 'root'
})
export class AssetService {
    /**
     * Creates an instance of AssetService.
     *
     * @constructor
     * @param {MatIconRegistry} matIconRegistry - The Angular Material icon registry service.
     * @param {DomSanitizer} domSanitizer - The DOM sanitizer service.
     */
    constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {}

    /**
     * Loads the assets asynchronously.
     *
     * @returns A promise that resolves when the assets are loaded.
     */
    public loadAssets = async (): Promise<any> => Promise.all([this.loadSvgIcons()]);

    /**
     * Loads the SVG icons.
     *
     * @returns A promise that resolves when the SVG icons are loaded.
     */
    private loadSvgIcons = () =>
        new Promise<void>((resolve) => {
            svgAssets.forEach((s) => {
                try {
                    this.matIconRegistry.addSvgIcon(s.name, this.domSanitizer.bypassSecurityTrustResourceUrl(s.path));
                } catch (e) {
                    console.error(e);
                }
            });
            resolve();
        });

    /**
     * Checks if an icon is an SVG icon.
     *
     * @param {string} icon - The name of the icon to check.
     * @returns {boolean} - True if the icon is an SVG icon, false otherwise.
     */
    public isSVGIcon = (icon: string): boolean => svgAssets.some((x) => x.name === icon);
}
