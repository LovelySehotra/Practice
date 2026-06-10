// ============================================================
// TASK 3 — labResultsApi.js
// ============================================================
// A Node.js / Express route handler that returns a patient's
// lab results as JSON to a frontend client.
//
// REPORTED BUG:
// The frontend expects a consistent response shape. Right now:
//
//  - When labs exist, the response is fine.
//  - When a patient has NO labs, the API returns `undefined`
//    in the body, the frontend receives malformed JSON, and
//    the Lab Reports tab breaks.
//  - The HTTP status is always 200 even when the patient UHID
//    is not found — the frontend cannot tell "no labs" from
//    "patient does not exist".
//
// EXPECTED BEHAVIOUR (response contract):
//   - Patient found, has labs:
//       200  { uhid, labs: [ ...items ], count: N }
//   - Patient found, no labs:
//       200  { uhid, labs: [], count: 0 }
//   - Patient not found:
//       404  { error: "Patient not found", uhid }
//
// YOUR JOB:
// Fix the handler so it always returns the documented shape
// and the correct status code. Do not change how labs are
// fetched from the store.
// ============================================================

const express = require("express");
const router = express.Router();

// Pretend data store (do not edit). Returns an array of labs,
// or null if the patient UHID does not exist at all.
const labStore = {
  getLabsForPatient(uhid) {
    const data = {
      "45756": [
        { testName: "Hemoglobin", value: "14.4", status: "Authorized" },
        { testName: "WBC", value: "9800", status: "Authorized" },
      ],
      "91511": [], // patient exists but has no authorized labs
    };
    // Returns undefined if uhid not present at all
    return data[uhid];
  },
};

router.get("/api/labs/:uhid", (req, res) => {
  const uhid = req.params.uhid;
  const labs = labStore.getLabsForPatient(uhid);

  res.status(200).json({
    uhid: uhid,
    labs: labs,
    count: labs.length,
  });
});

module.exports = router;

// ------------------------------------------------------------
// Test cases the handler must satisfy (do not edit):
//
//   GET /api/labs/45756
//     -> 200  { uhid: "45756", labs: [ 2 items ], count: 2 }
//
//   GET /api/labs/91511   (exists, no labs)
//     -> 200  { uhid: "91511", labs: [], count: 0 }
//
//   GET /api/labs/99999   (does not exist)
//     -> 404  { error: "Patient not found", uhid: "99999" }
// ------------------------------------------------------------
