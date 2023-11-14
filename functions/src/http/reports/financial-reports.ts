import {onRequest} from "firebase-functions/v2/https";
import {GenerateReportDto} from "../../shared/models/report/dto/generate-report-dto";
import * as logger from 'firebase-functions/logger';
import {badRequestResponse, okResponse, unauthorizedResponse} from "../../shared/responses/responses";
import {ReportEngine} from "../../reporting/report-engine";
import {firestore} from "firebase-admin";
import {FirestoreCollections} from "../../shared/enums/firestore-collections";
import {Guid} from "../../shared/helpers/guids/generate-guid";
import {Report} from "../../shared/models/report/collection-model/report";
import {verifyToken} from "../../shared/helpers/auth/verify-token";
import {ReportBase} from "../../shared/models/report/collection-model/report-base";

export const generateReports = onRequest(
  {cors: true},
  async (req, res) => {
      if (!await verifyToken(req)) {
        return unauthorizedResponse(res);
      }

      const dto = req.body.data as GenerateReportDto;

      if (!dto) return badRequestResponse('The report data provided is invalid', res);

    try {

      const reports = await ReportEngine.generateReport(dto.dateRange);

      const report: Report = {
        reportName: dto.reportName,
        reportDescription: dto.reportDescription,
        documents: reports,
        dateRange: dto.dateRange,
        generatedOn: new Date().toISOString(),
        reportId: Guid.createGuid()
      }

      await firestore().collection(FirestoreCollections.reports)
        .doc(report.reportId)
        .set(report)

      return okResponse({}, 200, res);
    }catch (error) {
      logger.error(error);
      return badRequestResponse('There was an error and the report could not be generated.', res);
    }

  }
)

export const getReportList = onRequest(
  {cors: true},
  async (req, res) => {
    if (!await verifyToken(req)) {
      return unauthorizedResponse(res);
    }

    try {

      const reportsSnapshot = await firestore()
        .collection(FirestoreCollections.reports)
        .get();

      if (reportsSnapshot.empty) {
        return okResponse({reports: []}, 200, res);
      }

      const reportResponse: ReportBase[] = reportsSnapshot.docs.map(r => {
        const data = r.data() as Report;

        return {
          reportName: data.reportName,
          dateRange: data.dateRange,
          generatedOn: data.generatedOn,
          reportDescription: data.reportDescription,
          reportId: data.reportId
        }
      })

      return okResponse({reports: reportResponse}, 200, res);

    }catch (error){
      logger.error(error);
      return badRequestResponse('An error occurred and the report list could not be loaded.', res);
    }
  }
);

export const getReport = onRequest(
  {cors: true},
  async (req, res) => {
    if (!await verifyToken(req)) {
      return unauthorizedResponse(res);
    }

    const reportId = req.body.data as string;

    if (!reportId) return badRequestResponse('The report ID provided is in an invalid format.', res);

    try {

      const reportSnapshot = await firestore()
        .collection(FirestoreCollections.reports)
        .doc(reportId)
        .get();

      if (!reportSnapshot.exists) {
        return badRequestResponse('The report requested does not exist.', res);
      }

      return okResponse({report: reportSnapshot.data()}, 200, res);

    } catch (error) {
      logger.error(error);
      return badRequestResponse('An error occurred and the report could not be loaded.', res)
    }
  }
);
