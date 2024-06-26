import ExcelJS from "exceljs";
import { surveyingData } from "../types/SurveyingData";

const convertDateFormat = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${month}/${day}`;
};

interface formalSurveyingData {
    surveyingDataId: number;
    surveyingDataName: string;
    bs: number | string;
    ih: number | string;
    fs: number | string;
    gh: number | string;
}

const outputExcel = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    title: string,
    outputExcelData: formalSurveyingData[]
) => {
    e.preventDefault();
    // Workbookの作成
    const workbook = new ExcelJS.Workbook();
    // Workbookに新しいWorksheetを追加
    workbook.addWorksheet(title);
    // ↑で追加したWorksheetを参照し変数に代入
    const worksheet = workbook.getWorksheet(title);
    // 列を定義
    worksheet.columns = [
        { header: "測点", key: "name" },
        { header: "BS", key: "bs" },
        { header: "IH", key: "ih" },
        { header: "FS", key: "fs" },
        { header: "GH", key: "gh" },
    ];
    // 行を定義
    outputExcelData.map((data: formalSurveyingData) => {
        worksheet.addRow({
            name: data.surveyingDataName,
            bs: data.bs,
            ih: data.ih,
            fs: data.fs,
            gh: data.gh,
        });
    });
    // UInt8Arrayを生成
    const uint8Array = await workbook.xlsx.writeBuffer();
    // Blob
    const blob = new Blob([uint8Array], { type: "application/octet-binary" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.xlsx`;
    a.click();
    a.remove();
};

//ihの値を算出し新たな配列を作成する関数
const createFormalSurveyingData = (inputArray: surveyingData[]) => {
    let outputArray: formalSurveyingData[] = [];
    let lastIh = 0;

    for (let i = 0; i < inputArray.length; i++) {
        let currentItem = inputArray[i];
        let newItem: formalSurveyingData = {
            surveyingDataId: currentItem.surveyingDataId,
            surveyingDataName: "some value",
            bs: 0,
            ih: 0,
            fs: 0,
            gh: 0,
        };

        newItem.surveyingDataName = currentItem.surveyingDataName || "";
        newItem.bs = currentItem.bs || "";
        newItem.fs = currentItem.fs || "";

        if (currentItem.bs && currentItem.gh) {
            lastIh = Number(currentItem.bs) + Number(currentItem.gh);
            newItem.ih = lastIh;
            newItem.gh = currentItem.gh;
        } else if (currentItem.fs) {
            newItem.ih = lastIh;
            newItem.gh = newItem.ih
                ? Number(newItem.ih) - Number(currentItem.fs)
                : "";
        } else {
            newItem.ih = "";
            newItem.gh = "";
        }

        outputArray.push(newItem);
    }
    return outputArray;
};

export function useData() {
    return { convertDateFormat, outputExcel, createFormalSurveyingData };
}
