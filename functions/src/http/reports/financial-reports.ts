import {onRequest} from "firebase-functions/v2/https";
import {GenerateReportDto} from "../../shared/models/report/dto/generate-report-dto";
import * as logger from 'firebase-functions/logger';
import {badRequestResponse, okResponse} from "../../shared/responses/responses";
import {ReportEngine} from "../../reporting/report-engine";

export const generateReports = onRequest(
  {cors: true},
  async (req, res) => {

      const dto = req.body.data as GenerateReportDto;

      if (!dto) return badRequestResponse('The report data provided is invalid', res);

    try {

      const reports = await ReportEngine.generateReport(dto.dateRange);

      // console.log(reports.trialBalance)

      return okResponse({report: reports.trialBalance}, 200, res);
    }catch (error) {
      logger.error(error);
      return badRequestResponse('There was an error and the report could not be generated.', res);
    }

  }
)
