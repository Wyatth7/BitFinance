// import * as fs from 'fs';
// import * as util from 'util';
// import * as path from 'path';
// const readFile = util.promisify(fs.readFile);
// import {Templating} from '../shared/helpers/templating/templating';
// import {PdfGenerator} from "../shared/helpers/pdf/pdf-generator";
// import {ReportTemplate} from "../shared/models/report/balance-sheet-template/reportTemplate";
import {ReportDataLoader} from "./report-data-loader";
import {DateRange} from "../shared/models/time/date-range";
import {ReportDataConfiguration} from "./report-data-configuration";

/**
 * Creates reports as HTML or PDF
 */
export class ReportEngine {

  /**
   * Generates a balance sheet PDF
   * @param dateRange date range for reports
   */
  static async generateReport(dateRange: DateRange) {
    const reportDocuments = await ReportDataLoader.loadData(dateRange);

    console.log(reportDocuments.balanceSheet)
    const configuredReports = ReportDataConfiguration.configureReportData(reportDocuments, dateRange);

    console.log(configuredReports)



    // await this.generateBalanceSheetPdf(reportDocuments.);

  }


  // private static async generateBalanceSheetPdf(data: ReportTemplate) {
  //   const filePath = path.resolve('./', '../', 'shared', 'assets', 'report.ts-templates', 'single-header-template.html');
  //   const file = await readFile(filePath);
  //
  //   const template = Templating.format(file.toString(), data);
  //
  //   const pdf = await PdfGenerator.generateBase64PdfFromHtml(template);
  //
  //   console.log(pdf);
  // }
}
