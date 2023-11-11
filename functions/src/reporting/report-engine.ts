import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';
const readFile = util.promisify(fs.readFile);
import {Templating} from '../shared/helpers/templating/templating';
import {PdfGenerator} from "../shared/helpers/pdf/pdf-generator";
import {ReportTemplate} from "../shared/models/report/balance-sheet-template/reportTemplate";

/**
 * Creates reports as HTML or PDF
 */
export class ReportEngine {

  /**
   * Generates a balance sheet PDF
   * @param data data to insert into template
   */
  static async generateBalanceSheetPdf(data: ReportTemplate) {
    const filePath = path.resolve('./', '../', 'shared', 'assets', 'report.ts-templates', 'single-header-template.html');
    const file = await readFile(filePath);

    const template = Templating.format(file.toString(), data);

    const pdf = await PdfGenerator.generateBase64PdfFromHtml(template);

    console.log(pdf);
  }

}
