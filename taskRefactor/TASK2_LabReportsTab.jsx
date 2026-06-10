// ============================================================
// TASK 2 — LabReportsTab.jsx
// ============================================================
// A React component that shows a patient's lab reports inside
// a discharge summary screen.
//
// REPORTED BUG:
// When a patient has NO authorized lab reports, the tab shows
// a broken, empty white area — and sometimes crashes with
// "Cannot read properties of undefined (reading 'map')".
//
// EXPECTED BEHAVIOUR:
//  - If there are lab reports: render the list as it does now.
//  - If there are zero lab reports (empty array): show a clean
//    message: "No authorized lab reports available for this patient."
//  - If the labs data is missing entirely (undefined/null):
//    it must NOT crash. Show the same empty-state message.
//
// YOUR JOB:
// Fix the component so it handles all three cases safely.
// Do not change the rendering of the populated list.
// ============================================================

import React from "react";

function LabReportsTab({ labs }) {
  return (
    <div className="lab-reports-tab">
      <h3>Lab Reports</h3>
      <ul className="lab-list">
        {labs.map((lab) => (
          <li key={lab.id} className="lab-item">
            <span className="lab-name">{lab.testName}</span>
            <span className="lab-value">{lab.value}</span>
            <span className="lab-status">{lab.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LabReportsTab;

// ------------------------------------------------------------
// The component is rendered in three situations (do not edit):
//
//   1. labs = [ { id: 1, testName: "Hemoglobin", value: "14.4", status: "Authorized" },
//               { id: 2, testName: "WBC",        value: "9800", status: "Authorized" } ]
//      -> should show the list of 2 items
//
//   2. labs = []
//      -> should show: "No authorized lab reports available for this patient."
//
//   3. labs = undefined
//      -> should NOT crash; show the same empty-state message
// ------------------------------------------------------------
