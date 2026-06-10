// ============================================================
// TASK 4 — parseServices.js
// ============================================================
// A Node.js function that parses rows of patient "services"
// (procedures, tests) scraped from a hospital system, and
// normalises them before they are saved to the database.
//
// Each raw row is an array of string columns:
//   [ visitNo, date, billNo, amount, department, service ]
//
// The date arrives as "DD/MM/YYYY" and must be converted to
// "YYYY-MM-DD" (ISO) before saving.
//
// REPORTED BUGS (two of them):
//
//  BUG 1 — Date conversion is wrong. "23/04/2026" is being
//          saved as "2026-23-04" instead of "2026-04-23".
//          The day and month are swapped.
//
//  BUG 2 — When a row is malformed (e.g. the date cell is empty
//          or not in DD/MM/YYYY format), the whole function
//          throws and the entire batch of services is lost.
//          A single bad row should be SKIPPED (and logged),
//          not crash the whole batch.
//
// EXPECTED BEHAVIOUR:
//   - Valid rows: returned with date converted to YYYY-MM-DD.
//   - Malformed rows: skipped, with a console.warn noting the
//     skipped row. The rest of the batch still processes.
//
// YOUR JOB:
// Fix both bugs. Do not change the input or output structure
// beyond what is described.
// ============================================================

function parseServices(rows) {
  const result = [];

  for (const row of rows) {
    const [visitNo, date, billNo, amount, department, service] = row;

    // Convert DD/MM/YYYY -> YYYY-MM-DD
    const parts = date.split("/");
    const isoDate = `${parts[2]}-${parts[0]}-${parts[1]}`;

    result.push({
      visitNo,
      date: isoDate,
      billNo,
      amount,
      department,
      service,
    });
  }

  return result;
}

module.exports = { parseServices };

// ------------------------------------------------------------
// Test input (do not edit):
//
//   const rows = [
//     ["V1", "23/04/2026", "B100", "500", "PULMONOLOGY", "X-Ray"],
//     ["V2", "01/05/2026", "B101", "300", "LAB",         "CBC"],
//     ["V3", "",           "B102", "200", "LAB",         "ESR"],   // malformed
//     ["V4", "15/05/2026", "B103", "800", "RADIOLOGY",   "CT"],
//   ];
//
// Expected output (3 valid rows; the empty-date row skipped):
//   [
//     { visitNo: "V1", date: "2026-04-23", billNo: "B100", amount: "500", department: "PULMONOLOGY", service: "X-Ray" },
//     { visitNo: "V2", date: "2026-05-01", billNo: "B101", amount: "300", department: "LAB",         service: "CBC"   },
//     { visitNo: "V4", date: "2026-05-15", billNo: "B103", amount: "800", department: "RADIOLOGY",   service: "CT"    },
//   ]
// (and a console.warn for the skipped V3 row)
// ------------------------------------------------------------
