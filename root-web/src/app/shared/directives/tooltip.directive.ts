import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[appTooltip]',
    exportAs: 'tooltip',
})
export class TooltipDirective implements OnInit, AfterViewInit {
    @Input('appTooltip') text: string = '';
    @Input() offsetY: number = 0;
    @Input() position: 'top' | 'bottom' = 'bottom';
    @Input() hideOnTooltipHover: boolean = false;
    element!: HTMLElement;
    tooltip!: HTMLElement;

    @HostListener('mouseover', ['$event']) onHover(e: any) {
        if (this.hideOnTooltipHover && e.target.closest('.tooltip')) return;
        this._show();
    }
    @HostListener('mouseout') onLeave() {
        this._hide();
    }

    constructor(private elRef: ElementRef, private renderer: Renderer2) {}

    ngOnInit(): void {
        this.element = this.elRef.nativeElement;
        this.tooltip = this.renderer.createElement('div') as HTMLElement;
        this.renderer.appendChild(this.element, this.tooltip);
    }

    ngAfterViewInit(): void {
        this._setStyles();
    }

    private _hide() {
        this.renderer.setStyle(this.tooltip, 'opacity', '0');
        this.renderer.setStyle(this.tooltip, 'visibility', 'hidden');
    }

    private _show() {
        this.renderer.setStyle(this.tooltip, 'opacity', '1');
        this.renderer.setStyle(this.tooltip, 'visibility', 'visible');
    }

    private _setStyles() {
        this.renderer.setStyle(this.tooltip, 'display', 'block');
        this.renderer.setStyle(this.tooltip, 'opacity', '0');
        this.renderer.setStyle(this.tooltip, 'visibility', 'hidden');
        this.renderer.setStyle(this.tooltip, 'position', 'absolute');
        this.renderer.setStyle(this.tooltip, 'z-index', '10000');
        this.renderer.setStyle(this.tooltip, 'text-align', 'center');
        this.renderer.setStyle(this.tooltip, 'transition', 'opacity 100ms');
        this.renderer.setStyle(this.tooltip, 'white-space', 'nowrap');
        this.renderer.setStyle(this.tooltip, 'cursor', 'pointer');
        this.renderer.setStyle(this.tooltip, 'border-radius', '10px');
        this.tooltip.textContent = this.text;
        this.renderer.addClass(this.tooltip, 'tooltip');
        this.position === 'bottom'
            ? this.renderer.setStyle(this.tooltip, 'top', `${this.element.offsetHeight + this.offsetY}px`)
            : this.renderer.setStyle(this.tooltip, 'top', `-${this.tooltip.offsetHeight + this.offsetY}px`);
        this.renderer.setStyle(this.tooltip, 'left', `${this.element.offsetWidth / 2}px`);
        this.renderer.setStyle(this.tooltip, 'transform', `translateX(-42%)`);
        this.renderer.setStyle(this.tooltip, 'padding', '5px');
        this.renderer.setStyle(this.tooltip, 'background', 'rgb(255, 255, 0)');
        this.renderer.setStyle(this.tooltip, 'transition', 'all 0.5s');
    }
}
