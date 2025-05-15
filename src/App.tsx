import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './contexts/UserContext';
import { useApp } from './contexts/AppContext';
import Layout from './Layout';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import ClaimsDashboard from './components/ClaimsDashboard';
import Claims from './components/Claims';
import NoticeOfClaims from './components/NoticeOfClaims';
import ProcessTables from './components/ProcessTables';
import MasterClaims from './components/MasterClaims';
import EngineerResponse from './components/EngineerResponse';
import ClaimsAnalysis from './components/ClaimsAnalysis';
import AIClaimsAnalysis from './components/AIClaimsAnalysis';
import ClaimResolution from './components/ClaimResolution';
import ProjectDocuments from './components/ProjectDocuments';
import Records from './components/Records';
import LogScreen from './components/LogScreen';
import UserManagement from './components/auth/UserManagement';
import UserProfile from './components/auth/UserProfile';
import VariationsDashboard from './components/variations/VariationsDashboard';
import PriceAdjustments from './components/variations/PriceAdjustments';
import ScopeChanges from './components/variations/ScopeChanges';
import AdditionalWorks from './components/variations/AdditionalWorks';
import VariationRequest from './components/variations/VariationRequest';
import NewVariation from './components/variations/NewVariation';
import VariationAnalysis from './components/variations/VariationAnalysis';
import AIVariationPredictions from './components/variations/AIVariationPredictions';
import VariationApproval from './components/variations/VariationApproval';
import GtplRC128LinkedRegulations from './components/guides/GtplRC128LinkedRegulations';
import GtplRC128Home from './components/guides/GtplRC128Home';
import DetailedClaims from './components/DetailedClaims';
import ProjectVariationDocuments from './components/variations/ProjectVariationDocuments';
import ContractorResponse from './components/variations/ContractorResponse';
import SystemGuide from './components/guides/SystemGuide';
import KnowledgeBase from './components/knowledge-base/KnowledgeBase';
import ClaimsComplianceGuide from './components/guides/ClaimsComplianceGuide';
import VariationsComplianceGuide from './components/guides/VariationsComplianceGuide';
import MasterVariations from './components/variations/MasterVariations';
import ClaimsManagementHub from './components/ClaimsManagementHub';
import VariationsManagementHub from './components/VariationsManagementHub';
import DisputeArbitrationGuide from './components/knowledge-base/DisputeArbitrationGuide';
import GtplLawArticles from './components/knowledge-base/GtplLawArticles';
import DisputeSettlement from './components/disputes/DisputeSettlement';
import Arbitration from './components/disputes/Arbitration';
import GtplRC128TableOfContents from './components/knowledge-base/GtplRC128TableOfContents';
import GtplRC128ArticlesEn from './components/knowledge-base/GtplRC128ArticlesEn';
import GtplRC128ArticlesAr from './components/knowledge-base/GtplRC128ArticlesAr';
import DeploymentStatusPage from './components/DeploymentStatusPage';
import GdmpVariationModule from './components/knowledge-base/GdmpVariationModule';
import GdmpClaimsModule from './components/knowledge-base/GdmpClaimsModule';
import GdmpDisputesModule from './components/knowledge-base/GdmpDisputesModule';
import GtplRC128PartIV from './components/knowledge-base/GtplRC128PartIV';
import GtplRC128PartIVArabic from './components/knowledge-base/GtplRC128PartIVArabic';
import GtplRC128PartV from './components/knowledge-base/GtplRC128PartV';
import GtplRC128PartVArabic from './components/knowledge-base/GtplRC128PartVArabic';
import GtplRC128PartVII from './components/knowledge-base/GtplRC128PartVII';
import GtplRC128PartVIIArabic from './components/knowledge-base/GtplRC128PartVIIArabic';
import GtplRC128PartI from './components/knowledge-base/GtplRC128PartI';
import GtplRC128PartII from './components/knowledge-base/GtplRC128PartII';
import GtplRC128PartIII from './components/knowledge-base/GtplRC128PartIII';
import GtplRC128PartIIIArabic from './components/knowledge-base/GtplRC128PartIIIArabic';
import GtplRC128PartSelector from './components/knowledge-base/GtplRC128PartSelector';
import VariationRequests from './components/variations/VariationRequests';

function AppContent() {
  const { currentUser } = useUser();
  const { currentView, currentSubView } = useApp();

  if (!currentUser) {
    return <Login />;
  }

  const renderContent = () => {
    switch (currentView) {
      // Claims Management Hub
      case 'claims-management-hub':
        return <ClaimsManagementHub />;
      case 'dashboard':
        return <Dashboard />;
      case 'claims-dashboard':
        return <ClaimsDashboard />;
      case 'master-claims':
        return <MasterClaims />;
      case 'documents':
        return <ProjectDocuments />;
      case 'notices':
        return <NoticeOfClaims />;
      case 'engineer-response':
        return <EngineerResponse />;
      case 'records':
        return <Records />;
      case 'detailed-claims':
        return <DetailedClaims />;
      case 'analysis':
        return <ClaimsAnalysis />;
      case 'claims-ai':
        return <AIClaimsAnalysis />;
      case 'resolution':
        return <ClaimResolution />;
      case 'claims-compliance-guide':
        return <ClaimsComplianceGuide />;

      // Variations Management Hub
      case 'variations-management-hub':
        return <VariationsManagementHub />;
      case 'master-variations':
        return <MasterVariations />;
      case 'variation-requests':
        return <VariationRequests />;
      case 'variation-documents':
        return <ProjectVariationDocuments />;
      case 'contractor-response':
        return <ContractorResponse />;
      case 'variation-analysis':
        return <VariationAnalysis />;
      case 'variation-approval':
        return <VariationApproval />;
      case 'variations-compliance-guide':
        return <VariationsComplianceGuide />;
      case 'new-variation':
        return <NewVariation />;

      // Dispute & Arbitration Hub
      case 'dispute-arbitration-guide':
        return <DisputeArbitrationGuide />;
      case 'disputes-settlement':
        return <DisputeSettlement />;
      case 'disputes-arbitration':
        return <Arbitration />;

      // Knowledge Base
      case 'knowledge-base':
        return <KnowledgeBase />;
      case 'system-guide':
        return <SystemGuide />;
      case 'gtpl-rc128-table-of-contents':
        return <GtplRC128TableOfContents />;
      case 'gtpl-rc128-articles-en':
        return <GtplRC128ArticlesEn />;
      case 'gtpl-rc128-articles-ar':
        return <GtplRC128ArticlesAr />;
      case 'gtpl-rc128-part-selector':
        return <GtplRC128PartSelector />;
      case 'gtpl-rc128-part-i':
        return <GtplRC128PartI />;
      case 'gtpl-rc128-part-ii':
        return <GtplRC128PartII />;
      case 'gtpl-rc128-part-iii':
        return <GtplRC128PartIII />;
      case 'gtpl-rc128-part-iii-arabic':
        return <GtplRC128PartIIIArabic />;
      case 'gtpl-rc128-part-iv':
        return <GtplRC128PartIV />;
      case 'gtpl-rc128-part-iv-arabic':
        return <GtplRC128PartIVArabic />;
      case 'gtpl-rc128-part-v':
        return <GtplRC128PartV />;
      case 'gtpl-rc128-part-v-arabic':
        return <GtplRC128PartVArabic />;
      case 'gtpl-rc128-part-vii':
        return <GtplRC128PartVII />;
      case 'gtpl-rc128-part-vii-arabic':
        return <GtplRC128PartVIIArabic />;
      case 'gdmp-variation':
        return <GdmpVariationModule />;
      case 'gdmp-claims':
        return <GdmpClaimsModule />;
      case 'gdmp-disputes':
        return <GdmpDisputesModule />;
        
      // Deployment Status
      case 'deployment-status':
        return <DeploymentStatusPage />;

      default:
        return <ClaimsDashboard />;
    }
  };

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AppContent />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;