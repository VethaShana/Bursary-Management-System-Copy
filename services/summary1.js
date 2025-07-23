import { uoj } from "../utils/Uojlogo.js";

const applicationDocDefinition = (data) => {
  var headers = {
    fila_1: {
      col_1: { text: "ID", style: "tableHeader", alignment: "center" },
      col_2: { text: "RegNo", style: "tableHeader", alignment: "center" },
      col_3: { text: "Name", style: "tableHeader", alignment: "center" },
      col_4: { text: "Course", style: "tableHeader", alignment: "center" },
      col_5: { text: "Mode", style: "tableHeader", alignment: "center" },
      col_6: { text: "BYr", style: "tableHeader", alignment: "center" },
      col_7: { text: "Beg-Aca-Yr", style: "tableHeader", alignment: "center" },
      col_8: { text: "DateOfAppo", style: "tableHeader", alignment: "center" },
      col_9: { text: "Status", style: "tableHeader", alignment: "center" },
    },
  };
  var rows = {
    a: {
      ID: "1",
      RegNo: "2017/CSC/XXX",
      Name: "Kamal Kamalakkannan",
      Course: "ComputerScience",
      Mode: "2",
      BYr: "2017",
      BegAcaYr: "2017/2018",
      DateOfAppo: "12/02/2018",
      Status: "A",
    },

    b: {
      ID: "2",
      RegNo: "2016/CSC/YYY",
      Name: "Rani Ramesh",
      Course: "ComputerScience",
      Mode: "3",
      BYr: "2016",
      BegAcaYr: "2016/2017",
      DateOfAppo: "2016/05/04",
      Status: "A",
    },
  };

  var body = [];
  for (var key in headers) {
    if (headers.hasOwnProperty(key)) {
      var header = headers[key];
      var row = new Array();
      row.push(header.col_1);
      row.push(header.col_2);
      row.push(header.col_3);
      row.push(header.col_4);
      row.push(header.col_5);
      row.push(header.col_6);
      row.push(header.col_7);
      row.push(header.col_8);
      row.push(header.col_9);
      body.push(row);
    }
  }
  for (var key in rows) {
    if (rows.hasOwnProperty(key)) {
      var data = rows[key];
      var row = new Array();
      row.push(data.ID.toString());
      row.push(data.RegNo.toString());
      row.push(data.Name.toString());
      row.push(data.Course.toString());
      row.push(data.Mode.toString());
      row.push(data.BYr.toString());
      row.push(data.BegAcaYr.toString());
      row.push(data.DateOfAppo.toString());
      row.push(data.Status.toString());
      body.push(row);
    }
  }

  return {
    //pageMargins: [40,40,40,40],
    pageOrientation: "landscape",
    header: function () {
      return {
        margin: 40,
        columns: [{}],
      };
    },
    footer: function (currentPage, pageCount) {
      return {
        text: "Page " + currentPage.toString() + " of " + pageCount,
        alignment: "center",
        margin: [0, 30, 0, 0],
      };
    },
    content: [
      //{ text: 'Tables', style: 'header' },
      {
        alignment: "center",
        fit: [300, 300],
        image: uoj,
      },

      {
        text: "\nBursary Students List - University of Jaffna ",
        style: "header",
      },
      { bold: true, text: "Date :\n\n" },
      //{ text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'sta' },
      //'The following table has nothing more than a body array',
      {
        style: "tableExample",
        table: {
          //widths: [ '*', '*', '*', '*', '*','*','*','*','*'],
          //headerRows: 2,
          // keepWithHeaderRows: 1,
          body: body,
        },
      },
    ],
    styles: {
      header: {
        fontSize: 28,
        bold: true,
      },
      subheader: {
        fontSize: 15,
        bold: true,
      },
      quote: {
        italics: true,
      },
      small: {
        fontSize: 8,
      },
      sta: {
        fontSize: 11,
        bold: false,
        alignment: "justify",
      },
    },
  };
};

export const getDocDefinition = (type, data) => {
  switch (type) {
    case "application":
      return applicationDocDefinition(data);
    default:
      return applicationDocDefinition(data);
  }
};
