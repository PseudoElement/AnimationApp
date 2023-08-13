import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2 } from '@angular/core';
import { CursorTypes } from 'src/app/core';

@Directive({
    selector: '[appCursor]',
})
export class CursorDirective implements AfterViewInit, OnDestroy {
    @Input() type: CursorTypes = 'pencil';
    cursor!: HTMLElement;
    isVisibleCursor: boolean = false;
    host!: HTMLElement;

    @HostListener('mousemove', ['$event'])
    onHover(e: MouseEvent) {
        const absX = e.clientX + window.scrollX;
        const absY = e.clientY + window.scrollY;
        if (!this.isVisibleCursor) {
            this._showCursor();
        }
        this._changeCursorPosition(absX, absY);
    }
    @HostListener('mouseleave')
    onLeave() {
        this._hideCursor();
    }
    constructor(private _renderer: Renderer2, private elRef: ElementRef) {}

    ngAfterViewInit(): void {
        this.host = this.elRef.nativeElement;
        this._renderer.setStyle(this.host, 'position', 'relative');
        this._insertCursor();
    }
    ngOnDestroy(): void {
        this._removeCursor();
    }

    private _insertCursor(): void {
        this.cursor = this._renderer.createElement('div');
        this.cursor.style.display = 'none';
        this.cursor.style.position = 'absolute';
        this.cursor.style.width = '50px';
        this.cursor.style.height = '50px';
        this.cursor.style.background = 'url(../../../assets/img/svg/PencilCursor.svg)';
        this.cursor.style.pointerEvents = 'none';
        document.documentElement.append(this.cursor);
        // this._renderer.setStyle(this.cursor, 'width', '150px');
        // this._renderer.setStyle(this.cursor, 'height', '150px');
        // this._renderer.setStyle(this.cursor, 'background', 'url(../../../assets/img/svg/PencilCursor.svg)');
        // this._renderer.setStyle(this.cursor, 'display', 'none');
        // this._renderer.setStyle(this.cursor, 'position', 'absolute');
        // this._renderer.setStyle(this.cursor, 'z-index', '999999');
        // this._renderer.setStyle(this.cursor, 'pointer-events', 'none');
        // this._renderer.appendChild(this.host, this.cursor);
    }

    private _removeCursor(): void {
        this._renderer.removeChild(this.host, this.cursor);
    }

    private _changeCursorPosition(x: number, y: number) {
        this.cursor.style.top = `${y}px`;
        this.cursor.style.left = `${x}px`;
        // this._renderer.setStyle(this.cursor, 'top', `${y}px`);
        // this._renderer.setStyle(this.cursor, 'left', `${x}px`);
    }

    private _showCursor(): void {
        // this._renderer.setStyle(this.cursor, 'display', 'block');
        this.cursor.style.display = 'block';
        document.documentElement.style.cursor = 'none';
        // this._renderer.setStyle(document.documentElement, 'cursor', 'none');
        this.isVisibleCursor = true;
    }

    private _hideCursor(): void {
        // this._renderer.setStyle(this.cursor, 'display', 'none');
        this.cursor.style.display = 'none';
        document.documentElement.style.cursor = 'initial';
        // this._renderer.setStyle(document.documentElement, 'cursor', 'initial');
        this.isVisibleCursor = false;
    }
}
