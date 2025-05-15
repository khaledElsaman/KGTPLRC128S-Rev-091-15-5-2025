import React from 'react';

const GtplRC128RegulationTOC: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">GTPL RC128 Regulation Table of Contents</h1>
      <div className="space-y-4">
        <section>
          <h2 className="text-xl font-semibold mb-3">Part I - General Provisions</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Article 1 - Definitions</li>
            <li>Article 2 - Scope of Application</li>
            <li>Article 3 - General Principles</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">Part II - Claims Management</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Article 4 - Notice Requirements</li>
            <li>Article 5 - Claim Documentation</li>
            <li>Article 6 - Assessment Procedures</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">Part III - Variations</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Article 7 - Variation Orders</li>
            <li>Article 8 - Price Adjustments</li>
            <li>Article 9 - Time Extensions</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">Part IV - Dispute Resolution</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Article 10 - Negotiation</li>
            <li>Article 11 - Mediation</li>
            <li>Article 12 - Arbitration</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-3">Part V - Final Provisions</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Article 13 - Amendments</li>
            <li>Article 14 - Implementation</li>
            <li>Article 15 - Effective Date</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default GtplRC128RegulationTOC;