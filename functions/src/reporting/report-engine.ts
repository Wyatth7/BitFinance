import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';
const readFile = util.promisify(fs.readFile);
import {Templating} from '../shared/helpers/templating/templating';
import {PdfGenerator} from "../shared/helpers/pdf/pdf-generator";
import {ReportTemplate} from "../shared/models/report/report-template/reportTemplate";
import {ReportDataLoader} from "./report-data-loader";
import {DateRange} from "../shared/models/time/date-range";
import {ReportDataConfiguration} from "./report-data-configuration";
import {ReportDocuments} from "../shared/models/report/collection-model/reportDocuments";
import {RetainedEarningsSummary} from "../shared/models/report/collection-model/retained-earnings-summary";

/**
 * Creates reports as HTML or PDF
 */
export class ReportEngine {

  /**
   * Generates a balance sheet PDF
   * @param dateRange date range for reports
   */
  static async generateReport(dateRange: DateRange): Promise<{ documents: ReportDocuments, retainedEarningsSummary: RetainedEarningsSummary }> {
    // get data for each report type
    const preConfigurationData = await ReportDataLoader.loadData(dateRange);

    // configure report data for generation
    const configuredReports = ReportDataConfiguration.configureReportData(preConfigurationData, dateRange);

    // generate PDF reports
    const balanceSheet = await this.generatePdf(configuredReports.balanceSheet);
    const trialBalance = await this.generatePdf(configuredReports.trialBalance);
    const incomeStatement = await this.generatePdf(configuredReports.incomeStatement);
    const retainedEarnings = await this.generatePdf(configuredReports.retainedEarnings);

    const retainedEarningsSummary: RetainedEarningsSummary = {
      beginningBalance: preConfigurationData.retainedEarnings.beginningBalance,
      endingBalance: preConfigurationData.retainedEarnings.endingBalance
    }

    return {
      documents: {
        balanceSheet,
        trialBalance,
        incomeStatement,
        retainedEarnings
      },
      retainedEarningsSummary
    }
  }

  /**
   * Generates a balance sheet PDF in base64 string
   * @param data Balance sheet report template
   */
  private static async generatePdf(data: ReportTemplate) {
    const filePath = path.resolve('src/shared/assets/report-templates/single-header-template.html');
    const file = await readFile(filePath);

    const template = Templating.format(file.toString(), data);

    const pdf = await PdfGenerator.generateBase64PdfFromHtml(template);

    return 'data:application/pdf;base64,' + pdf;
  }
}
