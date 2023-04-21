import ExcelJS from "exceljs";
import { surveyingData } from "../features/entity/SurveyingData";

export const today = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const date = currentDate.getDate();

    return year + "/" + month + "/" + date;
};

interface outputExcelData {
    surveyingDataName: string;
    bs: number | string;
    ih: number | string;
    fs: number | string;
    gh: number | string;
}

export const outputExcel = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    title: string,
    outputExcelData: outputExcelData[]
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
    outputExcelData.map((data: outputExcelData) => {
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
export const createOutputExcelData = (inputArray: surveyingData[]) => {
    let outputArray: outputExcelData[] = [];
    let lastIh = 0;

    for (let i = 0; i < inputArray.length; i++) {
        let currentItem = inputArray[i];
        let newItem: outputExcelData = {
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
        } else if (currentItem.fs) {
            newItem.ih = lastIh;
        } else {
            newItem.ih = "";
        }

        if (currentItem.fs) {
            newItem.gh = newItem.ih
                ? Number(newItem.ih) - Number(currentItem.fs)
                : "";
        } else {
            newItem.gh = "";
        }

        outputArray.push(newItem);
    }

    return outputArray;
};
