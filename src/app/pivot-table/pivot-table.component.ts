import {
  Component,
  OnInit,
  Inject,
  ElementRef,
  AfterViewInit,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { defaultsDeep } from 'lodash';
import {keys} from 'lodash-es';
import 'pivottable/dist/pivot.min.js';
import 'pivottable/dist/pivot.min.css';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-pivot-table',
  templateUrl: './pivot-table.component.html',
  styleUrls: ['./pivot-table.component.scss'],
})
export class PivotTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() config: any;
  @Input() show: any;
  @Input() data: any;
  @Output() newConfig = new EventEmitter<any>();

  private el: ElementRef;
  private container: any;
  private inst: any;
  private targetElement: any;
  private renderers: any;
  private derivers: any;
  private defaultConfig: any;
  private pivotConfig: any;

  constructor(@Inject(ElementRef) el: ElementRef) {
    this.el = el;
  } 

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!this.el || !this.el.nativeElement || !this.el.nativeElement.children) {
      console.log('cant build without element');
      return;
    }

    this.container = this.el.nativeElement;
    this.inst = jQuery(this.container);
    this.targetElement = this.inst.find('.pivot-wrapper');
    if (!this.targetElement) {
      console.log('cant find the pivot element');
      return;
    }

    while (this.targetElement.firstChild) {
      this.targetElement.removeChild(this.targetElement.firstChild);
    }

    this.derivers = jQuery.pivotUtilities.derivers;
    this.renderers = jQuery.extend(
      jQuery.pivotUtilities.renderers,
      jQuery.pivotUtilities.c3_renderers,
      jQuery.pivotUtilities.export_renderers
    );

    this.defaultConfig = {
      renderers: this.renderers,
      rows: ['Province'],
      cols: ['Age'],
      //rendererName: 'Horizontal Stacked Bar Chart',
      rendererName: 'Table',
      rendererOptions: {
        plotlyConfig: {
          c3: {
            /* colors: {
            id: '#dc3912',
            Length: '#3366cc',
            Model: '#ff9900',
            make: '#109618',
            type: '#990099',
          },*/
          },
          // showlegend: false,
        },
      },
      onRefresh: () => {
        this.onPivotRefresh();
      },
    };
    console.log("defaultConfig: "+this.defaultConfig)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.draw();
    }

    if (changes['config'] && this.config !== undefined) {
      this.config.onRefresh = () => this.onPivotRefresh();
      this.draw();
    }
  }

  /**
   * Private Methods
   */

  /**
   * Method to draw the pivot table with provided data and configuration
   */
  private draw(): void {
    if (this.targetElement) {
      this.pivotConfig = defaultsDeep(this.config, this.defaultConfig);
      //this.targetElement.pivotUI(this.data, this.pivotConfig, true, 'es');
      this.targetElement.pivotUI(this.data, this.pivotConfig, true, 'es');
    }
  }

  /**
   * Method for capturing pivot data configuration changes and emit them to the parent component
   */
  private onPivotRefresh(): void {
    const changeConfig = this.targetElement.data('pivotUIOptions');
    this.newConfig.emit(changeConfig);
  }
}
