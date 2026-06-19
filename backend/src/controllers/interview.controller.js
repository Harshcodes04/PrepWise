const pdfParse = require("pdf-parse");
const generateInterviewReport = require("../services/ai.services");

const generateInterviewReportController = async (req, res) => {
  const resumeFile = req.file;
  const resumeContent = await pdfParse(resumeFile.buffer);
  const { selfDescription, jobDescription } = req.body;
  const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent,
    selfDescription,
    jobDescription,
  });
};

module.exports = { generateInterviewReportController };

//multer to upload resume in any format and pdf-parse to extract text from pdf and docx and then pass the extracted text to ai service to generate interview report
