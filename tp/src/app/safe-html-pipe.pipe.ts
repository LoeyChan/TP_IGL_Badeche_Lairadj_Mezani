import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class SafeHtmlPipePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: any, args?: any): any {
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }

}
