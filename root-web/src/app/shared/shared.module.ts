import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NavComponent } from './components/nav/nav.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { LogoComponent } from './components/logo/logo.component';
import { RunningLineComponent } from './components/running-line/running-line.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { ParallaxDirective } from './directives/parallax.directive';
import { ElementMoveDirective } from './directives/element-move.directive';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { TabGroupComponent } from './components/tab-group/tab-group.component';
import { TabComponent } from './components/tab-group/tab/tab.component';
import { BackdropComponent } from './components/backdrop/backdrop.component';
import { ModalComponent } from './components/modal/modal.component';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { SkipEventBehaviourDirective } from './directives/skip-event-behaviour.directive';
import { OpacityDirective } from './directives/opacity.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/alert/alert.component';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { AnimatedCardComponent } from './components/animated-card/animated-card.component';
import { RotateXYDirective } from './directives/rotate-xy.directive';
import { FullScreenTwoSlidesSliderComponent } from './components/full-screen-two-slides-slider/full-screen-two-slides-slider.component';
import { FullScreenSlideComponent } from './components/full-screen-two-slides-slider/full-screen-slide/full-screen-slide.component';
import { ArrowComponent } from './components/arrow/arrow.component';
import { RotateYDirective } from './directives/rotate-y.directive';
import { PaginationComponent } from './components/pagination/pagination.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SelectComponent } from './components/select/select.component';
import { TypingAnimatedBoxComponent } from './components/typing-animated-box/typing-animated-box.component';
import { SvgComponent } from './components/svg/svg.component';
import { ErrorTransformPipe } from './pipes/error-transform.pipe';
import { RotateZDirective } from './directives/rotate-z.directive';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { MenuItemComponent } from './components/menu-list/menu-item/menu-item.component';
import { ChatComponent } from './components/chat/chat.component';
import { ListenKeyClickDirective } from './directives/listen-key-click.directive';
import { CursorBgComponent } from './components/cursor-bg/cursor-bg.component';
import { CapitalCasePipe } from './pipes/capital-case.pipe';
import { AddSignInEndPipe } from './pipes/add-sign-in-end.pipe';
import { RandomWheelComponent } from './components/random-wheel/random-wheel.component';
import { TableComponent } from './components/table/table.component';
import { OnInitDirective } from './directives/on-init.directive';
import { SwiperComponent } from './components/swiper/swiper.component';
import { TooltipDirective } from './directives/tooltip.directive';

@NgModule({
    declarations: [
        NavComponent,
        InputComponent,
        ButtonComponent,
        LogoComponent,
        RunningLineComponent,
        HeaderComponent,
        ParallaxDirective,
        ElementMoveDirective,
        LoginFormComponent,
        RegisterFormComponent,
        TabGroupComponent,
        TabComponent,
        BackdropComponent,
        ModalComponent,
        AuthModalComponent,
        SkipEventBehaviourDirective,
        OpacityDirective,
        AlertComponent,
        InfoCardComponent,
        AnimatedCardComponent,
        RotateXYDirective,
        FullScreenTwoSlidesSliderComponent,
        FullScreenSlideComponent,
        ArrowComponent,
        RotateYDirective,
        PaginationComponent,
        LoaderComponent,
        SelectComponent,
        TypingAnimatedBoxComponent,
        SvgComponent,
        ErrorTransformPipe,
        RotateZDirective,
        MenuListComponent,
        MenuItemComponent,
        ChatComponent,
        ListenKeyClickDirective,
        CursorBgComponent,
        CapitalCasePipe,
        AddSignInEndPipe,
        RandomWheelComponent,
        TableComponent,
        OnInitDirective,
        SwiperComponent,
        TooltipDirective,
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        RouterModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        FormsModule,
    ],
    exports: [
        NavComponent,
        InputComponent,
        ButtonComponent,
        LogoComponent,
        RunningLineComponent,
        HeaderComponent,
        ParallaxDirective,
        ElementMoveDirective,
        LoginFormComponent,
        RegisterFormComponent,
        TabGroupComponent,
        TabComponent,
        BackdropComponent,
        ModalComponent,
        AuthModalComponent,
        SkipEventBehaviourDirective,
        OpacityDirective,
        AlertComponent,
        InfoCardComponent,
        AnimatedCardComponent,
        RotateXYDirective,
        FullScreenTwoSlidesSliderComponent,
        FullScreenSlideComponent,
        ArrowComponent,
        RotateYDirective,
        PaginationComponent,
        LoaderComponent,
        SelectComponent,
        TypingAnimatedBoxComponent,
        SvgComponent,
        ErrorTransformPipe,
        RotateZDirective,
        MenuListComponent,
        MenuItemComponent,
        ChatComponent,
        ListenKeyClickDirective,
        CursorBgComponent,
        CapitalCasePipe,
        AddSignInEndPipe,
        RandomWheelComponent,
        TableComponent,
        OnInitDirective,
        SwiperComponent,
        TooltipDirective,
    ],
})
export class SharedModule {
    constructor(private injector: Injector) {}
}
