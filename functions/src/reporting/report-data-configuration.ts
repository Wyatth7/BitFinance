import {ReportTemplate} from "../shared/models/report/report-template/reportTemplate";
import {PreConfigurationData} from "../shared/models/report/pre-configuration-data/pre-configuration-data";
import {
  PreConfiguredDataBalanceSheet
} from "../shared/models/report/pre-configuration-data/balance-sheet/pre-configured-data-balance-sheet";
import {ConfiguredData} from "../shared/models/report/configured-data";
import {AccountType} from "../shared/models/enums/account-type";
import {AccountData} from "../shared/models/report/pre-configuration-data/balance-sheet/account-data";
import {Section} from "../shared/models/report/report-template/section";
import {DateRange} from "../shared/models/time/date-range";
import {RowGroup} from "../shared/models/report/report-template/row-group";
import {Row} from "../shared/models/report/report-template/row";
import {
  PreConfigurationDataTrialBalance
} from "../shared/models/report/pre-configuration-data/trial-balance/pre-configuration-data-trial-balance";
import {
  PreConfiguredDataIncomeStatement
} from "../shared/models/report/pre-configuration-data/income-statement/pre-configured-data-income-statement";
import {
  PreConfiguredDataRetainedEarnings
} from "../shared/models/report/pre-configuration-data/retained-earnings/pre-configured-data-retained-earnings";

export class ReportDataConfiguration {

  static configureReportData(reportDocuments: PreConfigurationData, dateRange: DateRange): ConfiguredData {
    const dateString = new Date(dateRange.start).toDateString() + ' - ' + new Date(dateRange.end).toDateString();

    const balanceSheet = this.configureBalanceSheet(reportDocuments.balanceSheet, dateString);
    const trialBalance = this.configureTrialBalance(reportDocuments.trialBalance, dateString)
    const incomeStatement = this.configureIncomeStatement(reportDocuments.incomeStatement, dateString);
    const retainedEarnings = this.configureRetainedEarnings(reportDocuments.retainedEarnings, dateString);

    return {
      balanceSheet,
      trialBalance,
      incomeStatement,
      retainedEarnings
    }
  }

  private static configureBalanceSheet(balanceSheetData: PreConfiguredDataBalanceSheet, dateRange: string): ReportTemplate {

    const assets = balanceSheetData.accountData.filter(a => a.accountType === AccountType.asset);
    const liabilities = balanceSheetData.accountData.filter(a => a.accountType === AccountType.liability);
    const equity = balanceSheetData.accountData.filter(a => a.accountType === AccountType.equity)

    const assetSection = this.configureSection(assets,  balanceSheetData.totals.asset,'Assets', 4);
    const liabilitySection = this.configureSection(liabilities,  balanceSheetData.totals.liability, 'Liabilities', 4);
    const equitySection = this.configureSection(equity,  balanceSheetData.totals.equity,'Equities', 4);

    return {
      reportHeader: 'Balance Sheet',
      headers: [dateRange],
      dateRange: dateRange,
      sections: [assetSection, liabilitySection, equitySection]
    };

  }

  private static configureTrialBalance(trialBalanceData: PreConfigurationDataTrialBalance, dateRange: string): ReportTemplate {

    const section = this.configureSection(
      trialBalanceData.accountData,
      [trialBalanceData.totalDebits, trialBalanceData.totalCredits],
      undefined,
      0,
      false
    );

    return {
      reportHeader: 'Trial Balance',
      headers: ['Debits', 'Credits'],
      dateRange: dateRange,
      sections: [section]
    }
  }

  private static configureIncomeStatement(incomeStatementData: PreConfiguredDataIncomeStatement, dateRange: string): ReportTemplate {
    const incomeGroup = this.configureRowGroup('gross revenue', incomeStatementData.grossIncome, 8, incomeStatementData.income);
    const expenseGroup = this.configureRowGroup('cost of sales', incomeStatementData.totalExpense, 8, incomeStatementData.expense);

    const section: Section = {
      sectionTotal: incomeStatementData.netIncome.toString(),
      rowGroups: [incomeGroup, expenseGroup]
    }

    return {
      reportHeader: 'Income Statement',
      headers: [dateRange],
      dateRange,
      sections: [section]
    }
  }


  private static configureRetainedEarnings(retainedEarningsData: PreConfiguredDataRetainedEarnings, dateRange: string) {
    const rows: Row[] = [
      {
        title: 'Starting balance',
        values: [retainedEarningsData.beginningBalance.toString()],
        indent: 0
      },
      {
        title: 'Net Income',
        values: [retainedEarningsData.netIncome.toString()],
        indent: 0
      },
      {
        title: 'Dividends',
        values: [retainedEarningsData.dividends.toString()],
        indent: 0
      },
    ]

    const group: RowGroup = {
      groupTitle: '',
      groupTotal: [retainedEarningsData.endingBalance.toString()],
      indentTotal: 0,
      rows: rows
    }

    const section: Section = {
      sectionHeader: dateRange,
      rowGroups: [group]
    }

    return {
      reportHeader: 'Retained Earnings',
      headers: [dateRange],
      dateRange,
      sections: [section]
    }
  }


  private static configureRowGroup(groupTitle: string, groupTotal: number | number[], indentTotal: number, data: AccountData[]): RowGroup {
      const rowGroup: RowGroup = {
        groupTitle: groupTitle,
        groupTotal: Array.isArray(groupTotal)
          ? groupTotal.toString().split(',')
          : [groupTotal.toString()],
        indentTotal: indentTotal + 4,
        rows: []
      }

    const rows: Row[] = data.map(a => ({
      title: a.accountName,
      values: Array.isArray(a.balance) ?
        a.balance.toString().split(',')
        : [a.balance.toString()],
      indent: indentTotal
    }));

    rowGroup.rows = [...rows];

    return rowGroup;
  }

  /**
   * Configures a single section of a ReportType
   * @param data date to inject into section
   * @param header header of the section
   * @param total total balance of the section
   * @param rowIndent title indentations per row
   * @param includeSectionTotal weather to show the sections total in report or not
   */
  private static configureSection(data: AccountData[], total: number[] | number, header?: string, rowIndent = 0, includeSectionTotal = true): Section {
    const section: Section = {
      sectionHeader: header || undefined,
      sectionTotal:  includeSectionTotal ? total.toString() : undefined,
      rowGroups: []
    };

    const rowGroup: RowGroup = {
      groupTitle: header ? 'Current ' + header : '',
      groupTotal: Array.isArray(total)
        ? total.toString().split(',')
        : [total.toString()],
      indentTotal: rowIndent + 4,
      rows: []
    }

    const rows: Row[] = data.map(a => ({
      title: a.accountName,
      values: Array.isArray(a.balance) ?
        a.balance.toString().split(',')
        : [a.balance.toString()],
      indent: rowIndent
    }));

    rowGroup.rows = [...rows];

    section.rowGroups = [rowGroup];

    return section;
  }

}
