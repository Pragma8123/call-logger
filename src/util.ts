import type { DocumentData } from 'firebase/firestore';

function downloadFile(filename: string, data: string): void {
  let element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(data),
  );
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function formatCall(call: DocumentData): string {
  return `${call.phoneNumber} - ${call.talkTime} - ${call.date} - ${call.callerName} - ${call.description}\n`;
}

export { downloadFile, formatCall };
