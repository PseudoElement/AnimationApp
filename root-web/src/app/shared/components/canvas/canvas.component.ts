import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ScreenSizeService } from 'src/app/core/services/screen-size.service';
import { Subject, takeUntil } from 'rxjs';
import { MAX_LAPTOP_WIDTH, MAX_MOBILE_WIDTH, MAX_TABLET_WIDTH } from 'src/app/core';

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() startCanvasWidth: number = 500;
    @Input() startCanvasHeight: number = 500;
    @Input() borderWidth: number = 10;
    @Input() strokeLineWidth: number = 2;
    @Input() strokeColor: string = '#0000';
    @ViewChild('canvasRef', { static: true }) canvasRef!: ElementRef;
    canvas!: HTMLCanvasElement;
    context!: CanvasRenderingContext2D;
    deltaX: number = 0;
    deltaY: number = 0;
    isMouseDown: boolean = false;
    isDestroyed$: Subject<boolean> = new Subject();
    @HostListener('mousedown', ['$event'])
    onMouseDown(e: MouseEvent) {
        this.isMouseDown = true;
        const { x, y } = this._getRealCoords(e.clientX, e.clientY);
        this.context.beginPath();
        this.context.moveTo(x, y);
    }
    @HostListener('mouseup') onMouseUp() {
        this.isMouseDown = false;
    }
    @HostListener('window:mousemove', ['$event']) onMouseMove(e: MouseEvent) {
        if (!this.isMouseDown) return;
        const el = e.target as HTMLElement;
        !el.closest('.canvas') && (this.isMouseDown = false);
        const { x, y } = this._getRealCoords(e.clientX, e.clientY);
        this._draw(x, y);
    }
    @HostListener('window:scroll') onWindowScroll() {
        this._setDeltas();
    }

    constructor(private _screenSizeService: ScreenSizeService) {
        this._screenSizeService
            .getSizes()
            .pipe(takeUntil(this.isDestroyed$))
            .subscribe((sizes) => {
                this._setDeltas();
                this._calcCanvasSizeWithDifferentScreenSizes(sizes.width);
            });
    }

    ngOnInit(): void {
        this.canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
        this.canvas.style.border = `${this.borderWidth}px groove red`;
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.setStrokeColor(this.strokeColor);
        this.setLineWidth(this.strokeLineWidth);
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this._setDeltas();
            this._calcCanvasSizeWithDifferentScreenSizes(window.innerWidth);
        }, 500);
    }
    ngOnDestroy(): void {
        this.isDestroyed$.next(true);
        this.isDestroyed$.complete();
    }

    private _getRect(): DOMRect {
        return this.canvas.getBoundingClientRect();
    }

    private _setDeltas() {
        this.deltaY = this._getRect().top;
        this.deltaX = this._getRect().left;
    }

    private _setCanvasSizes(width: number, height: number): void {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    private _calcCanvasSizeWithDifferentScreenSizes(width: number) {
        if (width > MAX_LAPTOP_WIDTH) this._setCanvasSizes(this.startCanvasWidth, this.startCanvasHeight);
        else if (width > MAX_TABLET_WIDTH) this._setCanvasSizes(700, 600);
        else if (width > MAX_MOBILE_WIDTH) this._setCanvasSizes(500, 500);
        else this._setCanvasSizes(300, 400);
    }

    public setLineWidth(width: number) {
        this.context.lineWidth = width;
    }

    public setStrokeColor(color: string) {
        this.context.strokeStyle = color;
    }

    private _draw(x: number, y: number): void {
        this.context.lineTo(x, y);
        this.context.stroke();
    }

    private _getRealCoords(xCoord: number, yCoord: number): { x: number; y: number } {
        const x = xCoord - this.deltaX - this.borderWidth;
        const y = yCoord - this.deltaY - this.borderWidth;
        return { x, y };
    }

    public clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
