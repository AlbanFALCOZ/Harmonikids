import { environment } from "src/environments/environment";

export const testUrl = process.env["TEST_URL"] || 'http://localhost:4200';
export const quizListUrl = testUrl + '/quiz-list';
