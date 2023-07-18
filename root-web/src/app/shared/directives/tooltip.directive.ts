import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appTooltip]',
    exportAs: 'tooltip',
})
export class TooltipDirective implements OnInit {
    @Input('appTooltip') text: string = '';
    @Input() position: 'top' | 'bottom' = 'bottom';
    @Input() hideOnTooltipHover: boolean = false;
    element!: HTMLElement;
    tooltip!: HTMLElement;

    @HostListener('mouseover', ['$event']) onHover(e: any) {
        if (this.hideOnTooltipHover && e.target.closest('.tooltip')) return;
        this.renderer.setStyle(this.tooltip, 'display', 'block');
    }
    @HostListener('mouseout') onLeave() {
        this.renderer.setStyle(this.tooltip, 'display', 'none');
    }

    constructor(private elRef: ElementRef, private renderer: Renderer2) {}

    ngOnInit(): void {
        this.element = this.elRef.nativeElement;
        this.element.style.position = 'relative';
        this.tooltip = this.renderer.createElement('div') as HTMLElement;
        this.renderer.appendChild(this.element, this.tooltip);
        this._setStyles();
    }

    private _setStyles() {
        this.renderer.setStyle(this.tooltip, 'display', 'none');
        this.renderer.setStyle(this.tooltip, 'position', 'absolute');
        this.renderer.setStyle(this.tooltip, 'z-index', '10000');
        this.tooltip.textContent = this.text;
        this.renderer.addClass(this.tooltip, 'tooltip');
        this.position === 'bottom'
            ? this.renderer.setStyle(this.tooltip, 'top', `${this.element.offsetHeight + 15}px`)
            : this.renderer.setStyle(this.tooltip, 'top', `-${this.tooltip.offsetHeight + 5}px`);

        this.renderer.setStyle(this.tooltip, 'left', `${this.element.offsetWidth / 2}px`);
        this.renderer.setStyle(this.tooltip, 'transform', `translateX(-50%)`);
        this.renderer.setStyle(this.tooltip, 'padding', '10px');
        this.renderer.setStyle(this.tooltip, 'background', 'red');
        this.renderer.setStyle(this.tooltip, 'transition', 'all 0.5s');
    }
}
