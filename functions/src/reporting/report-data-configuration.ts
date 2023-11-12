import {ReportTemplate} from "../shared/models/report/balance-sheet-template/reportTemplate";
import {PreConfigurationData} from "../shared/models/report/pre-configuration-data/pre-configuration-data";
import {
  PreConfiguredDataBalanceSheet
} from "../shared/models/report/pre-configuration-data/balance-sheet/pre-configured-data-balance-sheet";
import {ConfiguredData} from "../shared/models/report/configured-data";
import {AccountType} from "../shared/models/enums/account-type";
import {AccountData} from "../shared/models/report/pre-configuration-data/balance-sheet/account-data";
import {Section} from "../shared/models/report/balance-sheet-template/section";
import {DateRange} from "../shared/models/time/date-range";
import {RowGroup} from "../shared/models/report/balance-sheet-template/row-group";
import {Row} from "../shared/models/report/balance-sheet-template/row";

export class ReportDataConfiguration {

  static configureReportData(reportDocuments: PreConfigurationData, dateRange: DateRange): ConfiguredData {

    const balanceSheet = this.configureBalanceSheet(reportDocuments.balanceSheet, dateRange);

    return {
      balanceSheet
    }
  }

  private static configureBalanceSheet(balanceSheetData: PreConfiguredDataBalanceSheet, dateRange: DateRange): ReportTemplate {

    const assets = balanceSheetData.accountData.filter(a => a.accountType === AccountType.asset);
    const liabilities = balanceSheetData.accountData.filter(a => a.accountType === AccountType.liability);
    const equity = balanceSheetData.accountData.filter(a => a.accountType === AccountType.equity)

    const assetSection = this.configureSection(assets, 'Assets', balanceSheetData.totals.asset);
    const liabilitySection = this.configureSection(liabilities, 'Liabilities', balanceSheetData.totals.liability);
    const equitySection = this.configureSection(equity, 'Equities', balanceSheetData.totals.equity);

    return {
      reportHeader: 'Balance Sheet',
      dateRange: new Date(dateRange.start).toDateString() + ' - ' + new Date(dateRange.end).toDateString(),
      sections: [assetSection, liabilitySection, equitySection]
    };

  }

  /**
   * Configures a single section of a ReportType
   * @param data date to inject into section
   * @param header header of the section
   * @param total total balance of the section
   */
  private static configureSection(data: AccountData[], header: string, total: number): Section {
    const section: Section = {
      sectionHeader: header,
      sectionTotal: total.toString(),
      rowGroups: []
    };

    const rowGroup: RowGroup = {
      groupTitle: 'Current ' + header,
      groupTotal: total.toString(),
      indentTotal: 8,
      rows: []
    }

    const rows: Row[] = data.map(a => ({
      title: a.accountName,
      value: a.balance.toString(),
      indent: 4
    }));

    rowGroup.rows = [...rows];

    section.rowGroups = [rowGroup];

    return section;
  }

}
