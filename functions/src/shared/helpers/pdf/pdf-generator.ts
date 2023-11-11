import * as puppeteer from "puppeteer";

export class PdfGenerator {

  /**
   * Generates a PDF document in Base 64 based on HTML string
   * @param html HTML string to convert to PDF
   */
  static async generateBase64PdfFromHtml(html: string) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);

    const pdf = await page.pdf();

    return pdf.toString('base64');
  }
}
