import * as handlebars from "handlebars";

export class Templating {

  /**
   * Formats string with handlebars
   * @param value string to be formatted
   * @param data Data to add to value string
   * @return string formatted template
   */
  static format(value: string, data: any) {
    this.registerHelpers();

    const template = handlebars.compile(value);
    return template(data);
  }

  private static registerHelpers() {
    handlebars.registerHelper('indent', (indentCount) => {
      return '&nbsp;'.repeat(indentCount);
    });
  }

}
