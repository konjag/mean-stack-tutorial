import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {
  forbiddenChars: string[] = [',', '.'];

  transform(string: string, limit: number = 50, ellipsis: string = '...'): any {
    const strippedString = this.stripHTMLTags(string);
    let limitedString = strippedString.split(' ').slice(0, limit).join(' ');

    if (this.endsWithForbiddenChar(limitedString)) {
      limitedString = limitedString.slice(0, -1);
    }

    return `${limitedString}${ellipsis}`;
  }

  stripHTMLTags(string: string): string {
    const tmpDiv = document.createElement('div');
    tmpDiv.innerHTML = string;

    return tmpDiv.textContent;
  }

  endsWithForbiddenChar(string: string): boolean {
    return this.forbiddenChars.includes(string.slice(-1));
  }
}
