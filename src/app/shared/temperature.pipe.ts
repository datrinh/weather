import { Pipe, PipeTransform } from '@angular/core';

/**
 * Format temperature values for display
 */
@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {
  transform(value: number, ...args: any[]): string {
    return `${Math.round(value)}°`;
  }
}
