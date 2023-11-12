import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';
const readFile = util.promisify(fs.readFile);
import {Templating} from '../shared/helpers/templating/templating';
import {PdfGenerator} from "../shared/helpers/pdf/pdf-generator";
import {ReportTemplate} from "../shared/models/report/single-total-report-template/reportTemplate";
import {ReportDataLoader} from "./report-data-loader";
import {DateRange} from "../shared/models/time/date-range";
import {ReportDataConfiguration} from "./report-data-configuration";
import {ReportDocuments} from "../shared/models/report/collection-model/reportDocuments";

/**
 * Creates reports as HTML or PDF
 */
export class ReportEngine {

  /**
   * Generates a balance sheet PDF
   * @param dateRange date range for reports
   */
  static async generateReport(dateRange: DateRange): Promise<ReportDocuments> {
    const reportDocuments = await ReportDataLoader.loadData(dateRange);

    const configuredReports = ReportDataConfiguration.configureReportData(reportDocuments, dateRange);

    console.log(configuredReports.balanceSheet.headers);

    const balanceSheet = await this.generateBalanceSheetPdf(configuredReports.balanceSheet);
    const trialBalance = await this.generateBalanceSheetPdf(configuredReports.trialBalance);

    return {
      balanceSheet,
      trialBalance
    }
  }

  /**
   * Generates a balance sheet PDF in base64 string
   * @param data Balance sheet report template
   */
  private static async generateBalanceSheetPdf(data: ReportTemplate) {
    const filePath = path.resolve('src/shared/assets/report-templates/single-header-template.html');
    const file = await readFile(filePath);

    const template = Templating.format(file.toString(), data);

    const pdf = await PdfGenerator.generateBase64PdfFromHtml(template);

    return 'data:application/pdf;base64,' + pdf;
  }
}
